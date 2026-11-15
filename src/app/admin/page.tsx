"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquareText, Plus, Radio, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminFrame, AdminGate } from "@/components/admin/AdminLayout";

type Blog = { slug: string; title: string; category: string; published: boolean; updatedAt: string };
type Lead = { id: string; name: string; business: string; city: string; status: string; createdAt: string; service: string[] };

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([fetch("/api/admin/blogs", { cache: "no-store" }), fetch("/api/admin/leads", { cache: "no-store" })])
      .then(async ([blogResponse, leadResponse]) => {
        if (!blogResponse.ok || !leadResponse.ok) throw new Error("Could not load your workspace data.");
        setBlogs(await blogResponse.json()); setLeads(await leadResponse.json());
      }).catch((e) => setError(e.message));
  }, []);
  const recentLeads = leads.slice(0, 5);
  return <AdminGate><AdminFrame title="Your studio, at a glance" description="Keep your journal moving and stay close to the people reaching out." action={<Link className="admin-primary" href="/admin/blogs/new"><Plus size={16}/> Write a story</Link>}>
    {error && <div className="admin-error">{error}</div>}
    <div className="admin-stats">
      <div className="admin-card admin-stat"><div className="admin-stat-top">Journal stories <span className="admin-stat-icon"><BookOpen size={15}/></span></div><div className="admin-stat-value">{blogs.length}</div><div className="admin-stat-foot">Existing and new journal articles</div></div>
      <div className="admin-card admin-stat"><div className="admin-stat-top">Published <span className="admin-stat-icon"><Radio size={15}/></span></div><div className="admin-stat-value">{blogs.filter((blog) => blog.published).length}</div><div className="admin-stat-foot">Visible on the public journal</div></div>
      <div className="admin-card admin-stat"><div className="admin-stat-top">New enquiries <span className="admin-stat-icon"><MessageSquareText size={15}/></span></div><div className="admin-stat-value">{leads.filter((lead) => lead.status === "new").length}</div><div className="admin-stat-foot">{leads.length} total enquiries received</div></div>
    </div>
    <div className="admin-card admin-section-card" style={{marginBottom:16}}><div className="admin-section-head"><h2>Recent stories</h2><Link href="/admin/blogs/new">Open journal <ArrowRight size={13}/></Link></div>{blogs.length ? <table className="admin-table"><thead><tr><th>STORY</th><th>UPDATED</th><th>STATUS</th></tr></thead><tbody>{blogs.slice(0,6).map((blog) => <tr key={blog.slug}><td><Link className="admin-table-title" href={`/admin/blogs/${blog.slug}`}>{blog.title}</Link><div className="admin-meta">{blog.category}</div></td><td>{new Date(blog.updatedAt).toLocaleDateString()}</td><td><span className={`admin-status ${blog.published ? "published" : "draft"}`}>{blog.published ? "Published" : "Draft"}</span></td></tr>)}</tbody></table> : <div className="admin-empty"><b>Your first story starts here</b>Draft, preview, and publish a journal post from one place.<p><Link className="admin-primary" style={{marginTop:14}} href="/admin/blogs/new"><Plus size={14}/> Create a post</Link></p></div>}</div>
    <div className="admin-card admin-section-card"><div className="admin-section-head"><h2>Latest enquiries</h2><Link href="/admin/leads">View all <ArrowRight size={13}/></Link></div>{recentLeads.length ? <table className="admin-table"><thead><tr><th>CONTACT</th><th>LOCATION</th><th>RECEIVED</th><th>STATUS</th></tr></thead><tbody>{recentLeads.map((lead) => <tr key={lead.id}><td><b>{lead.name}</b><div className="admin-meta">{lead.business || lead.service.join(", ") || "New enquiry"}</div></td><td>{lead.city || "—"}</td><td>{new Date(lead.createdAt).toLocaleDateString()}</td><td><span className={`admin-status ${lead.status}`}>{lead.status}</span></td></tr>)}</tbody></table> : <div className="admin-empty"><b>No enquiries yet</b>New contact submissions will appear here.<p><Link className="admin-secondary" style={{marginTop:14}} href="/admin/leads"><Send size={14}/> Open enquiries</Link></p></div>}</div>
  </AdminFrame></AdminGate>;
}
