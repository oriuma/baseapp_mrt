"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Calls Base Mini App SDK ready() once on mount so the host can hide the splash screen.
 * Safe outside Base: errors are caught and ignored.
 */
export function MiniAppReady({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    try {
      import("@farcaster/miniapp-sdk").then((mod) => {
        if (cancelled) return;
        const sdk = mod.default ?? (mod as { sdk?: { actions?: { ready?: () => Promise<void> } } }).sdk;
        if (sdk?.actions?.ready) void sdk.actions.ready();
      }).catch(() => {
        // not in Base mini app context
      });
    } catch {
      // ignore
    }
    return () => { cancelled = true; };
  }, []);

  return <>{children}</>;
}
