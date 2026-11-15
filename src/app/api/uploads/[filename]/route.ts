import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const types: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

export async function GET(_request: Request, { params }: { params: { filename: string } }) {
  const filename = params.filename;
  if (!/^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/.test(filename)) return NextResponse.json({ error: "Image not found." }, { status: 404 });
  const extension = filename.split(".").pop() as string;
  try {
    const file = await readFile(path.join(process.cwd(), "data", "uploads", filename));
    return new NextResponse(file, { headers: { "Content-Type": types[extension], "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
