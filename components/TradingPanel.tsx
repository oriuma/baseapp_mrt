"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/gameState";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";
import type { TradeEventType } from "@/lib/tradingLogic";

export function TradingPanel({ onClose }: { onClose: () => void }) {
  const markTrade = useGameStore((s) => s.markTrade);
  const recentTrades = useGameStore((s) => s.recentTrades);
  const [pnlInput, setPnlInput] = useState("");

  const handleEvent = (eventType: TradeEventType) => {
    markTrade(eventType);
  };

  const handlePnL = () => {
    const num = parseFloat(pnlInput);
    if (!Number.isNaN(num)) {
      markTrade("small_loss", num); // type ignored when pnl provided
      setPnlInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-zinc-600 mb-2">
          Mr. T is happier when you lose. Profit makes him grumpy.
        </p>
        <div className="flex flex-wrap gap-2">
          <PixelButton
            variant="success"
            size="md"
            onClick={() => handleEvent("liquidation")}
          >
            Liquidation / Big Loss
          </PixelButton>
          <PixelButton
            variant="danger"
            size="md"
            onClick={() => handleEvent("profit")}
          >
            Profit / Win
          </PixelButton>
          <PixelButton
            variant="secondary"
            size="md"
            onClick={() => handleEvent("small_loss")}
          >
            Small Loss / Stop
          </PixelButton>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase text-zinc-700 mb-1">
          PnL (optional)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={pnlInput}
            onChange={(e) => setPnlInput(e.target.value)}
            placeholder="e.g. -100 or 50"
            className="flex-1 border-2 border-zinc-600 px-3 py-2 font-mono text-zinc-800 bg-white"
          />
          <PixelButton variant="primary" size="md" onClick={handlePnL}>
            Apply
          </PixelButton>
        </div>
      </div>

      <PixelCard title="Recent trades">
        <ul className="space-y-1 text-sm">
          {recentTrades.length === 0 ? (
            <li className="text-zinc-500">No trades yet.</li>
          ) : (
            recentTrades.map((t, i) => (
              <li key={i} className="flex justify-between">
                <span>{t.type}</span>
                <span className="text-zinc-500 tabular-nums">
                  {new Date(t.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </PixelCard>
    </div>
  );
}
