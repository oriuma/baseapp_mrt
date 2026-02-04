"use client";

/**
 * Sprite-based pixel-art character (Mr. T).
 * Tries .png first; falls back to .svg if PNGs are not present.
 */

import { useState } from "react";

export type TrumpSpriteProps = {
  mood: number;
  cleanliness: number;
  isSleeping: boolean;
  isCleaning?: boolean;
};

const SPRITES_BASE = "/sprites";

export function TrumpSprite({
  mood,
  cleanliness,
  isSleeping,
  isCleaning = false,
}: TrumpSpriteProps) {
  let spriteName = "trump_idle";
  if (isSleeping) {
    spriteName = "trump_sleep";
  } else if (isCleaning) {
    spriteName = "trump_happy";
  } else if (cleanliness < 30) {
    spriteName = "trump_dirty";
  } else if (mood > 70) {
    spriteName = "trump_happy";
  } else if (mood < 30) {
    spriteName = "trump_angry";
  }

  const [useSvg, setUseSvg] = useState(false);
  const src = useSvg
    ? `${SPRITES_BASE}/${spriteName}.svg`
    : `${SPRITES_BASE}/${spriteName}.png`;

  return (
    <div className="w-full flex justify-center items-center flex-shrink-0">
      <img
        src={src}
        alt="Mr. T"
        width={160}
        height={160}
        className="image-pixelated w-40 h-40 object-contain"
        style={{ imageRendering: "pixelated" }}
        onError={() => {
          if (!useSvg) setUseSvg(true);
        }}
      />
    </div>
  );
}
