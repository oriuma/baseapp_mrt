import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? null,
  });
}
