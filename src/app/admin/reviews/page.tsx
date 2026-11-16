"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { Eye, EyeOff, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { AdminFrame, AdminGate } from "@/components/admin/AdminLayout";
import { REVIEW_SERVICE_OPTIONS, type ClientReview, type ReviewServiceKey } from "@/data/client-reviews";

type ReviewDraft = Omit<ClientReview, "createdAt" | "updatedAt">;
const blankDraft = (): ReviewDraft => ({
  id: "", name: "", role: "", business: "", industry: "", services: [], rating: 5,
  quote: "", highlight: "", cameWith: "", leftWith: "", permissionConfirmed: false, published: false,
});

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [draft, setDraft] = useState<ReviewDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh() {
    const response = await fetch("/api/admin/client-reviews", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load client reviews.");
    setReviews(data);
  }

  useEffect(() => {
    refresh().catch((reason) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  function startEdit(review: ClientReview) {
    setNotice(""); setError("");
    setDraft({
      id: review.id, name: review.name, role: review.role, business: review.business, industry: review.industry,
      services: review.services, rating: review.rating, quote: review.quote, highlight: review.highlight,
      cameWith: review.cameWith, leftWith: review.leftWith, permissionConfirmed: review.permissionConfirmed,
      published: review.published,
    });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/client-reviews", {
        method: draft.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save this review.");
      await refresh();
      setDraft(null); setNotice(draft.id ? "Review updated." : "Review added.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not save this review.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(review: ClientReview) {
    if (!window.confirm(`Delete the review from ${review.name}?`)) return;
    setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/client-reviews?id=${encodeURIComponent(review.id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not delete this review.");
      setReviews((current) => current.filter((item) => item.id !== review.id));
      if (draft?.id === review.id) setDraft(null);
      setNotice("Review deleted.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not delete this review.");
    }
  }

  function toggleService(key: ReviewServiceKey) {
    setDraft((current) => current ? {
      ...current,
      services: current.services.includes(key) ? current.services.filter((service) => service !== key) : [...current.services, key],
    } : current);
  }

  return <AdminGate><AdminFrame
    title="Client reviews"
    description="Add and manage the stories shown in the Clients section on your homepage."
    action={<button className="admin-primary" type="button" onClick={() => { setError(""); setNotice(""); setDraft(blankDraft()); }}><Plus size={15}/> Add review</button>}
  >
    {error && <div className="admin-error" role="alert">{error}</div>}
    {notice && <div className="admin-notice admin-review-notice" role="status">{notice}</div>}

    {draft && <form className="admin-card admin-review-editor" onSubmit={save}>
      <div className="admin-section-head"><h2>{draft.id ? "Edit client review" : "Add a client review"}</h2><button className="admin-icon-button" type="button" aria-label="Close editor" onClick={() => setDraft(null)}><X size={16}/></button></div>
      <div className="admin-review-form">
        <div className="admin-form-fields">
          <div className="admin-field"><label>Client name<input required maxLength={120} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Client name"/></label></div>
          <div className="admin-field"><label>Role<input required maxLength={120} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} placeholder="Founder"/></label></div>
          <div className="admin-field"><label>Business<input required maxLength={180} value={draft.business} onChange={(event) => setDraft({ ...draft, business: event.target.value })} placeholder="Company or business name"/></label></div>
          <div className="admin-field"><label>Industry<input required maxLength={120} value={draft.industry} onChange={(event) => setDraft({ ...draft, industry: event.target.value })} placeholder="Industry"/></label></div>
        </div>

        <fieldset className="admin-review-service-field"><legend>Services used</legend><div className="admin-review-services">
          {REVIEW_SERVICE_OPTIONS.map((service) => <label key={service.key} style={{ "--review-tint": service.tint, "--review-deep": service.deep } as CSSProperties}>
            <input type="checkbox" checked={draft.services.includes(service.key)} onChange={() => toggleService(service.key)}/><span>{service.label}</span>
          </label>)}
        </div></fieldset>

        <div className="admin-form-fields">
          <div className="admin-field"><label>Rating<select value={draft.rating} onChange={(event) => setDraft({ ...draft, rating: Number(event.target.value) })}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} out of 5</option>)}</select></label></div>
          <div className="admin-field"><label>Emphasized phrase <span className="admin-meta">(optional)</span><input maxLength={160} value={draft.highlight} onChange={(event) => setDraft({ ...draft, highlight: event.target.value })} placeholder="A phrase from the quote"/></label></div>
        </div>
        <div className="admin-field"><label>Client quote<textarea required maxLength={1200} rows={4} value={draft.quote} onChange={(event) => setDraft({ ...draft, quote: event.target.value })} placeholder="Enter the client's approved testimonial."/></label></div>
        <div className="admin-form-fields">
          <div className="admin-field"><label>Came with<textarea required maxLength={500} rows={3} value={draft.cameWith} onChange={(event) => setDraft({ ...draft, cameWith: event.target.value })} placeholder="What challenge did they have?"/></label></div>
          <div className="admin-field"><label>Left with<textarea required maxLength={500} rows={3} value={draft.leftWith} onChange={(event) => setDraft({ ...draft, leftWith: event.target.value })} placeholder="What changed after working with Slatout?"/></label></div>
        </div>
        <label className="admin-review-check"><input type="checkbox" checked={draft.permissionConfirmed} onChange={(event) => setDraft({ ...draft, permissionConfirmed: event.target.checked, published: event.target.checked ? draft.published : false })}/><span>Client has approved this review for publication</span></label>
        <label className="admin-review-check"><input type="checkbox" checked={draft.published} disabled={!draft.permissionConfirmed} onChange={(event) => setDraft({ ...draft, published: event.target.checked })}/><span>Publish on the homepage</span></label>
        <div className="admin-editor-actions"><button className="admin-secondary" type="button" onClick={() => setDraft(null)}>Cancel</button><button className="admin-primary" type="submit" disabled={saving}><Save size={14}/>{saving ? "Saving…" : "Save review"}</button></div>
      </div>
    </form>}

    <div className="admin-card admin-section-card admin-review-list">
      <div className="admin-section-head"><h2>Homepage reviews <span className="admin-meta">{reviews.length} total</span></h2><span className="admin-meta">Published reviews appear in the Clients section</span></div>
      {loading ? <div className="admin-empty">Loading client reviews…</div> : reviews.length ? <table className="admin-table"><thead><tr><th>CLIENT</th><th>REVIEW</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>
        {reviews.map((review) => <tr key={review.id}>
          <td><b>{review.name}</b><div className="admin-meta">{review.role} · {review.business}</div></td>
          <td className="admin-review-quote">“{review.quote}”<div className="admin-meta">{review.rating} / 5 · {review.services.map((key) => REVIEW_SERVICE_OPTIONS.find((service) => service.key === key)?.label).filter(Boolean).join(", ")}</div></td>
          <td><span className={`admin-status ${review.published && review.permissionConfirmed ? "published" : "draft"}`}>{review.published && review.permissionConfirmed ? <><Eye size={11}/> Published</> : <><EyeOff size={11}/> Draft</>}</span></td>
          <td><div className="admin-review-actions"><button type="button" className="admin-secondary" onClick={() => startEdit(review)}><Pencil size={12}/> Edit</button><button type="button" className="admin-danger" onClick={() => remove(review)} aria-label={`Delete review from ${review.name}`}><Trash2 size={13}/></button></div></td>
        </tr>)}
      </tbody></table> : <div className="admin-empty"><b>No client reviews yet</b>Add an approved client story and publish it to the homepage.</div>}
    </div>
  </AdminFrame></AdminGate>;
}
