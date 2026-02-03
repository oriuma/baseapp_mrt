/**
 * Farcaster / Base Mini App manifest.
 * Served at /.well-known/farcaster.json for discovery and account association.
 * @see https://docs.base.org/mini-apps/quickstart/create-new-miniapp
 */

import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  return Response.json(minikitConfig, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
