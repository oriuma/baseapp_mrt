# MyTrump - Migration Instructions

## ✅ Completed Steps

The following has been successfully migrated to the new structure:

### Root Configuration
- ✅ `package.json` - Updated with correct scripts and dependencies
- ✅ `tsconfig.json` - Proper TypeScript configuration
- ✅ `next.config.ts` - Next.js 15 configuration
- ✅ `eslint.config.mjs` - ESLint v9 flat config
- ✅ `postcss.config.mjs` - PostCSS with Tailwind
- ✅ `tailwind.config.ts` - Tailwind CSS configuration
- ✅ `.gitignore` - Updated for root structure
- ✅ `minikit.config.ts` - Coinbase Smart Wallet config

### App Directory
- ✅ `app/layout.tsx` - Root layout with metadata
- ✅ `app/page.tsx` - Main page using GameScreen
- ✅ `app/globals.css` - Global Tailwind styles
- ✅ `app/MiniAppReady.tsx` - Client component for MiniKit
- ✅ `app/.well-known/farcaster.json/route.ts` - Farcaster manifest
- ✅ `app/api/webhook/route.ts` - Webhook endpoint

### Lib Directory
- ✅ `lib/gameState.ts` - Zustand store with full game logic
- ✅ `lib/constants.ts` - Game constants (food, shop items, etc.)
- ✅ `lib/persistence.ts` - LocalStorage utilities
- ✅ `lib/tradingLogic.ts` - Trading event calculations
- ✅ `lib/rooms.ts` - Room types and background helper

### Components Directory
- ✅ `components/GameScreen.tsx` - Main game container
- ✅ `components/HeaderBar.tsx` - Top header with coins/level
- ✅ `components/StatusBar.tsx` - Character stats display
- ✅ `components/RoomIndicator.tsx` - Room navigation
- ✅ `components/ActionsPanel.tsx` - Legacy actions (unused)
- ✅ `components/TradingPanel.tsx` - Trading UI
- ✅ `components/ShopPanel.tsx` - Shop UI
- ✅ `components/PixelButton.tsx` - Styled button component
- ✅ `components/PixelCard.tsx` - Styled card component
- ✅ `components/Modal.tsx` - Modal dialog component
- ✅ `components/TrumpSprite.tsx` - Character sprite display

### Room Components
- ✅ `components/rooms/KitchenRoom.tsx` - Kitchen with feeding
- ✅ `components/rooms/BathroomRoom.tsx` - Bathroom with cleaning
- ✅ `components/rooms/BedroomRoom.tsx` - Bedroom with sleeping
- ✅ `components/rooms/FunRoom.tsx` - Fun room with entertainment
- ✅ `components/rooms/TradingRoom.tsx` - Trading room with panel
- ✅ `components/rooms/ShopRoom.tsx` - Shop room with cosmetics

### Public Assets (SVG Sprites)
- ✅ `public/sprites/trump_idle.svg`
- ✅ `public/sprites/trump_sleep.svg`
- ✅ `public/sprites/trump_happy.svg`
- ✅ `public/sprites/trump_angry.svg`
- ✅ `public/sprites/trump_dirty.svg`
- ✅ `public/sprites/trump_sad.svg`
- ✅ `public/sprites/room_kitchen.svg`
- ✅ `public/sprites/room_bathroom.svg`
- ✅ `public/sprites/room_bedroom.svg`
- ✅ `public/sprites/room_fun.svg`
- ✅ `public/sprites/room_trading.svg`
- ✅ `public/sprites/room_shop.svg`

## 🔧 Remaining Manual Steps

### 1. Copy Binary Assets (PNG Images)

The following binary files need to be copied manually from `ebatelbase/public/` to `public/`:

```bash
# Clone the branch locally
git clone -b restructure-mytrump https://github.com/oriuma/baseapp_mrt.git
cd baseapp_mrt

# Copy PNG/binary assets (if they still exist in ebatelbase/)
cp ebatelbase/public/hero.png public/ 2>/dev/null || true
cp ebatelbase/public/icon.png public/ 2>/dev/null || true
cp ebatelbase/public/logo.png public/ 2>/dev/null || true
cp ebatelbase/public/splash.png public/ 2>/dev/null || true
cp ebatelbase/public/screenshot.png public/ 2>/dev/null || true
cp ebatelbase/public/screenshot-portrait.png public/ 2>/dev/null || true
cp ebatelbase/public/blue-hero.png public/ 2>/dev/null || true
cp ebatelbase/public/blue-icon.png public/ 2>/dev/null || true

# Copy other SVG icons
cp ebatelbase/public/*.svg public/ 2>/dev/null || true
```

### 2. Verify app/favicon.ico

Make sure `app/favicon.ico` exists (Next.js 15 standard location).

### 3. Remove Old Structure

```bash
# Remove old ebatelbase directory
rm -rf ebatelbase/

# Remove old trigger file
rm -f DEPLOY_TRIGGER.txt

# Commit the cleanup
git add .
git commit -m "Remove old ebatelbase structure and cleanup"
git push origin restructure-mytrump
```

### 4. Merge to Main

```bash
# Create Pull Request or merge directly
git checkout main
git merge restructure-mytrump
git push origin main
```

## ⚙️ Vercel Deployment Configuration

Update your Vercel project settings:

### Build Settings
- **Root Directory:** `/` (not `ebatelbase`)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)
- **Node Version:** 20.x or higher

### Environment Variables
No environment variables are required for basic functionality.

## 📁 New Project Structure

```
baseapp_mrt/
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   ├── globals.css          # Global styles
│   ├── MiniAppReady.tsx     # MiniKit client component
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts     # Farcaster manifest
│   └── api/
│       └── webhook/
│           └── route.ts     # Webhook handler
├── components/              # React components
│   ├── GameScreen.tsx
│   ├── HeaderBar.tsx
│   ├── StatusBar.tsx
│   ├── RoomIndicator.tsx
│   ├── TrumpSprite.tsx
│   ├── PixelButton.tsx
│   ├── PixelCard.tsx
│   ├── Modal.tsx
│   ├── ActionsPanel.tsx
│   ├── TradingPanel.tsx
│   ├── ShopPanel.tsx
│   └── rooms/
│       ├── KitchenRoom.tsx
│       ├── BathroomRoom.tsx
│       ├── BedroomRoom.tsx
│       ├── FunRoom.tsx
│       ├── TradingRoom.tsx
│       └── ShopRoom.tsx
├── lib/                     # Business logic
│   ├── gameState.ts        # Zustand store
│   ├── constants.ts        # Game constants
│   ├── persistence.ts      # LocalStorage
│   ├── tradingLogic.ts     # Trading calculations
│   └── rooms.ts            # Room configuration
├── public/                  # Static assets
│   └── sprites/            # Game sprites
│       ├── trump_*.svg
│       └── room_*.svg
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── minikit.config.ts
├── .gitignore
└── README.md
```

## 🎉 Benefits of New Structure

1. **Base Mini App Compliant** - Follows [official Base Mini App standards](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
2. **Next.js 15 App Router** - Modern routing and layouts
3. **Cleaner Architecture** - Logical separation of concerns
4. **Better DX** - Standard paths, no nested confusion
5. **Easier Maintenance** - Clear component hierarchy
6. **Vercel-Ready** - Root-level configuration

## 📚 Documentation

- [Base Mini Apps Docs](https://docs.base.org/mini-apps)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand State Management](https://zustand.docs.pmnd.rs/)

## 🐛 Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all imports use `@/` aliases correctly
- Verify `tsconfig.json` paths configuration

### Missing Assets
- Ensure all PNG files are copied from `ebatelbase/public/` to `public/`
- Check that SVG sprites exist in `public/sprites/`

### Vercel Deployment Issues
- Verify Root Directory is set to `/` (not `ebatelbase`)
- Check that `package.json` build script is correct
- Ensure Node.js version is 20.x or higher
