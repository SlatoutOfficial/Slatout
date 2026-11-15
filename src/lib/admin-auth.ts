import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const cookieName = "slatout_admin_session";
const maxAge = 60 * 60 * 24 * 7;

function signature(expires: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return createHmac("sha256", secret).update(expires).digest("hex");
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function createAdminSession() {
  const expires = String(Math.floor(Date.now() / 1000) + maxAge);
  return `${expires}.${signature(expires)}`;
}

export function isAdminRequest(request: NextRequest) {
  if (!adminConfigured()) return false;
  const value = request.cookies.get(cookieName)?.value ?? "";
  const [expires, submitted] = value.split(".");
  if (!expires || !submitted || Number(expires) < Math.floor(Date.now() / 1000)) return false;
  try {
    const expected = signature(expires);
    const a = Buffer.from(submitted);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge };
}

export { cookieName };
