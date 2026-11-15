import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { adminConfigured, adminCookieOptions, createAdminSession, cookieName, isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return NextResponse.json({ configured: adminConfigured(), authenticated: isAdminRequest(request) });
}

export async function POST(request: NextRequest) {
  if (!adminConfigured()) return NextResponse.json({ error: "Admin login is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET to the environment." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  const supplied = typeof body.password === "string" ? body.password : "";
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  const valid = a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
  if (!valid) return NextResponse.json({ error: "That password did not match." }, { status: 401 });
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(cookieName, createAdminSession(), adminCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(cookieName, "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}
