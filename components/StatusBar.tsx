"use client";

import { useGameStore, type CharacterStats } from "@/lib/gameState";
import { STATS_GREEN_THRESHOLD } from "@/lib/constants";

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  mood: "Mood",
  hunger: "Hunger",
  energy: "Energy",
  cleanliness: "Clean",
  respect: "Respect",
};

function StatBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const isGreen = pct >= STATS_GREEN_THRESHOLD;
  const isLow = pct < 30;

  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <div className="flex justify-between text-xs font-bold uppercase">
        <span className="text-zinc-700 truncate">{label}</span>
        <span className="text-zinc-600 tabular-nums">{value}</span>
      </div>
      <div className="h-2 border-2 border-zinc-600 bg-zinc-300 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLow ? "bg-red-500" : isGreen ? "bg-emerald-500" : "bg-amber-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function StatusBar() {
  const stats = useGameStore((s) => s.stats);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 border-2 border-zinc-600 bg-zinc-200/90 rounded-none">
      {(Object.keys(stats) as Array<keyof typeof stats>).map((key) => (
        <StatBar key={key} label={STAT_LABELS[key]} value={stats[key]} />
      ))}
    </div>
  );
}
