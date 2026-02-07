# MyTrump 🎮

A **Tamagotchi-style trading companion** game built as a Base Mini App. Take care of Mr. T while managing your trading emotions!

## 🎯 Game Features

- **6 Interactive Rooms**: Kitchen, Bathroom, Bedroom, Fun, Trading, Shop
- **Character Care**: Feed, clean, sleep, and entertain Mr. T
- **Trading System**: Report your trades and watch how they affect Mr. T's mood
- **Cosmetics Shop**: Buy and equip items with TrumpCoins
- **Daily Bonuses**: Log in daily to earn rewards
- **Swipeable Interface**: Navigate between rooms with swipe gestures
- **Persistent State**: Your progress is saved locally

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oriuma/baseapp_mrt.git
cd baseapp_mrt

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
baseapp_mrt/
├── app/                 # Next.js 15 App Router
├── components/          # React components
│   └── rooms/          # Room-specific components
├── lib/                # Business logic & state
├── public/             # Static assets & sprites
├── package.json
├── tsconfig.json
└── next.config.ts
```

See [MIGRATION.md](./MIGRATION.md) for detailed structure information.

## 🎮 Game Mechanics

### Stats System

- **Mood**: Affected by trading results and entertainment
- **Hunger**: Decreases over time, restore by feeding
- **Energy**: Depletes with activity, restore by sleeping
- **Cleanliness**: Gets dirty over time, clean in bathroom
- **Respect**: Earned through good stats and trading

### Trading Logic

Mr. T has a unique personality:
- **Losses make him happy** 😊 (he loves when you lose money)
- **Profits make him grumpy** 😠 (he hates when you win)
- Track your trading PnL and see mood changes

### TrumpCoins Economy

- Earn coins by maintaining good stats
- Daily login bonuses
- Spend coins in the Shop for cosmetics

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Persistence**: LocalStorage
- **Blockchain**: Base (Coinbase Smart Wallet)
- **Deployment**: Vercel

## 🔗 Base Mini App Integration

This project follows [Base Mini App standards](https://docs.base.org/mini-apps):

- Farcaster Frame manifest at `/.well-known/farcaster.json`
- MiniKit SDK integration
- Coinbase Smart Wallet support
- Webhook handlers for on-chain events

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure settings:
   - Root Directory: `/` 
   - Build Command: `npm run build`
   - Node Version: 20.x
4. Deploy!

### Manual Deployment

```bash
npm run build
# Deploy the .next folder to your hosting
```

## 🎨 Customization

### Add New Room

1. Create room component in `components/rooms/`
2. Add room type to `lib/rooms.ts`
3. Update `ROOMS` array
4. Create background sprite in `public/sprites/`

### Modify Game Balance

Edit values in `lib/constants.ts`:
- Food item effects
- Stat decay rates
- Coin rewards
- Shop item prices

## 📄 License

MIT License - feel free to use this project as a template for your own Base Mini Apps!

## 🙏 Credits

- Built with [Base Mini Apps](https://base.org/mini-apps)
- Inspired by Tamagotchi
- Character sprite design: Simple SVG placeholders

## 🐛 Issues & Contributions

Found a bug? Want to contribute?

- Open an issue on GitHub
- Submit a pull request
- Share your feedback!

---

**Have fun taking care of Mr. T! 🎮**
