"use client";

import { useGameStore } from "@/lib/gameState";
import { TrumpSprite } from "../TrumpSprite";
import { getRoomBackground } from "@/lib/rooms";
import { ShopPanel } from "../ShopPanel";

export function ShopRoom() {
  const stats = useGameStore((s) => s.stats);
  const isSleeping = useGameStore((s) => s.isSleeping);
  const isCleaning = useGameStore((s) => s.isCleaning);
  const lastActionMessage = useGameStore((s) => s.lastActionMessage);

  return (
    <>
      <div className="absolute inset-0 bg-emerald-50" aria-hidden>
        <img
          src={getRoomBackground("shop")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 image-pixelated"
          style={{ imageRendering: "pixelated" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-auto">
        <div className="flex-shrink-0 flex flex-col justify-center items-center min-h-[140px] py-2">
          <TrumpSprite
            mood={stats.mood}
            cleanliness={stats.cleanliness}
            isSleeping={isSleeping}
            isCleaning={isCleaning}
          />
          {lastActionMessage && (
            <div className="mt-1 px-3 py-1 border-2 border-zinc-600 bg-zinc-100 text-xs font-bold text-zinc-800 rounded-none max-w-[90%] text-center">
              {lastActionMessage}
            </div>
          )}
        </div>
        <div className="flex-1 p-3 min-h-0 overflow-auto">
          <p className="text-xs font-bold uppercase text-zinc-600 text-center mb-2">
            Shop — Cosmetics
          </p>
          <ShopPanel onClose={() => {}} />
        </div>
      </div>
    </>
  );
}
