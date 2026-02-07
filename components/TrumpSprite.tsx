"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/lib/gameState";
import Image from "next/image";

const FRAME_COUNT = 10;
const ANIMATION_SPEED = 100; // ms per frame

export function TrumpSprite() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const stats = useGameStore((s) => s.stats);
  const recentTrades = useGameStore((s) => s.recentTrades);

  // Определяем, должен ли Трамп злиться
  const isAngry = () => {
    // Проверка красных показателей (< 30)
    const hasRedStat = Object.values(stats).some((value) => value < 30);
    
    // Проверка недавнего выигрыша в трейдинге (последние 5 секунд)
    // Если в type есть "PnL:" и положительное число, или type === "profit"
    const hasRecentWin = recentTrades.length > 0 && 
      (
        recentTrades[0].type === "profit" ||
        (recentTrades[0].type.startsWith("PnL:") && parseFloat(recentTrades[0].type.split(":")[1]) > 0)
      ) &&
      Date.now() - recentTrades[0].timestamp < 5000;
    
    return hasRedStat || hasRecentWin;
  };

  const animationType = isAngry() ? "angry" : "idle";

  // Анимационный цикл
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % FRAME_COUNT) + 1);
    }, ANIMATION_SPEED);

    return () => clearInterval(interval);
  }, []);

  const frameNumber = currentFrame.toString().padStart(3, "0");
  const spritePath = `/sprites/animations/trump_${animationType}/frame_${frameNumber}.png`;

  return (
    <div className="relative flex items-center justify-center">
      <Image
        src={spritePath}
        alt="Trump"
        width={64}
        height={80}
        className="image-rendering-pixelated"
        priority
        unoptimized
      />
    </div>
  );
}
