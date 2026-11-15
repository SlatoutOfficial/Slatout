"use client";

import Link from "next/link";
import { ArrowLeft, Bold, ImagePlus, Italic, Link2, List, ListOrdered, LoaderCircle, Quote, Save, Underline } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFrame, AdminGate } from "@/components/admin/AdminLayout";
import { sanitizeRichHtml } from "@/lib/rich-text";

type Draft = { title: string; slug: string; desc: string; category: string; date: string; readTime: string; image: string; authorName: string; authorRole: string; authorAvatar: string; tags: string; bodyHtml: string; published: boolean };
const blank: Draft = { title: "", slug: "", desc: "", category: "Insights", date: new Date().toLocaleDateString("en", { month: "long", year: "numeric" }), readTime: "5 min read", image: "", authorName: "Slatout Team", authorRole: "", authorAvatar: "/images/author-placeholder.svg", tags: "", bodyHtml: "", published: false };
const makeSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function BlogEditor({ slug }: { slug?: string }) {
  const [draft, setDraft] = useState(blank);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inlineRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const editing = Boolean(slug && slug !== "new");

  useEffect(() => {
    if (!editing) { setLoaded(true); return; }
    fetch("/api/admin/blogs", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("Could not load this post.");
      const items = await response.json();
      const post = items.find((item: any) => item.slug === slug);
      if (!post) throw new Error("This post is not in the admin workspace.");
      const bodyHtml = sanitizeRichHtml(post.bodyHtml || post.content.map((section: {heading:string;text:string}) => `<h2>${section.heading}</h2><p>${section.text}</p>`).join(""));
      setDraft({ title: post.title, slug: post.slug, desc: post.desc, category: post.category, date: post.date, readTime: post.readTime, image: post.image, authorName: post.author.name, authorRole: post.author.role, authorAvatar: post.author.avatar, tags: post.tags.join(", "), bodyHtml, published: post.published });
    }).catch((e) => setError(e.message)).finally(() => setLoaded(true));
  }, [editing, slug]);

  useEffect(() => {
    if (loaded && bodyRef.current && bodyRef.current.innerHTML !== draft.bodyHtml) bodyRef.current.innerHTML = draft.bodyHtml;
  }, [loaded, draft.bodyHtml]);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) { setDraft((current) => ({ ...current, [key]: value })); }
  function format(command: string, value?: string) { bodyRef.current?.focus(); document.execCommand(command, false, value); if (bodyRef.current) set("bodyHtml", bodyRef.current.innerHTML); }
  async function upload(file: File, inline: boolean) {
    setError(""); setUploading(true);
    try {
      const form = new FormData(); form.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Image upload failed.");
      if (inline) {
        bodyRef.current?.focus(); document.execCommand("insertHTML", false, `<p><img src="${data.url}" alt=""></p>`);
        if (bodyRef.current) set("bodyHtml", bodyRef.current.innerHTML);
      } else set("image", data.url);
    } catch (e: any) { setError(e.message); }
    finally { setUploading(false); }
  }
  async function onFile(event: ChangeEvent<HTMLInputElement>, inline: boolean) {
    const file = event.target.files?.[0]; if (file) await upload(file, inline); event.target.value = "";
  }
  async function save(publish = draft.published) {
    setSaving(true); setError(""); setNotice("");
    const bodyHtml = bodyRef.current?.innerHTML || draft.bodyHtml;
    const response = await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, slug: draft.slug || makeSlug(draft.title), published: publish, bodyHtml, tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean), author: { name: draft.authorName, role: draft.authorRole, avatar: draft.authorAvatar } }) });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) { setError(data.error || "Could not save this story."); return; }
    set("slug", data.slug); set("published", data.published); set("bodyHtml", data.bodyHtml || "");
    setNotice(data.published ? "Your story is live on the journal." : "Draft saved to your journal.");
    if (!editing) router.replace(`/admin/blogs/${data.slug}`);
  }

  if (!loaded) return <AdminGate><div className="admin-loading">Loading editor…</div></AdminGate>;
  return <AdminGate><AdminFrame title={editing ? "Edit your story" : "Write a new story"} description="Shape the story, add imagery, and preview the finished article as you work." action={<Link className="admin-secondary" href="/admin"><ArrowLeft size={15}/> Back to dashboard</Link>}>
    <div className="admin-editor-actions" style={{marginTop:-14,marginBottom:16}}><label className="admin-publish-toggle"><input type="checkbox" checked={draft.published} onChange={(e) => set("published", e.target.checked)}/> Publish this post</label><div className="admin-toolbar"><button className="admin-secondary" onClick={() => save(false)} disabled={saving}><Save size={14}/> Save draft</button><button className="admin-primary" onClick={() => save(true)} disabled={saving}>{saving ? <LoaderCircle size={14} className="animate-spin"/> : <Save size={14}/>} {draft.published ? "Save changes" : "Publish story"}</button></div></div>
    {error && <div className="admin-error" style={{marginBottom:12}}>{error}</div>}{notice && <div className="admin-notice" style={{marginBottom:12}}>{notice}</div>}
    <div className="admin-form-layout"><div className="admin-card admin-editor-card">
      <div className="admin-field"><label>Story title<input value={draft.title} onChange={(e) => { set("title", e.target.value); if (!editing || !draft.slug) set("slug", makeSlug(e.target.value)); }} placeholder="Give your story a clear title" maxLength={180}/></label></div>
      <div className="admin-form-fields"><div className="admin-field"><label>URL slug<input value={draft.slug} onChange={(e) => set("slug", makeSlug(e.target.value))} placeholder="your-story-url"/></label></div><div className="admin-field"><label>Category<input value={draft.category} onChange={(e) => set("category", e.target.value)} placeholder="Digital Growth"/></label></div></div>
      <div className="admin-form-fields"><div className="admin-field"><label>Published date<input value={draft.date} onChange={(e) => set("date", e.target.value)} placeholder="November 2026"/></label></div><div className="admin-field"><label>Reading time<input value={draft.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min read"/></label></div></div>
      <div className="admin-field"><label>Short introduction<textarea value={draft.desc} onChange={(e) => set("desc", e.target.value)} placeholder="A concise summary for the journal card and article header." maxLength={320}/></label><small>Shown on the journal card and below the article title.</small></div>
      <div className="admin-field"><label>Cover image</label><div className="admin-image-upload">{draft.image ? <img src={draft.image} alt="Cover preview"/> : <div className="admin-image-placeholder"/>}<div><label className="admin-file-button"><ImagePlus size={14}/>{uploading ? "Uploading…" : "Choose image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => onFile(e, false)} /></label><small>JPG, PNG, WebP or GIF · 6 MB max</small></div></div><input value={draft.image} onChange={(e) => set("image", e.target.value)} placeholder="Or paste an image URL" /></div>
      <div className="admin-form-fields"><div className="admin-field"><label>Author<input value={draft.authorName} onChange={(e) => set("authorName", e.target.value)} /></label></div><div className="admin-field"><label>Author role<input value={draft.authorRole} onChange={(e) => set("authorRole", e.target.value)} placeholder="Editorial team"/></label></div></div>
      <div className="admin-field"><label>Tags<input value={draft.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Strategy, Founders, Growth"/><small>Separate tags with commas.</small></label></div>
      <div className="admin-field"><label>Article content</label><div className="admin-rich-toolbar"><button title="Bold" onMouseDown={(e) => e.preventDefault()} onClick={() => format("bold")}><Bold size={15}/></button><button title="Italic" onMouseDown={(e) => e.preventDefault()} onClick={() => format("italic")}><Italic size={15}/></button><button title="Underline" onMouseDown={(e) => e.preventDefault()} onClick={() => format("underline")}><Underline size={15}/></button><button title="Heading 2" onMouseDown={(e) => e.preventDefault()} onClick={() => format("formatBlock", "h2")}>H2</button><button title="Heading 3" onMouseDown={(e) => e.preventDefault()} onClick={() => format("formatBlock", "h3")}>H3</button><button title="Bulleted list" onMouseDown={(e) => e.preventDefault()} onClick={() => format("insertUnorderedList")}><List size={15}/></button><button title="Numbered list" onMouseDown={(e) => e.preventDefault()} onClick={() => format("insertOrderedList")}><ListOrdered size={15}/></button><button title="Quote" onMouseDown={(e) => e.preventDefault()} onClick={() => format("formatBlock", "blockquote")}><Quote size={15}/></button><button title="Add link" onMouseDown={(e) => e.preventDefault()} onClick={() => { const href = window.prompt("Link URL"); if (href) format("createLink", href); }}><Link2 size={15}/></button><button title="Insert image" onMouseDown={(e) => e.preventDefault()} onClick={() => inlineRef.current?.click()}><ImagePlus size={15}/></button><input ref={inlineRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => onFile(e, true)}/></div><div ref={bodyRef} className="admin-rich-editor" contentEditable suppressContentEditableWarning data-placeholder="Write your story here. Select text to format it, add headings, lists, quotes, links, or images." onPaste={(event) => { const html = event.clipboardData.getData("text/html"); if (html) { event.preventDefault(); document.execCommand("insertHTML", false, sanitizeRichHtml(html)); if (bodyRef.current) set("bodyHtml", bodyRef.current.innerHTML); } }} onInput={(e) => set("bodyHtml", e.currentTarget.innerHTML)}/></div>
      <div className="admin-editor-actions"><span className="admin-meta">Your draft saves on this server.</span><button className="admin-primary" onClick={() => save()} disabled={saving}>{saving ? "Saving…" : "Save story"}</button></div>
    </div>
    <aside className="admin-card admin-preview"><div className="admin-preview-label">LIVE PREVIEW</div>{draft.image ? <img className="admin-preview-cover" src={draft.image} alt=""/> : <div className="admin-preview-cover"/>}<div className="admin-preview-body"><div className="admin-preview-category">{draft.category || "CATEGORY"}</div><h2>{draft.title || "Your story title will appear here"}</h2><p className="admin-preview-desc">{draft.desc || "A short introduction gives readers a reason to keep going."}</p><div className="admin-rich-content" dangerouslySetInnerHTML={{__html:sanitizeRichHtml(draft.bodyHtml || "<p>Your formatted article content will appear here as you write.</p>")}}/></div></aside></div>
  </AdminFrame></AdminGate>;
}
