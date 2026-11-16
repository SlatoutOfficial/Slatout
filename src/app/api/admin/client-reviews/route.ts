import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { REVIEW_SERVICE_OPTIONS, type ReviewServiceKey } from "@/data/client-reviews";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAdminClientReviews, removeClientReview, saveClientReview, type AdminClientReview } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validServices = new Set<string>(REVIEW_SERVICE_OPTIONS.map((service) => service.key));
const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

function parseReview(body: Record<string, unknown>, id: string, createdAt = new Date().toISOString()): AdminClientReview | string {
  const name = text(body.name, 120);
  const role = text(body.role, 120);
  const business = text(body.business, 180);
  const industry = text(body.industry, 120);
  const quote = text(body.quote, 1200);
  const cameWith = text(body.cameWith, 500);
  const leftWith = text(body.leftWith, 500);
  const services = Array.isArray(body.services) ? body.services.filter((service): service is ReviewServiceKey => typeof service === "string" && validServices.has(service)) : [];
  const rating = Number(body.rating);
  const permissionConfirmed = body.permissionConfirmed === true;
  const published = body.published === true;

  if (!name || !role || !business || !industry || !quote || !cameWith || !leftWith) return "Complete the client, quote, and outcome fields.";
  if (!services.length) return "Choose at least one service.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return "Choose a rating from 1 to 5.";
  if (published && !permissionConfirmed) return "Confirm the client approved publication before publishing this review.";

  return {
    id,
    name,
    role,
    business,
    industry,
    services,
    rating,
    quote,
    highlight: text(body.highlight, 160),
    cameWith,
    leftWith,
    permissionConfirmed,
    published,
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getAdminClientReviews(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Review details are required." }, { status: 400 });
  const review = parseReview(body as Record<string, unknown>, randomUUID());
  if (typeof review === "string") return NextResponse.json({ error: review }, { status: 400 });
  return NextResponse.json(await saveClientReview(review), { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string") return NextResponse.json({ error: "A review id is required." }, { status: 400 });
  const existing = (await getAdminClientReviews()).find((review) => review.id === body.id);
  if (!existing) return NextResponse.json({ error: "Review not found." }, { status: 404 });
  const review = parseReview(body as Record<string, unknown>, existing.id, existing.createdAt);
  if (typeof review === "string") return NextResponse.json({ error: review }, { status: 400 });
  return NextResponse.json(await saveClientReview(review));
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "A review id is required." }, { status: 400 });
  const existing = (await getAdminClientReviews()).some((review) => review.id === id);
  if (!existing) return NextResponse.json({ error: "Review not found." }, { status: 404 });
  await removeClientReview(id);
  return NextResponse.json({ ok: true });
}
