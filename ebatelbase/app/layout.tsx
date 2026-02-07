import type { Metadata } from "next";
import "./globals.css";
import { minikitConfig } from "@/minikit.config";
import { MiniAppReady } from "./MiniAppReady";

export const metadata: Metadata = {
  title: minikitConfig.miniapp.name,
  description: minikitConfig.miniapp.description,
  openGraph: {
    title: minikitConfig.miniapp.ogTitle,
    description: minikitConfig.miniapp.ogDescription,
    images: [minikitConfig.miniapp.ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-screen bg-amber-50 text-zinc-900 antialiased">
        <MiniAppReady>{children}</MiniAppReady>
      </body>
    </html>
  );
}
