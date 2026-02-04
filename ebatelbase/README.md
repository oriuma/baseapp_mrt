# My Trump

A Tamagotchi-style browser game. Take care of **Mr. T** — feed him, clean him, let him sleep, have fun, and report your trading results. Mr. T is happier when you lose (liquidation / big loss) and less happy when you profit.

This project is configured as a **Base Mini App** and can be published to the Base app via the Farcaster manifest.

## Base Mini App

- **Manifest**: Served at `/.well-known/farcaster.json` (see [Base Mini App quickstart](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)).
- **Config**: `minikit.config.ts` at the project root defines the mini app name, description, icon, splash, tags, and `homeUrl` (the main game page). The manifest route imports this config and returns it as JSON.
- **Account association**: The `accountAssociation` object in `minikit.config.ts` must be filled using the Base Build tool before publishing:
  1. Deploy this app to Vercel. In the Vercel project: **Settings → Deployment Protection** → turn off "Vercel Authentication" so the manifest is publicly reachable.
  2. Open [Base Build — Account association](https://www.base.dev/preview?tab=account).
  3. Enter your app URL (e.g. `my-trump.vercel.app`) in **App URL** and click **Submit**.
  4. Click **Verify** and complete the flow to generate `header`, `payload`, and `signature`.
  5. Copy the `accountAssociation` object and paste it into `minikit.config.ts` (replace the empty strings).
  6. Push to `main` so Vercel redeploys. Then use [base.dev/preview](https://base.dev/preview) to validate and publish.

Optional assets: add `public/screenshot-portrait.png` and `public/mytrump-icon.png` (e.g. 512×512) for store listing; the config currently falls back to `favicon.ico` for icon/splash/og.

## Tech Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **Zustand** for client-side game state
- **localStorage** for persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The game is mobile-first and works best on a phone or with DevTools device emulation.

## Build & Run (Production)

```bash
npm run build
npm start
```

Ensure the app builds with `npm run build` and runs with `npm start` before deploying.

## Deploy on Vercel

1. Push the repo to GitHub (or connect another Git provider).
2. In [Vercel](https://vercel.com), import the project and deploy.
3. No environment variables are required for the MVP.
4. Build command: `npm run build` (default). Output directory: `.next` (default).

The app is fully client-side; all game state and persistence use `localStorage`, so there is no server-side dependency that could break on Vercel.

## Game Features (MVP)

- **Stats**: Mood, Hunger, Energy, Cleanliness, Respect (0–100). They decay over time (tick every ~8s).
- **Actions**: Feed (multiple foods), Clean (shower), Sleep (energy recovery + dimmed background), Fun (e.g. "Pump the Market"), Trading (report liquidation / profit / small loss or enter PnL).
- **Trading**: Liquidation / Big Loss → mood up; Profit / Win → mood down. Optional numeric PnL input. Recent trades log (last 10).
- **TrumpCoins**: Earn from daily login bonus and from keeping all stats in the green zone. Spend in the Shop.
- **Shop**: Cosmetic items (hats, suits, backgrounds). Buy and equip; state persisted in localStorage.

## Project Structure

- `app/` — layout, page, globals.css; `app/.well-known/farcaster.json/route.ts` (manifest); `app/api/webhook/route.ts` (placeholder)
- `minikit.config.ts` — Base Mini App / Farcaster config (manifest source)
- `components/` — GameScreen, StatusBar, HeaderBar, ActionsPanel, TradingPanel, ShopPanel, Modal, PixelButton, PixelCard
- `lib/` — gameState (Zustand), tradingLogic, persistence, constants
- `public/sprites/` — placeholder SVGs for Mr. T and room (replace with PNG pixel art if desired)

## Extending (e.g. Real Trading APIs)

Trading logic lives in `lib/tradingLogic.ts` with TODO comments. To plug in real APIs (Polymarket, CEX, etc.):

- Subscribe to PnL / position updates in a client component or hook.
- Call `markTrade(eventType, pnl)` from the game store with the appropriate event or numeric PnL.
- `getTradeResult()` and `getTradeResultFromPnL()` already map events/PnL to mood and respect deltas.
