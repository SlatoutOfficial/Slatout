import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublishedBlogs(), { headers: { "Cache-Control": "no-store" } });
}
