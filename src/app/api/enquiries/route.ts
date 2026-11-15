import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/admin-store";

export const runtime = "nodejs";

const text = (data: FormData, key: string, limit = 1500) => String(data.get(key) ?? "").trim().slice(0, limit);

export async function POST(request: NextRequest) {
  const form = await request.formData();
  if (text(form, "cx_hp", 200)) return NextResponse.json({ ok: true });
  const name = text(form, "name", 120);
  const phone = text(form, "phone", 30).replace(/\D/g, "");
  if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone)) return NextResponse.json({ error: "Please provide a name and valid phone number." }, { status: 400 });
  const lead = await saveLead({
    name,
    phone,
    email: text(form, "email", 180),
    role: text(form, "role", 100),
    business: text(form, "business", 180),
    city: text(form, "city", 120),
    what: text(form, "what", 500),
    team: text(form, "team", 40),
    stage: text(form, "stage", 40),
    service: form.getAll("service").map((value) => String(value).slice(0, 100)).slice(0, 20),
    message: text(form, "message", 1500),
    reach: text(form, "reach", 40),
  });
  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
