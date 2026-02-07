"use client";

import { useGameStore } from "@/lib/gameState";
import { PixelButton } from "../PixelButton";
import { getRoomBackground } from "@/lib/rooms";

export function BathroomRoom() {
  const lastActionMessage = useGameStore((s) => s.lastActionMessage);
  const clean = useGameStore((s) => s.clean);

  return (
    <>
      <div className="absolute inset-0 bg-sky-50" aria-hidden>
        <img
          src={getRoomBackground("bathroom")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 image-pixelated"
          style={{ imageRendering: "pixelated" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex flex-col justify-center items-center min-h-[200px] py-4">
          {lastActionMessage && (
            <div className="mt-2 px-3 py-1.5 border-2 border-zinc-600 bg-zinc-100 text-sm font-bold text-zinc-800 rounded-none max-w-[90%] text-center">
              {lastActionMessage}
            </div>
          )}
        </div>
        <div className="p-3 space-y-2">
          <p className="text-xs font-bold uppercase text-zinc-600 text-center">
            Bathroom — Clean
          </p>
          <PixelButton
            variant="success"
            size="lg"
            className="w-full"
            onClick={clean}
          >
            🚿 Shower
          </PixelButton>
        </div>
      </div>
    </>
  );
}
