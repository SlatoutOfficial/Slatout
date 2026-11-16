import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getLeads, updateLead, type Lead } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getLeads(), { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const statuses: Lead["status"][] = ["new", "contacted", "qualified", "closed"];
  if (typeof body.id !== "string" || !statuses.includes(body.status)) return NextResponse.json({ error: "Invalid lead update." }, { status: 400 });
  const lead = await updateLead(body.id, body.status);
  return lead ? NextResponse.json(lead) : NextResponse.json({ error: "Lead not found." }, { status: 404 });
}
