"use client";

import type { ButtonHTMLAttributes } from "react";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-amber-500 border-amber-700 text-amber-950 hover:bg-amber-400 active:bg-amber-600",
  secondary: "bg-zinc-400 border-zinc-600 text-zinc-900 hover:bg-zinc-300 active:bg-zinc-500",
  danger: "bg-red-500 border-red-700 text-white hover:bg-red-400 active:bg-red-600",
  success: "bg-emerald-500 border-emerald-700 text-emerald-950 hover:bg-emerald-400 active:bg-emerald-600",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm min-h-[36px]",
  md: "px-4 py-3 text-base min-h-[48px]",
  lg: "px-6 py-4 text-lg min-h-[56px]",
};

export function PixelButton({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  disabled,
  ...props
}: PixelButtonProps) {
  return (
    <button
      type="button"
      className={`
        font-bold uppercase tracking-wide
        border-[3px] border-b-4
        image-rendering-pixelated
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{ imageRendering: "pixelated" }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
