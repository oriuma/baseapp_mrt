"use client";

import { useGameStore } from "@/lib/gameState";

export function HeaderBar() {
  const trumpCoins = useGameStore((s) => s.trumpCoins);
  const level = useGameStore((s) => s.level);

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b-4 border-zinc-700 bg-amber-100">
      <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-zinc-800">
        My Trump
      </h1>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 font-bold text-amber-700">
          <span className="text-sm uppercase">Coins</span>
          <span className="tabular-nums">{trumpCoins}</span>
        </span>
        <span className="flex items-center gap-1 font-bold text-zinc-700">
          <span className="text-sm uppercase">Lv</span>
          <span className="tabular-nums">{level}</span>
        </span>
      </div>
    </header>
  );
}
