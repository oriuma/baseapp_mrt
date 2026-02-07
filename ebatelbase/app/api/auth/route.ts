import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    ok: false,
    message: "Farcaster quick-auth is disabled in this build.",
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    ok: false,
    message: "Farcaster quick-auth is disabled in this build.",
  });
}

export const dynamic = "force-dynamic";
