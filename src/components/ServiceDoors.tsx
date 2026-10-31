"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface DoorData {
  num: string;
  shortName: string;
  title: string;
  desc: string;
  href: string;
  slug: string;
  bg: string;
  glow: string;
  ink: string;
  svg: string;
}

export const DOORS_DATA: DoorData[] = [
  {
    num: "01",
    shortName: "Business Setup",
    title: "Business Setup & Legal",
    desc: "Helping entrepreneurs legally establish and protect their businesses with statutory registrations, bylaws and agreements.",
    href: "/services/business-setup-legal",
    slug: "business-setup-legal",
    bg: "#E3EEDC",
    glow: "#A9CFA2",
    ink: "#2E5B34",
    svg: `<rect x="46" y="26" width="108" height="148" rx="8"/><path d="M66 62h68M66 84h68M66 106h42"/><circle class="a" cx="128" cy="142" r="22"/><path class="a" d="M118 142l7 8 14-17"/>`
  },
  {
    num: "02",
    shortName: "Technology & AI",
    title: "Technology Solutions",
    desc: "Building high-performance digital infrastructure, modern web platforms, automation and custom AI workflows.",
    href: "/services/technology-solutions",
    slug: "technology-solutions",
    bg: "#E2E6FF",
    glow: "#A3AEF4",
    ink: "#3140A3",
    svg: `<rect class="a" x="76" y="76" width="48" height="48" rx="9"/><circle cx="46" cy="56" r="9"/><circle cx="156" cy="48" r="9"/><circle cx="40" cy="146" r="9"/><circle cx="160" cy="154" r="9"/><path d="M54 62l24 18M148 54l-26 24M47 141l31-16M153 149l-31-22M100 76V50M100 124v28"/>`
  },
  {
    num: "03",
    shortName: "Business Strategy",
    title: "Business Consulting & Strategy",
    desc: "Helping founders make better commercial decisions with rigorous market research, location intelligence and growth roadmaps.",
    href: "/services/business-consulting-strategy",
    slug: "business-consulting-strategy",
    bg: "#F4EAD8",
    glow: "#DCC08C",
    ink: "#6E5320",
    svg: `<path d="M26 66h148M26 134h148M66 26v148M134 26v148"/><path class="a" d="M100 52c-15 0-26 11-26 26 0 20 26 46 26 46s26-26 26-46c0-15-11-26-26-26z"/><circle class="a" cx="100" cy="78" r="9"/><circle cx="100" cy="150" r="30"/>`
  },
  {
    num: "04",
    shortName: "Branding & Creative",
    title: "Branding & Creative",
    desc: "Building memorable brands through distinctive visual systems, strategic positioning, guidelines and sales collateral.",
    href: "/services/branding-creative",
    slug: "branding-creative",
    bg: "#FBE1E6",
    glow: "#EFA2B3",
    ink: "#A1324C",
    svg: `<circle cx="76" cy="84" r="40"/><circle class="a" cx="124" cy="84" r="40"/><circle cx="100" cy="126" r="40"/>`
  },
  {
    num: "05",
    shortName: "Marketing & Growth",
    title: "Marketing & Growth",
    desc: "Helping businesses acquire customers and scale revenue across search visibility, performance media, social and analytics.",
    href: "/services/marketing-growth",
    slug: "marketing-growth",
    bg: "#D8F2EA",
    glow: "#86D6C1",
    ink: "#126B5A",
    svg: `<path d="M24 36h152l-56 62v52l-40 22V98z"/><circle class="a" cx="100" cy="176" r="8"/><circle cx="52" cy="20" r="3"/><circle cx="100" cy="16" r="3"/><circle cx="148" cy="20" r="3"/>`
  },
  {
    num: "06",
    shortName: "E-Commerce",
    title: "E-Commerce Solutions",
    desc: "Helping brands launch and scale across digital storefronts, Amazon, Flipkart, quick commerce and marketplace advertising.",
    href: "/services/ecommerce-solutions",
    slug: "ecommerce-solutions",
    bg: "#EDE3FB",
    glow: "#BCA4EE",
    ink: "#5C3C9F",
    svg: `<path d="M46 72h108l10 102H36z"/><path d="M74 72V56a26 26 0 0152 0v16"/><path class="a" d="M76 124l16 16 32-34"/>`
  },
  {
    num: "07",
    shortName: "Legal & Regulatory",
    title: "Legal & Regulatory Compliance",
    desc: "Helping businesses stay legally compliant, audit-ready, and protected through statutory contracts, governance and IP.",
    href: "/services/legal-regulatory-compliance",
    slug: "legal-regulatory-compliance",
    bg: "#FFE6D1",
    glow: "#FFB683",
    ink: "#A2470F",
    svg: `<rect x="26" y="40" width="40" height="120" rx="6"/><rect x="80" y="62" width="40" height="98" rx="6"/><rect class="a" x="134" y="86" width="40" height="74" rx="6"/><path d="M30 24h132"/>`
  },
  {
    num: "08",
    shortName: "Finance & Tax",
    title: "Finance, Tax & Compliance",
    desc: "Managing the financial backbone of businesses through bookkeeping, GST/TDS filings, statutory audits and Virtual CFO leadership.",
    href: "/services/finance-tax-compliance",
    slug: "finance-tax-compliance",
    bg: "#DDEDEC",
    glow: "#93C5C3",
    ink: "#24555A",
    svg: `<rect x="34" y="124" width="26" height="46" rx="4"/><rect x="70" y="98" width="26" height="72" rx="4"/><rect x="106" y="72" width="26" height="98" rx="4"/><rect x="142" y="46" width="26" height="124" rx="4"/><path class="a" d="M30 100l40-26 38-24 62-26"/>`
  }
];

export default function ServiceDoors() {
  const [openIndex, setOpenIndex] = useState(1); // Default to Technology & AI (or any prominent room)
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through doors smoothly if user is not hovering
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setOpenIndex((prev) => (prev + 1) % DOORS_DATA.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none pt-12 sm:pt-16 pb-16 sm:pb-24">

      {/* ── Section Heading ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
        <div>
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[2px] bg-[#FF5500]" />
            <span className="text-[11px] font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em]">
              Our Services
            </span>
          </div>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-extrabold text-stone-900 tracking-tight leading-[1.08]">
            One company. <em className="italic font-serif text-[#FF5500] font-normal">Eight worlds.</em>
          </h2>
        </div>
        <p className="text-stone-500 text-[13.5px] sm:text-[15px] max-w-[480px] leading-relaxed">
          Every service a growing business needs, each in its own dedicated room. Hover a door below to step inside.
        </p>
      </div>

      {/* ── Desktop Horizontal Expanding Doors (8 Items with generous width) ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden md:flex gap-3 h-[440px] lg:h-[480px] w-full"
      >
        {DOORS_DATA.map((door, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={door.num}
              onMouseEnter={() => setOpenIndex(index)}
              onClick={() => setOpenIndex(index)}
              style={{
                flex: isOpen ? 5.8 : 1,
                minWidth: isOpen ? "460px" : "85px",
                backgroundColor: door.bg,
                color: door.ink,
                transition: "flex 0.65s cubic-bezier(0.22, 1, 0.36, 1), min-width 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s",
              }}
              className={`relative rounded-[28px] overflow-hidden cursor-pointer ${isOpen ? "shadow-[0_20px_48px_rgba(0,0,0,0.09)] ring-1 ring-black/5" : "hover:brightness-[0.98]"
                }`}
            >
              {/* Radial glow background effect when open */}
              <div
                className="absolute -right-[15%] -bottom-[25%] w-[85%] aspect-square rounded-full pointer-events-none transition-transform duration-700 ease-out"
                style={{
                  background: `radial-gradient(closest-side, ${door.glow}, transparent)`,
                  opacity: isOpen ? 0.95 : 0,
                  transform: isOpen ? "translate(-8%, -8%)" : "translate(0, 0)",
                }}
              />

              {/* ── CLOSED STATE VIEW ── */}
              {!isOpen && (
                <div className="absolute inset-0 flex flex-col items-center justify-between py-6 pointer-events-none z-10 transition-opacity duration-300">
                  {/* Number pill top */}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 text-[12px] font-mono font-bold shadow-xs">
                    {door.num}
                  </span>

                  {/* Vertical Title & indicator at bottom */}
                  <div className="flex flex-col items-center gap-3 mb-2">
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                      className="text-[13.5px] lg:text-[14.5px] font-bold tracking-tight whitespace-nowrap"
                    >
                      {door.shortName}
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full opacity-40" style={{ backgroundColor: door.ink }} />
                  </div>
                </div>
              )}

              {/* ── OPEN EXPANDED STATE VIEW ── */}
              {isOpen && (
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between z-20 text-left animate-fadeIn">
                  {/* Room pill header */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/85 backdrop-blur-sm border border-white/60 text-[11px] font-mono font-extrabold tracking-wider"
                      style={{ color: door.ink }}
                    >
                      ROOM {door.num}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-wider opacity-60" style={{ color: door.ink }}>
                      {door.shortName}
                    </span>
                  </div>

                  {/* Main Content Area */}
                  <div className="max-w-[500px]">
                    {/* Clean SVG Icon in white rounded box */}
                    <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm p-3.5 mb-5 shadow-sm border border-white/70 flex items-center justify-center">
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full"
                        style={{
                          stroke: door.ink,
                          fill: "none",
                          strokeWidth: 2.2,
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                        dangerouslySetInnerHTML={{ __html: door.svg }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-[2.1rem] font-extrabold tracking-tight leading-[1.08] text-stone-900 mb-3">
                      {door.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13.5px] lg:text-[15px] leading-relaxed text-stone-600 mb-6 max-w-[460px]">
                      {door.desc}
                    </p>

                    {/* CTA link: Step inside */}
                    <Link
                      href={door.href}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white font-bold text-xs sm:text-[13px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-stone-200/70 hover:shadow-md transition-all duration-300 group/link w-fit"
                      style={{ color: door.ink }}
                    >
                      <span>Step inside room</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* ── Mobile Vertical Accordion Stack (shown on mobile < md) ── */}
      <div className="flex md:hidden flex-col gap-2.5">
        {DOORS_DATA.map((door, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={door.num}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              style={{
                backgroundColor: door.bg,
                color: door.ink,
              }}
              className="rounded-2xl overflow-hidden transition-all duration-300 border border-black/5"
            >
              {/* Header bar (always visible) */}
              <div className="flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold opacity-75">{door.num}</span>
                  <span className="font-bold text-sm text-stone-900">{door.shortName}</span>
                </div>
                <span className="text-xs font-mono font-bold opacity-60">
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 animate-fadeIn text-left">
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {door.desc}
                  </p>
                  <Link
                    href={door.href}
                    className="inline-flex items-center gap-1.5 font-bold text-xs"
                    style={{ color: door.ink }}
                  >
                    <span>Step inside room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom hint text ── */}
      <p className="mt-4 text-xs text-stone-500 font-medium text-left">
        Hover a door to open a room. Every room has its own colour, its own work and its own page.
      </p>

    </div>
  );
}
