/**
 * Game constants for My Trump (Mr. T character).
 * All stat values are 0–100.
 */

export const STAT_MIN = 0;
export const STAT_MAX = 100;

/** Tick interval in ms (e.g. 5–10s for testing) */
export const TICK_INTERVAL_MS = 8000;

/** Amount each stat decays per tick */
export const TICK_DECAY = {
  mood: 1,
  hunger: 2,
  energy: 1.5,
  cleanliness: 1,
  respect: 0.5,
} as const;

/** Food items: id, name, hunger gain, cleanliness change, mood change */
export const FOOD_ITEMS = [
  { id: "burger", name: "Burger", hunger: 35, cleanliness: -5, mood: 5 },
  { id: "pizza", name: "Pizza", hunger: 30, cleanliness: -3, mood: 8 },
  { id: "salad", name: "Salad", hunger: 20, cleanliness: 0, mood: 3 },
  { id: "steak", name: "Steak", hunger: 40, cleanliness: -2, mood: 10 },
  { id: "icecream", name: "Ice Cream", hunger: 15, cleanliness: 0, mood: 12 },
] as const;

export type FoodId = (typeof FOOD_ITEMS)[number]["id"];

/** Clean action: shower */
export const CLEAN_SHOWER = { cleanliness: 40, energy: -5 } as const;

/** Sleep action */
export const SLEEP_RECOVERY = { energy: 50, hunger: -10 } as const;
export const SLEEP_DURATION_MS = 4000;

/** Fun action: "Pump the Market" */
export const FUN_PUMP_MARKET = { mood: 15, respect: 5 } as const;

/** TrumpCoins */
export const DAILY_LOGIN_BONUS_COINS = 50;
export const STATS_GREEN_ZONE_BONUS_COINS = 10; // per tick when all stats >= 60
export const STATS_GREEN_THRESHOLD = 60;

/** Level: XP per level (simplified: level = floor(totalCoinsEarned / 100) + 1) */
export const COINS_PER_LEVEL = 100;

/** Shop item types */
export type ShopItemType = "hat" | "suit" | "background";

export interface ShopItemDef {
  id: string;
  name: string;
  type: ShopItemType;
  price: number;
}

/** Default shop items (cosmetic) */
export const SHOP_ITEMS: ShopItemDef[] = [
  { id: "hat_red", name: "Red Cap", type: "hat", price: 100 },
  { id: "hat_gold", name: "Gold Cap", type: "hat", price: 200 },
  { id: "suit_blue", name: "Blue Suit", type: "suit", price: 150 },
  { id: "suit_pinstripe", name: "Pinstripe Suit", type: "suit", price: 250 },
  { id: "bg_oval", name: "Oval Office", type: "background", price: 300 },
  { id: "bg_mara", name: "Mar-a-Lago", type: "background", price: 500 },
];

/** Max recent trades to keep */
export const MAX_RECENT_TRADES = 10;
