"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, LayoutDashboard, LogOut, MessageSquareText, Plus, ShieldCheck, Star } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/blogs/new", label: "Blog editor", icon: BookOpen },
  { href: "/admin/reviews", label: "Client reviews", icon: Star },
  { href: "/admin/leads", label: "Enquiries", icon: MessageSquareText },
];

export function AdminGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      setConfigured(data.configured);
      setAuthenticated(data.authenticated);
    }).catch(() => setError("Could not reach the admin service.")).finally(() => setReady(true));
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault(); setError("");
    const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Sign in failed."); return; }
    setAuthenticated(true); setPassword(""); router.refresh();
  }

  if (!ready) return <div className="admin-loading">Opening your workspace…</div>;
  if (!configured) return <main className="admin-login"><div className="admin-login-card"><ShieldCheck size={25} /><p className="admin-eyebrow">ADMIN SETUP</p><h1>Secure the dashboard</h1><p>Add <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> to the server environment, then restart the app.</p><p className="admin-muted">Use the provided <code>.env.example</code> as a guide. The password is never stored in the browser.</p></div></main>;
  if (!authenticated) return <main className="admin-login"><form className="admin-login-card" onSubmit={login}><div className="admin-mark"><ShieldCheck size={22} /></div><p className="admin-eyebrow">SLATOUT / ADMIN</p><h1>Sign in to your studio</h1><p>Manage journal stories, client reviews, and incoming enquiries.</p><label>Password<input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <div className="admin-error">{error}</div>}<button className="admin-primary" type="submit">Continue <ArrowUpRight size={16} /></button><Link className="admin-back-link" href="/">Back to site</Link></form></main>;
  return <>{children}</>;
}

export function AdminFrame({ children, title, description, action }: { children: ReactNode; title: string; description?: string; action?: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  async function logout() { await fetch("/api/admin/session", { method: "DELETE" }); router.push("/admin"); router.refresh(); window.location.reload(); }
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand"><span className="admin-brand-icon">S</span><span>slatout<span className="admin-brand-sub">STUDIO ADMIN</span></span></Link>
      <div className="admin-nav-label">WORKSPACE</div>
      <nav>{nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`admin-nav-link ${pathname === href || (href !== "/admin" && pathname.startsWith(href)) ? "active" : ""}`}><Icon size={17} />{label}{label === "Blog editor" && <Plus size={14} className="admin-nav-plus" />}</Link>)}</nav>
      <div className="admin-sidebar-bottom"><div className="admin-secure"><span className="admin-secure-dot"/><div><b>Private workspace</b><small>Only you can access this area</small></div></div><button className="admin-logout" onClick={logout}><LogOut size={16}/> Sign out</button><Link className="admin-site-link" href="/">View website <ArrowUpRight size={14}/></Link></div>
    </aside>
    <main className="admin-main"><header className="admin-topbar"><span><span className="admin-live-dot"/> Content workspace</span><span>Slatout <b>/</b> Admin</span></header><section className="admin-content"><div className="admin-page-heading"><div><p className="admin-eyebrow">STUDIO / {pathname.includes("leads") ? "ENQUIRIES" : pathname.includes("reviews") ? "CLIENT REVIEWS" : pathname.includes("blogs") ? "JOURNAL" : "OVERVIEW"}</p><h1>{title}</h1>{description && <p className="admin-description">{description}</p>}</div>{action}</div>{children}</section></main>
  </div>;
}
