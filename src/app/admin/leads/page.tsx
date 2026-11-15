"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { AdminFrame, AdminGate } from "@/components/admin/AdminLayout";

type Lead = { id: string; createdAt: string; status: "new" | "contacted" | "qualified" | "closed"; name: string; phone: string; email: string; role: string; business: string; city: string; what: string; team: string; stage: string; service: string[]; message: string; reach: string };
const statusLabels: Record<Lead["status"], string> = { new: "New", contacted: "Contacted", qualified: "Qualified", closed: "Closed" };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");
  useEffect(() => { fetch("/api/admin/leads", { cache: "no-store" }).then(async (response) => { if (!response.ok) throw new Error("Could not load enquiries."); setLeads(await response.json()); }).catch((e) => setError(e.message)); }, []);
  const filtered = useMemo(() => leads.filter((lead) => (status === "all" || lead.status === status) && `${lead.name} ${lead.email} ${lead.phone} ${lead.business} ${lead.city} ${lead.message}`.toLowerCase().includes(search.toLowerCase())), [leads, search, status]);
  async function update(id: string, nextStatus: Lead["status"]) {
    const response = await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: nextStatus }) });
    if (!response.ok) { setError("Could not update this enquiry."); return; }
    const updated = await response.json(); setLeads((items) => items.map((lead) => lead.id === id ? updated : lead));
  }
  function exportCsv() {
    const columns = ["createdAt", "status", "name", "phone", "email", "role", "business", "city", "what", "team", "stage", "service", "message", "reach"] as const;
    const csv = [columns.join(","), ...filtered.map((lead) => columns.map((key) => `"${(Array.isArray(lead[key]) ? lead[key].join("; ") : String(lead[key] ?? "")).replace(/"/g, '""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"})); const a = document.createElement("a"); a.href = url; a.download = "slatout-enquiries.csv"; a.click(); URL.revokeObjectURL(url);
  }
  const newCount = leads.filter((lead) => lead.status === "new").length;
  return <AdminGate><AdminFrame title="Enquiries" description={`${leads.length} contact form submissions · ${newCount} waiting for a reply`} action={<button className="admin-secondary" onClick={exportCsv}><Download size={14}/> Export CSV</button>}>
    {error && <div className="admin-error" style={{marginBottom:14}}>{error}</div>}
    <div className="admin-card admin-section-card"><div className="admin-section-head"><h2>Contact submissions</h2><div className="admin-filter-row"><div style={{position:"relative"}}><Search size={14} style={{position:"absolute",left:10,top:11,color:"#999"}}/><input aria-label="Search enquiries" className="admin-search" style={{paddingLeft:31}} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, business"/></div><select aria-label="Filter by status" className="admin-lead-status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All statuses</option>{Object.entries(statusLabels).map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></div></div>
      {filtered.length ? <table className="admin-table"><thead><tr><th>PERSON / BUSINESS</th><th>CONTACT</th><th>NEEDS</th><th>MESSAGE</th><th>RECEIVED</th><th>STATUS</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id}><td><b>{lead.name}</b><div className="admin-meta">{[lead.business,lead.city].filter(Boolean).join(" · ") || lead.role || "Business details not provided"}</div><div className="admin-meta">{lead.stage && `Stage: ${lead.stage}`}{lead.team && ` · Team: ${lead.team}`}</div></td><td className="admin-lead-contact"><a href={`tel:${lead.phone}`}>{lead.phone}</a>{lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}</td><td className="admin-lead-detail">{lead.service.join(", ") || lead.what || "—"}</td><td className="admin-lead-detail">{lead.message || lead.what || "—"}</td><td>{new Date(lead.createdAt).toLocaleDateString()}<div className="admin-meta">{new Date(lead.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</div></td><td><select aria-label={`Update status for ${lead.name}`} className="admin-lead-status" value={lead.status} onChange={(e) => update(lead.id,e.target.value as Lead["status"])}>{Object.entries(statusLabels).map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></td></tr>)}</tbody></table> : <div className="admin-empty"><b>{leads.length ? "No matching enquiries" : "No enquiries yet"}</b>{leads.length ? "Try a different search or status filter." : "Contact form submissions will show up here."}</div>}
    </div>
  </AdminFrame></AdminGate>;
}
