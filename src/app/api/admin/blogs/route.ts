import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAdminBlogs, removeBlog, saveBlog } from "@/lib/admin-store";
import { sanitizeRichHtml } from "@/lib/rich-text";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getAdminBlogs(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) return NextResponse.json({ error: "A title is required." }, { status: 400 });
  const slug = String(body.slug || body.title).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
  if (!slug) return NextResponse.json({ error: "Add a title that can be used for a URL." }, { status: 400 });
  const blog = await saveBlog({
    slug,
    title: body.title.trim().slice(0, 180),
    desc: String(body.desc || "").trim().slice(0, 320),
    category: String(body.category || "Insights").trim().slice(0, 80),
    date: String(body.date || new Date().toLocaleDateString("en", { month: "long", year: "numeric" })).slice(0, 40),
    readTime: String(body.readTime || "5 min read").slice(0, 30),
    image: String(body.image || ""),
    author: {
      name: String(body.author?.name || "Slatout Team").slice(0, 100),
      role: String(body.author?.role || "").slice(0, 100),
      avatar: String(body.author?.avatar || "/images/author-placeholder.svg").slice(0, 500),
    },
    content: [],
    tags: Array.isArray(body.tags) ? body.tags.slice(0, 12).map((tag: unknown) => String(tag).slice(0, 40)) : [],
    bodyHtml: sanitizeRichHtml(String(body.bodyHtml || "").slice(0, 80000)),
    published: Boolean(body.published),
  });
  return NextResponse.json(blog, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  if (!slug) return NextResponse.json({ error: "A slug is required." }, { status: 400 });
  await removeBlog(slug);
  return NextResponse.json({ ok: true });
}
