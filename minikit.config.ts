/**
 * Base Mini App / Farcaster manifest configuration for "My Trump".
 * @see https://docs.base.org/mini-apps/quickstart/create-new-miniapp
 */

const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (typeof process.env.VERCEL_PROJECT_PRODUCTION_URL === "string"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * TODO: Fill accountAssociation via Base Build Account Association tool.
 * Steps (from https://docs.base.org/mini-apps/quickstart/create-new-miniapp):
 * 1. Deploy this app to Vercel and turn off Deployment Protection for the project.
 * 2. Go to https://www.base.dev/preview?tab=account
 * 3. Paste your app URL (e.g. my-trump.vercel.app) in "App URL", click Submit.
 * 4. Click "Verify" and follow the flow to generate header, payload, signature.
 * 5. Copy the accountAssociation object and paste it below (replace the empty strings).
 * 6. Push to main so Vercel redeploys.
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "My Trump",
    subtitle: "Your trading mood pet",
    description:
      "A pixel tamagotchi that loves your liquidations. Feed, clean, sleep, and report trades — Mr. T is happier when you lose.",
    // TODO: Add public/screenshot-portrait.png for store listing
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    // TODO: Add public/mytrump-icon.png (e.g. 512x512); fallback to favicon for now
    iconUrl: `${ROOT_URL}/favicon.ico`,
    splashImageUrl: `${ROOT_URL}/favicon.ico`,
    splashBackgroundColor: "#fef3c7",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "trading", "tamagotchi", "meme", "miniapp"],
    heroImageUrl: `${ROOT_URL}/favicon.ico`,
    tagline: "A tamagotchi that loves your liquidations.",
    ogTitle: "My Trump — Your trading mood pet",
    ogDescription:
      "A pixel tamagotchi that loves your liquidations. Feed, clean, sleep, report trades.",
    ogImageUrl: `${ROOT_URL}/favicon.ico`,
  },
} as const;
