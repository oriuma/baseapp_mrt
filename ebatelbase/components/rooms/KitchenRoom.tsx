"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/gameState";
import { TrumpSprite } from "../TrumpSprite";
import { PixelButton } from "../PixelButton";
import { Modal } from "../Modal";
import { getRoomBackground } from "@/lib/rooms";
import { FOOD_ITEMS, type FoodId } from "@/lib/constants";

export function KitchenRoom() {
  const [feedOpen, setFeedOpen] = useState(false);
  const stats = useGameStore((s) => s.stats);
  const isSleeping = useGameStore((s) => s.isSleeping);
  const isCleaning = useGameStore((s) => s.isCleaning);
  const lastActionMessage = useGameStore((s) => s.lastActionMessage);
  const feed = useGameStore((s) => s.feed);

  return (
    <>
      <div
        className="absolute inset-0 bg-amber-50"
        aria-hidden
      >
        <img
          src={getRoomBackground("kitchen")}
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
            Kitchen — Feed Mr. T
          </p>
          <PixelButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setFeedOpen(true)}
          >
            🍔 Feed
          </PixelButton>
        </div>
      </div>
      <Modal isOpen={feedOpen} onClose={() => setFeedOpen(false)} title="Feed Mr. T">
        <div className="flex flex-wrap gap-2">
          {FOOD_ITEMS.map((food) => (
            <PixelButton
              key={food.id}
              variant="primary"
              size="md"
              onClick={() => {
                feed(food.id as FoodId);
                setFeedOpen(false);
              }}
            >
              {food.name}
            </PixelButton>
          ))}
        </div>
      </Modal>
    </>
  );
}
