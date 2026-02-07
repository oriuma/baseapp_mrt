/**
 * Room types for swipeable game screens.
 */

export type Room = "kitchen" | "bathroom" | "bedroom" | "fun" | "trading" | "shop";

export const ROOMS: Room[] = [
  "kitchen",
  "bathroom",
  "bedroom",
  "fun",
  "trading",
  "shop",
];

export const ROOM_LABELS: Record<Room, string> = {
  kitchen: "🍔 Kitchen",
  bathroom: "🚿 Bathroom",
  bedroom: "🛌 Bedroom",
  fun: "🎮 Fun",
  trading: "📊 Trading",
  shop: "🛍️ Shop",
};
