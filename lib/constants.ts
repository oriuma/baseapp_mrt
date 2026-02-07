/**
 * Game constants: stat decay rates, food items, shop items, etc.
 */

export const STAT_MIN = 0;
export const STAT_MAX = 100;

export const TICK_INTERVAL_MS = 8000;

export const TICK_DECAY = {
  mood: 1,
  hunger: 2,
  energy: 1.5,
  cleanliness: 1,
  respect: 0.5,
};

export type FoodId = "burger" | "pizza" | "salad" | "coffee";

export const FOOD_ITEMS = [
  { id: "burger" as FoodId, name: "Burger", hunger: 20, mood: 5, cleanliness: -5 },
  { id: "pizza" as FoodId, name: "Pizza", hunger: 25, mood: 10, cleanliness: -10 },
  { id: "salad" as FoodId, name: "Salad", hunger: 10, mood: -5, cleanliness: 5 },
  { id: "coffee" as FoodId, name: "Coffee", hunger: 5, mood: 15, cleanliness: 0 },
];

export const CLEAN_SHOWER = { cleanliness: 30, energy: -10 };

export const SLEEP_RECOVERY = { energy: 50, hunger: -10 };
export const SLEEP_DURATION_MS = 3000;

export const FUN_PUMP_MARKET = { mood: 10, respect: 5 };

export const DAILY_LOGIN_BONUS_COINS = 50;
export const STATS_GREEN_ZONE_BONUS_COINS = 1;
export const STATS_GREEN_THRESHOLD = 60;

export const COINS_PER_LEVEL = 500;

export const MAX_RECENT_TRADES = 10;

export const SHOP_ITEMS = [
  { id: "hat_red", name: "Red Hat", type: "hat", price: 100 },
  { id: "hat_blue", name: "Blue Hat", type: "hat", price: 150 },
  { id: "suit_black", name: "Black Suit", type: "suit", price: 200 },
  { id: "suit_gold", name: "Gold Suit", type: "suit", price: 300 },
  { id: "bg_night", name: "Night Sky BG", type: "bg", price: 250 },
  { id: "bg_beach", name: "Beach BG", type: "bg", price: 350 },
];
