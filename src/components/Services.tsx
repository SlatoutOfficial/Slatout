"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SYSTEM_SERVICES } from "@/data/systemsData";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  "business-setup-registration": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>
    </svg>
  ),
  "technology-ai-solutions": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M9 10l2 2 4-4"/>
    </svg>
  ),
  "offline-business-launch": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  "branding-marketing": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/><path d="M4.1 8.235c4.01 1.95 8.18 2.41 12.33 1.43"/>
    </svg>
  ),
  "content-strategy": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  "digital-marketing": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  "ecommerce-marketplace-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  "programmatic-advertising": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
    </svg>
  ),
  "business-development-outsourcing": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  "finance-tax-compliance": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const VISIBLE = 4;
const GAP = 20;

/* ─── Simple Card ────────────────────────────────────────────────────────── */
function ServiceCard({ svc }: { svc: typeof SYSTEM_SERVICES[0] }) {
  const icon = ICONS[svc.slug] ?? DEFAULT_ICON;

  return (
    <div className="group flex flex-col bg-white border border-stone-200/80 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-stone-300">
      {/* Top colour strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF5500] to-[#ff8a50] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-1 items-center text-center px-6 pt-7 pb-7">
        {/* Icon circle */}
        <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-5 text-stone-400 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
          {icon}
        </div>

        {/* Name */}
        <h3 className="text-[15px] font-bold text-[#111] leading-snug mb-2.5">
          {svc.name}
        </h3>

        {/* Description */}
        <p className="text-[12.5px] text-stone-500 leading-relaxed mb-6 flex-1">
          {svc.oneLiner}
        </p>

        {/* MORE */}
        <Link
          href={`/services/${svc.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-stone-400 group-hover:text-[#FF5500] transition-colors duration-300"
        >
          MORE
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M2 6h8M6 2l4 4-4 4"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────────── */
export default function Services() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const pauseRef = useRef(false);

  const total    = SYSTEM_SERVICES.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const prev = useCallback(() => { pauseRef.current = true; setCurrent((c) => Math.max(0, c - 1)); }, []);
  const next = useCallback(() => { pauseRef.current = true; setCurrent((c) => Math.min(maxIndex, c + 1)); }, [maxIndex]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setDragStart(e.clientX);
    pauseRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const delta = dragStart - e.clientX;
    if (delta > 50) next();
    else if (delta < -50) prev();
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!pauseRef.current) setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
      pauseRef.current = false;
    }, 4000);
    return () => clearInterval(id);
  }, [maxIndex]);

  return (
    <section id="services" className="relative w-full bg-[#FAF8F5] overflow-hidden">

      {/* ── Hero image (shorter) ── */}
      <div className="relative w-full" style={{ height: "clamp(200px, 26vw, 360px)" }}>
        <Image
          src="/services-hero.jpg"
          alt="SLATOUT — professional team"
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/55" />

        <div className="absolute inset-x-0 top-0 pt-8 sm:pt-12 text-center px-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 mb-2">
            <span className="w-4 h-px bg-white/35" />Our Services<span className="w-4 h-px bg-white/35" />
          </span>
          <h2 className="text-[clamp(1.5rem,3.8vw,2.8rem)] font-extrabold text-white tracking-tight leading-tight drop-shadow">
            Everything Your Business Needs,{" "}
            <span style={{ color: "#FF5500" }}>Out of the Box.</span>
          </h2>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="relative -mt-16 sm:-mt-20 pb-14 sm:pb-20 px-4 sm:px-8 lg:px-14 select-none">

        <div
          className="overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setDragging(false)}
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          <div
            className="flex items-stretch"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(-${current} * ((100% + ${GAP}px) / ${VISIBLE})))`,
              transition: dragging ? "none" : "transform 0.52s cubic-bezier(.22,.68,0,1.05)",
            }}
          >
            {SYSTEM_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="flex-shrink-0"
                style={{ width: `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})` }}
              >
                <ServiceCard svc={svc} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="flex items-center justify-between mt-7 px-1">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { pauseRef.current = true; setCurrent(i); }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "99px",
                  background: i === current ? "#FF5500" : "#d1d5db",
                  transition: "all 0.35s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 transition-all duration-250 hover:bg-[#111] hover:text-white hover:border-[#111] disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                <path d="M13 4l-6 6 6 6"/>
              </svg>
            </button>
            <button
              onClick={next}
              disabled={current === maxIndex}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white transition-all duration-250 hover:bg-[#FF5500] disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                <path d="M7 4l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
