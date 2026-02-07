"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/lib/gameState";
import { loadState, saveState, isClient } from "@/lib/persistence";
import { TICK_INTERVAL_MS } from "@/lib/constants";
import { ROOMS, type Room } from "@/lib/rooms";
import { HeaderBar } from "./HeaderBar";
import { StatusBar } from "./StatusBar";
import { RoomIndicator } from "./RoomIndicator";
import { TrumpSprite } from "./TrumpSprite";
import { KitchenRoom } from "./rooms/KitchenRoom";
import { BathroomRoom } from "./rooms/BathroomRoom";
import { BedroomRoom } from "./rooms/BedroomRoom";
import { FunRoom } from "./rooms/FunRoom";
import { TradingRoom } from "./rooms/TradingRoom";
import { ShopRoom } from "./rooms/ShopRoom";

const ROOM_COMPONENTS: Record<Room, React.ComponentType> = {
  kitchen: KitchenRoom,
  bathroom: BathroomRoom,
  bedroom: BedroomRoom,
  fun: FunRoom,
  trading: TradingRoom,
  shop: ShopRoom,
};

const SWIPE_THRESHOLD = 50;

export function GameScreen() {
  const currentRoom = useGameStore((s) => s.currentRoom);
  const setRoom = useGameStore((s) => s.setRoom);
  const tick = useGameStore((s) => s.tick);
  const hydrate = useGameStore((s) => s.hydrate);
  const getStateForPersistence = useGameStore((s) => s.getStateForPersistence);
  const applyDailyBonus = useGameStore((s) => s.applyDailyBonus);
  const hydrated = useRef(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [transitionDir, setTransitionDir] = useState<0 | 1 | -1>(0);

  const moveRoom = (direction: -1 | 1) => {
    const index = ROOMS.indexOf(currentRoom);
    const nextIndex = (index + direction + ROOMS.length) % ROOMS.length;
    setTransitionDir(direction);
    setRoom(ROOMS[nextIndex] as Room);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > SWIPE_THRESHOLD) {
      moveRoom(-1); // swipe right -> previous room
    } else if (diff < -SWIPE_THRESHOLD) {
      moveRoom(1); // swipe left -> next room
    }
    setTouchStartX(null);
  };

  // Reset transition after animation
  useEffect(() => {
    if (transitionDir === 0) return;
    const id = setTimeout(() => setTransitionDir(0), 300);
    return () => clearTimeout(id);
  }, [transitionDir, currentRoom]);

  // Load persisted state and daily bonus (client-only)
  useEffect(() => {
    if (!isClient()) return;
    if (hydrated.current) return;
    hydrated.current = true;
    const loaded = loadState();
    if (loaded) {
      hydrate({
        stats: loaded.stats,
        trumpCoins: loaded.trumpCoins,
        level: loaded.level,
        totalCoinsEarned: loaded.totalCoinsEarned,
        lastDailyBonusDate: loaded.lastDailyBonusDate,
        inventory: loaded.inventory,
        recentTrades: loaded.recentTrades,
      });
    }
    applyDailyBonus();
  }, [hydrate, applyDailyBonus]);

  // Tick loop
  useEffect(() => {
    const id = setInterval(() => tick(), TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [tick]);

  // Persist whenever store changes (client-only)
  useEffect(() => {
    if (!isClient()) return;
    const unsub = useGameStore.subscribe(() => {
      const state = useGameStore.getState().getStateForPersistence();
      saveState(state);
    });
    return unsub;
  }, []);

  const RoomContent = ROOM_COMPONENTS[currentRoom];

  return (
    <div className="relative flex flex-col min-h-screen max-w-lg mx-auto bg-amber-50 overflow-hidden">
      {/* Persistent UI: always visible */}
      <div className="relative z-20 flex-shrink-0">
        <HeaderBar />
        <StatusBar />
        <RoomIndicator />
      </div>

      {/* Swipeable room area: only center and bottom actions change per room */}
      <div
        className="relative z-10 flex-1 flex flex-col min-h-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div
          key={currentRoom}
          className={`
            absolute inset-0 flex flex-col min-h-0
            transition-all duration-300 ease-out
            ${transitionDir === 1 ? "animate-slide-in-left" : ""}
            ${transitionDir === -1 ? "animate-slide-in-right" : ""}
          `}
        >
          <RoomContent />
        </div>
      </div>

      {/* Trump Sprite - always visible, floating above room content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <TrumpSprite />
      </div>
    </div>
  );
}
