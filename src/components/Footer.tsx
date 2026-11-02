"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── SLATOUT wordmark with pointer-lift + orange glow ─── */
function FooterWord() {
  const footerRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    // Walk up to the <footer> element
    const foot = word.closest("footer") as HTMLElement | null;
    if (!foot) return;
    footerRef.current = foot;

    const letters = Array.from(word.querySelectorAll("span")) as HTMLElement[];
    let px = -9999;
    let cur = letters.map(() => 0);
    let running = false;

    function clamp(v: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, v));
    }

    function tick() {
      let moving = false;
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const t = clamp(1 - Math.abs(px - c) / 260, 0, 1);
        cur[i] += (t - cur[i]) * 0.14;
        if (Math.abs(t - cur[i]) > 0.002) moving = true;
        l.style.transform = `translateY(${(-cur[i] * 26).toFixed(2)}px)`;
        l.style.setProperty("--lit", cur[i].toFixed(3));
      });
      if (moving) requestAnimationFrame(tick);
      else running = false;
    }

    function onMove(e: PointerEvent) {
      px = e.clientX;
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }

    function onLeave() {
      px = -9999;
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }

    foot.addEventListener("pointermove", onMove);
    foot.addEventListener("pointerleave", onLeave);

    return () => {
      foot.removeEventListener("pointermove", onMove);
      foot.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="ft-word" aria-hidden="true" ref={wordRef}>
      <span data-c="S">S</span>
      <span data-c="L">L</span>
      <span data-c="A">A</span>
      <span data-c="T">T</span>
      <span data-c="O">O</span>
      <span data-c="U">U</span>
      <span data-c="T">T</span>
    </div>
  );
}

/* ─── Main Footer ─── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="ft-inner">

        {/* CTA banner */}
        <div className="ft-cta">
          <div>
            <h2>Ready to build beyond business?</h2>
            <p>Tell us where your business is today. We will reply with the right starting point.</p>
          </div>
          <div className="ft-cta-b">
            <Link className="btn btn-p" href="/contact/#enquire">Book a free consultation</Link>
            <Link className="btn btn-ghost" href="/#plan">Get my plan</Link>
          </div>
        </div>

        {/* Links grid */}
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand">
            <Link className="brand" href="/" aria-label="SLATOUT home">
              <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <path d="M20 25.5 35 31 20 36.5 5 31Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"/>
                <path d="M5 20.5 20 26 35 20.5V23L20 28.5 5 23Z" fill="#C24E00"/>
                <path d="M20 15 35 20.5 20 26 5 20.5Z" fill="#FF6A00"/>
                <path d="M20 4 35 9.5 20 15 5 9.5Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"/>
              </svg>
              <span>SLATOUT</span>
            </Link>
            <p>Build beyond business. One partner for business setup, compliance, technology, branding, marketing and finance, for startups and growing businesses in India.</p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>
              <li><Link href="/services/business-setup-registration/">Business Setup &amp; Registration</Link></li>
              <li><Link href="/services/technology-ai-solutions/">Technology &amp; AI Solutions</Link></li>
              <li><Link href="/services/offline-business-launch/">Offline Business Launch &amp; Market Setup</Link></li>
              <li><Link href="/services/branding-marketing/">Branding &amp; Marketing</Link></li>
              <li><Link href="/services/content-strategy/">Content Strategy</Link></li>
              <li><Link href="/services/digital-marketing/">Digital Marketing &amp; Growth</Link></li>
              <li><Link href="/services/ecommerce-marketplace-growth/">E-Commerce &amp; Marketplace Growth</Link></li>
              <li><Link href="/services/programmatic-advertising/">Programmatic Advertising</Link></li>
              <li><Link href="/services/business-development-outsourcing/">Business Development Outsourcing</Link></li>
              <li><Link href="/services/finance-tax-compliance/">Finance, Tax &amp; Compliance</Link></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/services/">All services</Link></li>
              <li><Link href="/studio/">Free tools</Link></li>
              <li><Link href="/blogs/">Insights</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2>Contact</h2>
            <ul>
              <li><Link href="/contact/">Send an enquiry</Link></li>
            </ul>
          </div>
        </div>

        {/* Big SLATOUT wordmark with hover glow */}
        <FooterWord />

        {/* Legal bar */}
        <div className="ft-legal">
          <span>&copy; {year} SLATOUT. All rights reserved.</span>
          <span className="ft-l">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/terms/">Terms and Conditions</Link>
          </span>
        </div>

      </div>
    </footer>
  );
}
