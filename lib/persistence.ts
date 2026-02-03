/**
 * Persistence layer for My Trump game.
 * Uses localStorage; all functions must be called in the browser (client-side only).
 * Use with "use client" and lazy initialization to avoid SSR issues.
 */

const STORAGE_KEY = "my-trump-game-state";

export interface PersistedState {
  stats: {
    mood: number;
    hunger: number;
    energy: number;
    cleanliness: number;
    respect: number;
  };
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

export function loadState(): PersistedState | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  if (!isClient()) return;
  try {
    const toSave: PersistedState = {
      ...state,
      lastSavedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore quota / private mode errors
  }
}

export function clearState(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
