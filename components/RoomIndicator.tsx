"use client";

import { useGameStore } from "@/lib/gameState";
import { ROOMS, ROOM_LABELS, type Room } from "@/lib/rooms";

export function RoomIndicator() {
  const currentRoom = useGameStore((s) => s.currentRoom);
  const setRoom = useGameStore((s) => s.setRoom);

  return (
    <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 border-b-2 border-zinc-300 bg-zinc-100/90">
      <span className="text-xs font-bold uppercase text-zinc-600 mr-1 tabular-nums">
        {ROOM_LABELS[currentRoom]}
      </span>
      <span className="text-zinc-400 text-xs">·</span>
      <div className="flex gap-1" role="tablist" aria-label="Rooms">
        {ROOMS.map((room, i) => (
          <button
            key={room}
            type="button"
            role="tab"
            aria-selected={room === currentRoom}
            aria-label={`Go to ${ROOM_LABELS[room]}`}
            onClick={() => setRoom(room as Room)}
            className={`
              w-2 h-2 rounded-none border-2 transition-colors
              ${room === currentRoom ? "bg-amber-600 border-amber-700" : "bg-zinc-300 border-zinc-400"}
            `}
          />
        ))}
      </div>
      <span className="text-zinc-400 text-xs ml-1">Swipe ↔</span>
    </div>
  );
}
