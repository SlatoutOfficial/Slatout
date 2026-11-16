import { NextResponse } from "next/server";
import { getPublishedClientReviews } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublishedClientReviews(), {
    headers: { "Cache-Control": "no-store" },
  });
}
