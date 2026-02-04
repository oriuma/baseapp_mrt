"use client";

import { useGameStore } from "@/lib/gameState";
import { TrumpSprite } from "../TrumpSprite";
import { PixelButton } from "../PixelButton";
import { getRoomBackground } from "@/lib/rooms";

export function BedroomRoom() {
  const stats = useGameStore((s) => s.stats);
  const isSleeping = useGameStore((s) => s.isSleeping);
  const isCleaning = useGameStore((s) => s.isCleaning);
  const lastActionMessage = useGameStore((s) => s.lastActionMessage);
  const sleep = useGameStore((s) => s.sleep);

  return (
    <>
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isSleeping ? "bg-indigo-950" : "bg-indigo-50"
        }`}
        aria-hidden
      >
        <img
          src={getRoomBackground("bedroom")}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover image-pixelated transition-all duration-700 ${
            isSleeping ? "opacity-20 brightness-50" : "opacity-40"
          }`}
          style={{ imageRendering: "pixelated" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex flex-col justify-center items-center min-h-[200px] py-4">
          <TrumpSprite
            mood={stats.mood}
            cleanliness={stats.cleanliness}
            isSleeping={isSleeping}
            isCleaning={isCleaning}
          />
          {lastActionMessage && (
            <div className="mt-2 px-3 py-1.5 border-2 border-zinc-600 bg-zinc-100 text-sm font-bold text-zinc-800 rounded-none max-w-[90%] text-center">
              {lastActionMessage}
            </div>
          )}
        </div>
        <div className="p-3 space-y-2">
          <p className="text-xs font-bold uppercase text-zinc-600 text-center">
            Bedroom — Sleep
          </p>
          <PixelButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={sleep}
            disabled={isSleeping}
          >
            😴 Sleep
          </PixelButton>
        </div>
      </div>
    </>
  );
}
