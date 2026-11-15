import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const types: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !types[file.type]) return NextResponse.json({ error: "Choose a JPG, PNG, WebP, or GIF image." }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return NextResponse.json({ error: "Images must be 6 MB or smaller." }, { status: 413 });
  const filename = `${randomUUID()}.${types[file.type]}`;
  const directory = path.join(process.cwd(), "data", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/api/uploads/${filename}` });
}
