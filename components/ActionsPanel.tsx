"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/gameState";
import { PixelButton } from "./PixelButton";
import { Modal } from "./Modal";
import { FOOD_ITEMS, type FoodId } from "@/lib/constants";
import { TradingPanel } from "./TradingPanel";
import { ShopPanel } from "./ShopPanel";

export function ActionsPanel() {
  const [feedOpen, setFeedOpen] = useState(false);
  const [tradingOpen, setTradingOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const feed = useGameStore((s) => s.feed);
  const clean = useGameStore((s) => s.clean);
  const sleep = useGameStore((s) => s.sleep);
  const play = useGameStore((s) => s.play);
  const isSleeping = useGameStore((s) => s.isSleeping);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        <PixelButton onClick={() => setFeedOpen(true)} variant="primary" size="lg">
          🍔 Feed
        </PixelButton>
        <PixelButton onClick={clean} variant="success" size="lg">
          🚿 Clean
        </PixelButton>
        <PixelButton
          onClick={sleep}
          variant="secondary"
          size="lg"
          disabled={isSleeping}
        >
          😴 Sleep
        </PixelButton>
        <PixelButton onClick={play} variant="primary" size="lg">
          📈 Fun
        </PixelButton>
        <PixelButton onClick={() => setTradingOpen(true)} variant="danger" size="lg">
          📊 Trading
        </PixelButton>
        <PixelButton onClick={() => setShopOpen(true)} variant="secondary" size="lg">
          🛍️ Shop
        </PixelButton>
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

      <Modal isOpen={tradingOpen} onClose={() => setTradingOpen(false)} title="Trading">
        <TradingPanel onClose={() => setTradingOpen(false)} />
      </Modal>

      <Modal isOpen={shopOpen} onClose={() => setShopOpen(false)} title="Shop">
        <ShopPanel onClose={() => setShopOpen(false)} />
      </Modal>
    </>
  );
}
