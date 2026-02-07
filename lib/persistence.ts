/**
 * LocalStorage persistence utilities for My Trump game state.
 */

import type { CharacterStats } from "./gameState";

const STORAGE_KEY = "mytrump_save_v1";

export interface PersistedState {
  stats: CharacterStats;
  trumpCoins: number;
  level: number;
  totalCoinsEarned: number;
  lastDailyBonusDate: string | null;
  inventory: Record<string, { owned: boolean; equipped: boolean }>;
  recentTrades: Array<{ type: string; timestamp: number }>;
  lastSavedAt: number;
}

export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function saveState(state: PersistedState): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

export function loadState(): PersistedState | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load state:", err);
    return null;
  }
}
