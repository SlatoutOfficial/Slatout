"use client";

import React, { useState } from "react";

const STAGES = [
  { value: "start", label: "Start" },
  { value: "build", label: "Build" },
  { value: "grow", label: "Grow" },
  { value: "run", label: "Run & Protect" },
  { value: "unsure", label: "Not sure" },
];

const SERVICES = [
  { value: "business-setup-registration", label: "Business Setup" },
  { value: "technology-ai-solutions", label: "Technology & AI" },
  { value: "offline-business-launch", label: "Offline Launch" },
  { value: "branding-marketing", label: "Branding" },
  { value: "content-strategy", label: "Content Strategy" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "ecommerce-marketplace-growth", label: "Marketplace Growth" },
  { value: "programmatic-advertising", label: "Programmatic Ads" },
  { value: "business-development-outsourcing", label: "BD Outsourcing" },
  { value: "finance-tax-compliance", label: "Finance & Tax" },
  { value: "not-sure", label: "Not sure yet" },
];

function CheckIcon() {
  return (
    <svg
      className="enq-check-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Enquiry() {
  const [stage, setStage] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const progress = (() => {
    let p = 0;
    if (stage) p += 20;
    if (services.length) p += 20;
    if (name.trim()) p += 20;
    if (email.trim() || phone.trim()) p += 20;
    if (message.trim()) p += 20;
    return p;
  })();

  function toggleService(value: string) {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  return (
    <section className="enq-section" id="enquire">
      <div className="enq-wrap enq-ct-grid">
        <div className="enq-left">
          <h2 className="enq-h2">
            Tell us where you are. We will show you the way.
          </h2>
          <p className="enq-lede">
            Tell us where your business is and what you need. We will reply with
            the right starting point and the next step, with no obligation.
          </p>
          <ul className="enq-steps">
            <li>
              <CheckIcon />
              <span>We read your enquiry and look at your stage and goals.</span>
            </li>
            <li>
              <CheckIcon />
              <span>We reply with the best starting point and any questions.</span>
            </li>
            <li>
              <CheckIcon />
              <span>
                If it fits, we agree the scope in writing before any work begins.
              </span>
            </li>
          </ul>
        </div>

        <div className="enq-form-card">
          {status === "sent" && (
            <div className="enq-sent" role="status" aria-live="polite">
              <div className="enq-sent-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3>Enquiry sent!</h3>
              <p>
                Thank you{name.split(" ")[0] ? `, ${name.split(" ")[0]}` : ""}. We will get back to you with the right starting point.
              </p>
            </div>
          )}
            <form id="enq" className="enq-form" onSubmit={handleSubmit} noValidate>
              <div className="enq-prog" aria-hidden="true">
                <span>
                  Your enquiry is <em>{progress}%</em> ready
                </span>
                <i>
                  <b style={{ width: `${progress}%` }} />
                </i>
              </div>

              <fieldset className="enq-fs">
                <legend>Where is your business today?</legend>
                <div className="chip-row">
                  {STAGES.map((s) => (
                    <label key={s.value} className={`chip-opt${stage === s.value ? " chip-on" : ""}`}>
                      <input
                        type="radio"
                        name="stage"
                        value={s.value}
                        checked={stage === s.value}
                        onChange={() => setStage(s.value)}
                      />
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="enq-fs">
                <legend>What are you interested in?</legend>
                <div className="chip-row">
                  {SERVICES.map((sv) => (
                    <label key={sv.value} className={`chip-opt${services.includes(sv.value) ? " chip-on" : ""}`}>
                      <input
                        type="checkbox"
                        name="services"
                        value={sv.value}
                        checked={services.includes(sv.value)}
                        onChange={() => toggleService(sv.value)}
                      />
                      <span>{sv.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="enq-row2">
                <div className="enq-fld">
                  <label htmlFor="enq-name">
                    Name <span className="enq-req">(required)</span>
                  </label>
                  <input
                    id="enq-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="enq-fld">
                  <label htmlFor="enq-email">Email</label>
                  <input
                    id="enq-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={160}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="enq-fld">
                <label htmlFor="enq-phone">
                  Phone <span className="enq-hint">(email or phone is required)</span>
                </label>
                <input
                  id="enq-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={24}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="enq-fld">
                <label htmlFor="enq-msg">Message</label>
                <textarea
                  id="enq-msg"
                  name="message"
                  rows={5}
                  maxLength={1500}
                  placeholder="A few lines about your business and what you want to achieve."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <p className="enq-consent">
                By sending this you agree to our{" "}
                <a href="/privacy-policy/">Privacy Policy</a>. We use your
                details only to respond to your enquiry.
              </p>

              <div className="enq-form-act">
                <button className="enq-btn-submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </div>

              {status === "error" && (
                <p className="enq-status enq-status-bad">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
        </div>
      </div>
    </section>
  );
}
