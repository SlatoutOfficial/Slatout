"use client";

import React from "react";
import { WordRevealHeading, FadeUp, ScaleIn } from "./Motion";

const clientLogos = [
  // Aether (Stylized wave + wordmark)
  {
    name: "Aether",
    svg: (
      <svg className="h-6 w-auto fill-current text-zinc-400 hover:text-[#F97432] transition-colors duration-300" viewBox="0 0 120 28">
        <path d="M12 4L4 18h16L12 4zm0 4.5l5.2 9H6.8L12 8.5z" />
        <text x="32" y="19" className="font-bold text-[14px] tracking-wider font-sans">AETHER</text>
      </svg>
    )
  },
  // Apex (Upward chevron + wordmark)
  {
    name: "Apex",
    svg: (
      <svg className="h-6 w-auto fill-current text-zinc-400 hover:text-[#F97432] transition-colors duration-300" viewBox="0 0 100 28">
        <path d="M6 20h4l4-12 4 12h4L14 4 6 20z" />
        <text x="28" y="19" className="font-bold text-[14px] tracking-wider font-sans">APEX</text>
      </svg>
    )
  },
  // Vercel (Triangle + wordmark)
  {
    name: "Vercel",
    svg: (
      <svg className="h-5 w-auto fill-current text-zinc-400 hover:text-white transition-colors duration-300" viewBox="0 0 115 26">
        <path d="M12 2L24 22H0L12 2z" />
        <text x="32" y="18" className="font-bold text-[15px] tracking-tight font-sans">VERCEL</text>
      </svg>
    )
  },
  // Clerk (Padlock + wordmark)
  {
    name: "Clerk",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-zinc-400 hover:text-orange-600 transition-colors duration-300" viewBox="0 0 110 26">
        <path d="M8 10V6a4 4 0 018 0v4h2v10H6V10h2zm2 0h4V6a2 2 0 00-4 0v4z" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">CLERK</text>
      </svg>
    )
  },
  // Stripe (Minimalist S + wordmark)
  {
    name: "Stripe",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-zinc-400 hover:text-indigo-600 transition-colors duration-300" viewBox="0 0 110 26">
        <path d="M12 4c-3 0-5 1.5-5 4s2 3 5 4 5 1.5 5 4-2 4-5 4-5-1.5-5-4h3c0 2 1.5 2 2 2s2-1 2-2-1.5-2-4.5-3-5.5-1.5-5.5-4 2-4 5-4c2.5 0 4.5 1 5 3h-3c0-1.5-1-1.5-2-1.5z" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">STRIPE</text>
      </svg>
    )
  },
  // Linear (Spiral orbit + wordmark)
  {
    name: "Linear",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-zinc-400 hover:text-purple-600 transition-colors duration-300" viewBox="0 0 110 26">
        <circle cx="10" cy="12" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="10" cy="12" r="3" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">LINEAR</text>
      </svg>
    )
  }
];

const badges = [
  { text: "Clutch 4.9 ★★★★★", status: "Top Agency" },
  { text: "W3 Awards 2026", status: "Winner" },
  { text: "Vercel Enterprise", status: "Partner" }
];

export default function Trust() {
  return (
    <section className="relative bg-[#FAF8F5] py-14 sm:py-16 overflow-hidden border-b border-gray-200/40 select-none">
      
      {/* Infinite Horizontal Marquee Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slide {
          animation: marquee-slide 28s linear infinite;
        }
        .animate-marquee-slide:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Decorative Soft Divider */}
      <div className="absolute top-0 left-5 sm:left-12 right-5 sm:right-12 h-[1px] bg-gray-300/40" />

      {/* 1. Header block */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 sm:mb-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3.5">
          <ScaleIn>
            <span className="text-[11px] font-bold text-[#F97432] uppercase tracking-widest font-mono border border-gray-300/80 rounded-full px-3.5 py-1 text-gray-800 bg-white">
              Global Validation
            </span>
          </ScaleIn>
          <WordRevealHeading
            text="Powering fast-scaling startups and enterprises."
            className="text-[clamp(1.6rem,4vw,2.4rem)] type-section text-gray-900 font-bold leading-tight"
          />
          <FadeUp delay={0.1}>
            <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
              From corporate structuring and automated compliance auditing to high-performance systems engineering — Slatout manages your global growth operations.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* 2. Technical Cockpit Metrics Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Metric 1: Entities Set Up */}
          <FadeUp delay={0.15}>
            <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-[#F97432]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between h-[180px] relative overflow-hidden group">
              <div>
                <span className="text-3xl font-bold text-gray-900 tracking-tight block mb-1 leading-none">
                  1,800+
                </span>
                <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase block">
                  Entities Structured
                </span>
                <p className="text-[12px] text-gray-500 font-light leading-snug mt-1 max-w-[200px]">
                  Registered and managed across 12 tax jurisdictions.
                </p>
              </div>

              {/* Sparkline Vector Graphic */}
              <div className="w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-full h-8" viewBox="0 0 200 40">
                  <path d="M0 30 Q 30 28, 60 18 T 120 15 T 180 5 T 200 2" fill="none" stroke="#F97432" strokeWidth="2" strokeLinecap="round" />
                  <path d="M0 30 Q 30 28, 60 18 T 120 15 T 180 5 T 200 2 L 200 40 L 0 40 Z" fill="url(#sparkline-grad)" opacity="0.08" />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97432" />
                      <stop offset="100%" stopColor="#F97432" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </FadeUp>

          {/* Metric 2: Compliance Score */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-[#F97432]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between h-[180px] relative overflow-hidden group">
              <div>
                <span className="text-3xl font-bold text-gray-900 tracking-tight block mb-1 leading-none">
                  99.98%
                </span>
                <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase block">
                  Compliance Accuracy
                </span>
                <p className="text-[12px] text-gray-500 font-light leading-snug mt-1 max-w-[200px]">
                  Real-time tax auditing and automated filing.
                </p>
              </div>

              {/* Target / Radar Concentric Vector Graphic */}
              <div className="absolute right-3 bottom-3 w-16 h-16 opacity-15 pointer-events-none group-hover:scale-105 group-hover:opacity-20 transition-all duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#F97432" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="#F97432" strokeWidth="1.5" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#F97432" strokeWidth="0.8" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="#F97432" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </FadeUp>

          {/* Metric 3: Deadline Filing Success */}
          <FadeUp delay={0.25}>
            <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-[#F97432]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between h-[180px] relative overflow-hidden group">
              <div>
                <span className="text-3xl font-bold text-gray-900 tracking-tight block mb-1 leading-none flex items-center gap-1.5">
                  100%
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-0.5 shrink-0" />
                </span>
                <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase block">
                  On-Time Delivery
                </span>
                <p className="text-[12px] text-gray-500 font-light leading-snug mt-1 max-w-[200px]">
                  Guaranteed filings and system uptime schedules.
                </p>
              </div>

              {/* Progress Pipeline Vector Graphic */}
              <div className="w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-full h-6" viewBox="0 0 200 20">
                  <line x1="5" y1="10" x2="195" y2="10" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="10" x2="145" y2="10" stroke="#F97432" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="5" cy="10" r="3.5" fill="#F97432" />
                  <circle cx="75" cy="10" r="3.5" fill="#F97432" />
                  <circle cx="145" cy="10" r="3.5" fill="#F97432" />
                  <circle cx="195" cy="10" r="3.5" fill="#9CA3AF" />
                </svg>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>

      {/* 3. Tilted Floating Ticker Ribbon (Full Width Filmstrip) */}
      <div className="w-full relative my-10 z-10 overflow-visible">
        <div className="w-full bg-[#09080E] py-6 border-t border-b border-zinc-800/80 -rotate-1 sm:-rotate-[1.5deg] scale-[1.03] shadow-2xl shadow-black/10 flex items-center overflow-hidden">
          <div className="flex w-max overflow-hidden">
            
            {/* Duplicated Marquees for Infinite Sliding */}
            <div className="flex items-center gap-16 px-8 animate-marquee-slide">
              {clientLogos.map((logo, idx) => (
                <div key={idx} className="flex items-center justify-center shrink-0">
                  {logo.svg}
                </div>
              ))}
              {clientLogos.map((logo, idx) => (
                <div key={`dup-${idx}`} className="flex items-center justify-center shrink-0">
                  {logo.svg}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 4. Certification & Badges Row (Bottom) */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge, idx) => (
            <FadeUp key={idx} delay={0.3 + idx * 0.05}>
              <div
                className="flex items-center gap-2 bg-white/60 border border-gray-300/40 rounded-full pl-3.5 pr-4 py-2 hover:border-gray-400/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:scale-[1.02] transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97432] animate-pulse" />
                <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase">
                  {badge.text}
                </span>
                <span className="text-[9px] bg-gray-900 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">
                  {badge.status}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      
    </section>
  );
}
