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
    const hasRecentWin = recentTrades.length > 0 && 
      recentTrades[recentTrades.length - 1].profit > 0 &&
      Date.now() - recentTrades[recentTrades.length - 1].timestamp < 5000;
    
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
        className="pixelated"
        priority
        unoptimized
      />
    </div>
  );
}
