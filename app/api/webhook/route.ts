/**
 * Placeholder webhook for Base Mini App manifest (webhookUrl).
 * Replace with real logic if your mini app needs to receive webhook events.
 * @see https://docs.base.org/mini-apps/quickstart/create-new-miniapp
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { message: "Webhook endpoint for My Trump Mini App" },
    { status: 200 }
  );
}
