"use client";

/**
 * Global game state for My Trump (Mr. T) using Zustand.
 * Persistence is wired separately in a React effect (see GameScreen or layout).
 */

import { create } from "zustand";
import {
  STAT_MIN,
  STAT_MAX,
  TICK_DECAY,
  FOOD_ITEMS,
  CLEAN_SHOWER,
  SLEEP_RECOVERY,
  SLEEP_DURATION_MS,
  FUN_PUMP_MARKET,
  DAILY_LOGIN_BONUS_COINS,
  STATS_GREEN_ZONE_BONUS_COINS,
  STATS_GREEN_THRESHOLD,
  COINS_PER_LEVEL,
  SHOP_ITEMS,
  MAX_RECENT_TRADES,
} from "./constants";
import type { FoodId } from "./constants";
import {
  getTradeResult,
  getTradeResultFromPnL,
  applyTradeResult,
  type TradeEventType,
} from "./tradingLogic";
import type { PersistedState } from "./persistence";
import type { Room } from "./rooms";

function clamp(value: number): number {
  return Math.max(STAT_MIN, Math.min(STAT_MAX, Math.round(value)));
}

export interface CharacterStats {
  mood: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  respect: number;
}

export interface GameState {
  stats: CharacterStats;
  trumpCoins: number;
  level: number;
  totalCoinsEarned: number;
  lastDailyBonusDate: string | null;
  /** itemId -> { owned, equipped } */
  inventory: Record<string, { owned: boolean; equipped: boolean }>;
  recentTrades: Array<{ type: string; timestamp: number }>;
  isSleeping: boolean;
  /** for night-mode dim effect */
  isCleaning: boolean;
  /** for shower animation hint */
  lastActionMessage: string | null;
  /** current swipeable room (UI only, not persisted) */
  currentRoom: Room;
}

export interface GameActions {
  tick: () => void;
  feed: (foodId: FoodId) => void;
  clean: () => void;
  sleep: () => void;
  play: () => void;
  markTrade: (eventType: TradeEventType, pnl?: number) => void;
  buyItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  setLastActionMessage: (msg: string | null) => void;
  applyDailyBonus: () => void;
  hydrate: (state: Partial<GameState>) => void;
  getStateForPersistence: () => PersistedState;
  setRoom: (room: Room) => void;
}

const defaultStats: CharacterStats = {
  mood: 70,
  hunger: 70,
  energy: 80,
  cleanliness: 70,
  respect: 50,
};

function buildInitialInventory(): Record<string, { owned: boolean; equipped: boolean }> {
  const inv: Record<string, { owned: boolean; equipped: boolean }> = {};
  SHOP_ITEMS.forEach((item) => {
    inv[item.id] = { owned: false, equipped: false };
  });
  return inv;
}

const initialState: GameState = {
  stats: { ...defaultStats },
  trumpCoins: 0,
  level: 1,
  totalCoinsEarned: 0,
  lastDailyBonusDate: null,
  inventory: buildInitialInventory(),
  recentTrades: [],
  isSleeping: false,
  isCleaning: false,
  lastActionMessage: null,
  currentRoom: "kitchen",
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  tick: () => {
    const { stats, isSleeping } = get();
    if (isSleeping) return;

    set({
      stats: {
        mood: clamp(stats.mood - TICK_DECAY.mood),
        hunger: clamp(stats.hunger - TICK_DECAY.hunger),
        energy: clamp(stats.energy - TICK_DECAY.energy),
        cleanliness: clamp(stats.cleanliness - TICK_DECAY.cleanliness),
        respect: clamp(stats.respect - TICK_DECAY.respect),
      },
    });

    // Green zone bonus
    const next = get().stats;
    const allGreen =
      next.mood >= STATS_GREEN_THRESHOLD &&
      next.hunger >= STATS_GREEN_THRESHOLD &&
      next.energy >= STATS_GREEN_THRESHOLD &&
      next.cleanliness >= STATS_GREEN_THRESHOLD &&
      next.respect >= STATS_GREEN_THRESHOLD;
    if (allGreen) {
      set((s) => {
        const newTotal = s.totalCoinsEarned + STATS_GREEN_ZONE_BONUS_COINS;
        return {
          trumpCoins: s.trumpCoins + STATS_GREEN_ZONE_BONUS_COINS,
          totalCoinsEarned: newTotal,
          level: Math.floor(newTotal / COINS_PER_LEVEL) + 1,
        };
      });
    }
  },

  feed: (foodId: FoodId) => {
    const food = FOOD_ITEMS.find((f) => f.id === foodId);
    if (!food) return;
    const { stats } = get();
    set({
      stats: {
        mood: clamp(stats.mood + food.mood),
        hunger: clamp(stats.hunger + food.hunger),
        energy: stats.energy,
        cleanliness: clamp(stats.cleanliness + food.cleanliness),
        respect: stats.respect,
      },
      lastActionMessage: `Ate ${food.name}!`,
    });
  },

  clean: () => {
    const { stats } = get();
    set({
      stats: {
        ...stats,
        cleanliness: clamp(stats.cleanliness + CLEAN_SHOWER.cleanliness),
        energy: clamp(stats.energy + CLEAN_SHOWER.energy),
      },
      isCleaning: true,
      lastActionMessage: "Shower time!",
    });
    setTimeout(() => set({ isCleaning: false }), 1500);
  },

  sleep: () => {
    set({ isSleeping: true, lastActionMessage: "Zzz..." });
    const { stats } = get();
    setTimeout(() => {
      set((s) => ({
        isSleeping: false,
        stats: {
          ...s.stats,
          energy: clamp(s.stats.energy + SLEEP_RECOVERY.energy),
          hunger: clamp(s.stats.hunger + SLEEP_RECOVERY.hunger),
        },
        lastActionMessage: "Refreshed!",
      }));
    }, SLEEP_DURATION_MS);
  },

  play: () => {
    const { stats } = get();
    set({
      stats: {
        ...stats,
        mood: clamp(stats.mood + FUN_PUMP_MARKET.mood),
        respect: clamp(stats.respect + FUN_PUMP_MARKET.respect),
      },
      lastActionMessage: "Pump the market! 📈",
    });
  },

  markTrade: (eventType: TradeEventType, pnl?: number) => {
    const { stats, recentTrades } = get();
    const result =
      pnl !== undefined && pnl !== null
        ? getTradeResultFromPnL(pnl)
        : getTradeResult(eventType);
    const { mood, respect } = applyTradeResult(
      stats.mood,
      stats.respect,
      result
    );
    const typeLabel =
      pnl !== undefined && pnl !== null
        ? `PnL: ${pnl}`
        : eventType;
    const nextTrades = [
      { type: typeLabel, timestamp: Date.now() },
      ...recentTrades.slice(0, MAX_RECENT_TRADES - 1),
    ];
    set({
      stats: { ...stats, mood, respect },
      recentTrades: nextTrades,
      lastActionMessage:
        eventType === "liquidation"
          ? "We love the underdog!"
          : eventType === "profit"
            ? "Boring."
            : "Small loss, big heart.",
    });
  },

  buyItem: (itemId: string) => {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    const { trumpCoins, inventory } = get();
    if (trumpCoins < item.price || inventory[itemId]?.owned) return;
    set((s) => ({
      trumpCoins: s.trumpCoins - item.price,
      inventory: {
        ...s.inventory,
        [itemId]: { ...(s.inventory[itemId] ?? {}), owned: true },
      },
      lastActionMessage: `Bought ${item.name}!`,
    }));
  },

  equipItem: (itemId: string) => {
    const { inventory } = get();
    const entry = inventory[itemId];
    if (!entry?.owned) return;
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    const nextInv = { ...inventory };
    SHOP_ITEMS.filter((i) => i.type === item.type).forEach((i) => {
      if (nextInv[i.id]) nextInv[i.id] = { ...nextInv[i.id], equipped: false };
    });
    nextInv[itemId] = { ...nextInv[itemId], equipped: true };
    set({ inventory: nextInv, lastActionMessage: `Equipped ${item.name}!` });
  },

  setLastActionMessage: (msg: string | null) => set({ lastActionMessage: msg }),

  applyDailyBonus: () => {
    const today = new Date().toDateString();
    const { lastDailyBonusDate, trumpCoins, totalCoinsEarned } = get();
    if (lastDailyBonusDate === today) return;
    const bonus = DAILY_LOGIN_BONUS_COINS;
    set({
      lastDailyBonusDate: today,
      trumpCoins: trumpCoins + bonus,
      totalCoinsEarned: totalCoinsEarned + bonus,
      level: Math.floor((totalCoinsEarned + bonus) / COINS_PER_LEVEL) + 1,
      lastActionMessage: `Daily bonus: +${bonus} TrumpCoins!`,
    });
  },

  hydrate: (state: Partial<GameState>) => {
    set((s) => ({
      ...s,
      ...state,
      stats: state.stats ?? s.stats,
      inventory: state.inventory ?? s.inventory,
      recentTrades: state.recentTrades ?? s.recentTrades,
    }));
  },

  getStateForPersistence: (): PersistedState => {
    const s = get();
    return {
      stats: { ...s.stats },
      trumpCoins: s.trumpCoins,
      level: s.level,
      totalCoinsEarned: s.totalCoinsEarned,
      lastDailyBonusDate: s.lastDailyBonusDate,
      inventory: JSON.parse(JSON.stringify(s.inventory)),
      recentTrades: [...s.recentTrades],
      lastSavedAt: Date.now(),
    };
  },

  setRoom: (room: Room) => set({ currentRoom: room }),
}));
