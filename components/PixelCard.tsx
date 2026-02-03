"use client";

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function PixelCard({ children, className = "", title }: PixelCardProps) {
  return (
    <div
      className={`
        border-[3px] border-zinc-700 bg-zinc-100
        shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]
        p-3
        ${className}
      `}
    >
      {title && (
        <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-700 mb-2 border-b-2 border-zinc-400 pb-1">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
