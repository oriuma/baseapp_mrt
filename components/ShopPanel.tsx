"use client";

import { useGameStore } from "@/lib/gameState";
import { SHOP_ITEMS } from "@/lib/constants";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

export function ShopPanel({ onClose }: { onClose: () => void }) {
  const trumpCoins = useGameStore((s) => s.trumpCoins);
  const inventory = useGameStore((s) => s.inventory);
  const buyItem = useGameStore((s) => s.buyItem);
  const equipItem = useGameStore((s) => s.equipItem);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600">
        TrumpCoins: <strong>{trumpCoins}</strong>
      </p>
      <PixelCard title="Cosmetics">
        <ul className="space-y-2">
          {SHOP_ITEMS.map((item) => {
            const inv = inventory[item.id];
            const owned = inv?.owned ?? false;
            const equipped = inv?.equipped ?? false;
            const canBuy = !owned && trumpCoins >= item.price;

            return (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 p-2 border-2 border-zinc-400 bg-zinc-50"
              >
                <div>
                  <span className="font-bold">{item.name}</span>
                  <span className="text-zinc-500 text-sm ml-2">
                    ({item.type}) — {item.price} coins
                  </span>
                </div>
                <div className="flex gap-1">
                  {owned ? (
                    <PixelButton
                      variant={equipped ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => equipItem(item.id)}
                      disabled={equipped}
                    >
                      {equipped ? "Equipped" : "Equip"}
                    </PixelButton>
                  ) : (
                    <PixelButton
                      variant="primary"
                      size="sm"
                      onClick={() => buyItem(item.id)}
                      disabled={!canBuy}
                    >
                      Buy
                    </PixelButton>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </PixelCard>
    </div>
  );
}
