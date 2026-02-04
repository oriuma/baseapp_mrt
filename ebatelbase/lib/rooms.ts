/**
 * Room types and config for swipeable locations.
 * Background assets: use .svg placeholders; replace with .png for production art.
 */

export type Room =
  | "kitchen"
  | "bathroom"
  | "bedroom"
  | "fun"
  | "trading"
  | "shop";

export const ROOMS: Room[] = [
  "kitchen",
  "bathroom",
  "bedroom",
  "fun",
  "trading",
  "shop",
];

export const ROOM_LABELS: Record<Room, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  bedroom: "Bedroom",
  fun: "Fun",
  trading: "Trading",
  shop: "Shop",
};

const SPRITES_BASE = "/sprites";

/** Background image per room (svg placeholder; can replace with .png) */
export function getRoomBackground(room: Room): string {
  return `${SPRITES_BASE}/room_${room}.svg`;
}
