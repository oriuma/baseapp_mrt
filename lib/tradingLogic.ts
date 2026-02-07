/**
 * Trading logic for My Trump: maps trade outcomes to mood/respect changes.
 * Mr. T loves your liquidations and hates your wins.
 */

export type TradeEventType = "liquidation" | "profit" | "small_loss";

export interface TradeResult {
  moodDelta: number;
  respectDelta: number;
}

/**
 * Map a predefined trade event to mood/respect deltas.
 */
export function getTradeResult(eventType: TradeEventType): TradeResult {
  switch (eventType) {
    case "liquidation":
      // Big loss → Mr. T is very happy
      return { moodDelta: 20, respectDelta: 10 };
    case "profit":
      // Win → Mr. T is sad
      return { moodDelta: -15, respectDelta: -5 };
    case "small_loss":
      // Small loss → Mr. T is moderately happy
      return { moodDelta: 10, respectDelta: 5 };
    default:
      return { moodDelta: 0, respectDelta: 0 };
  }
}

/**
 * Map numeric PnL to mood/respect deltas.
 * Negative PnL (loss) → happy Mr. T; positive PnL (profit) → sad Mr. T.
 *
 * TODO: Plug in real trading APIs (Polymarket, CEX) here.
 * Call this function with live PnL from your trading feed.
 */
export function getTradeResultFromPnL(pnl: number): TradeResult {
  if (pnl < -100) {
    // Big loss / liquidation
    return { moodDelta: 20, respectDelta: 10 };
  } else if (pnl < 0) {
    // Small loss
    return { moodDelta: 10, respectDelta: 5 };
  } else if (pnl > 100) {
    // Big profit
    return { moodDelta: -20, respectDelta: -10 };
  } else if (pnl > 0) {
    // Small profit
    return { moodDelta: -10, respectDelta: -5 };
  }
  return { moodDelta: 0, respectDelta: 0 };
}

/**
 * Apply a trade result to mood and respect, clamping [0, 100].
 */
export function applyTradeResult(
  mood: number,
  respect: number,
  result: TradeResult
): { mood: number; respect: number } {
  const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
  return {
    mood: clamp(mood + result.moodDelta),
    respect: clamp(respect + result.respectDelta),
  };
}
