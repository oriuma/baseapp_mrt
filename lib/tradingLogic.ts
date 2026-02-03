/**
 * Trading logic for My Trump (Mr. T).
 *
 * Special mechanic: Mr. T is HAPPIER when the player loses (liquidation / big loss)
 * and LESS HAPPY when the player profits. This is inverted from real sentiment.
 *
 * TODO: Later connect real trading APIs (Polymarket, CEX, etc.):
 * - Subscribe to PnL / position updates
 * - Map external events to TradeEventType or raw PnL
 * - Call applyTradeResult() from API callbacks
 */

import { STAT_MAX, STAT_MIN } from "./constants";

export type TradeEventType = "liquidation" | "profit" | "small_loss";

export interface TradeResult {
  moodDelta: number;
  respectDelta: number;
}

/**
 * Map a trade event to mood/respect deltas.
 * Liquidation / big loss → mood UP (positive delta), respect can go up (he "relates").
 * Profit / win → mood DOWN (negative delta), respect can go down.
 */
export function getTradeResult(
  eventType: TradeEventType,
  pnl?: number
): TradeResult {
  switch (eventType) {
    case "liquidation":
      return { moodDelta: 25, respectDelta: 5 };
    case "profit":
      return { moodDelta: -20, respectDelta: -3 };
    case "small_loss":
      return { moodDelta: 10, respectDelta: 2 };
    default:
      return { moodDelta: 0, respectDelta: 0 };
  }
}

/**
 * Optional: map raw PnL number to mood/respect.
 * Positive PnL → mood down, negative PnL → mood up.
 * Scale: e.g. ±100 PnL ≈ ±15 mood.
 */
export function getTradeResultFromPnL(pnl: number): TradeResult {
  const scale = 0.15;
  const moodDelta = -pnl * scale; // profit -> negative mood delta
  const respectDelta = pnl < 0 ? 2 : -1;
  return {
    moodDelta: Math.round(Math.max(-25, Math.min(25, moodDelta))),
    respectDelta: Math.round(Math.max(-5, Math.min(5, respectDelta))),
  };
}

/**
 * Clamp a stat to [STAT_MIN, STAT_MAX].
 */
export function clampStat(value: number): number {
  return Math.max(STAT_MIN, Math.min(STAT_MAX, Math.round(value)));
}

/**
 * Apply trade result to current mood and respect; returns new values (clamped).
 */
export function applyTradeResult(
  currentMood: number,
  currentRespect: number,
  result: TradeResult
): { mood: number; respect: number } {
  return {
    mood: clampStat(currentMood + result.moodDelta),
    respect: clampStat(currentRespect + result.respectDelta),
  };
}
