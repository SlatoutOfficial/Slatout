"use client";

import React from "react";

const clientLogos = [
  // Aether (Stylized wave + wordmark)
  {
    name: "Aether",
    svg: (
      <svg className="h-6 w-auto fill-current text-gray-500 hover:text-[#F26522] transition-colors duration-300" viewBox="0 0 120 28">
        <path d="M12 4L4 18h16L12 4zm0 4.5l5.2 9H6.8L12 8.5z" />
        <text x="32" y="19" className="font-bold text-[14px] tracking-wider font-sans">AETHER</text>
      </svg>
    )
  },
  // Apex (Upward chevron + wordmark)
  {
    name: "Apex",
    svg: (
      <svg className="h-6 w-auto fill-current text-gray-500 hover:text-[#F26522] transition-colors duration-300" viewBox="0 0 100 28">
        <path d="M6 20h4l4-12 4 12h4L14 4 6 20z" />
        <text x="28" y="19" className="font-bold text-[14px] tracking-wider font-sans">APEX</text>
      </svg>
    )
  },
  // Vercel (Triangle + wordmark)
  {
    name: "Vercel",
    svg: (
      <svg className="h-5 w-auto fill-current text-gray-500 hover:text-black transition-colors duration-300" viewBox="0 0 115 26">
        <path d="M12 2L24 22H0L12 2z" />
        <text x="32" y="18" className="font-bold text-[15px] tracking-tight font-sans">VERCEL</text>
      </svg>
    )
  },
  // Clerk (Padlock + wordmark)
  {
    name: "Clerk",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-gray-500 hover:text-orange-600 transition-colors duration-300" viewBox="0 0 110 26">
        <path d="M8 10V6a4 4 0 018 0v4h2v10H6V10h2zm2 0h4V6a2 2 0 00-4 0v4z" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">CLERK</text>
      </svg>
    )
  },
  // Stripe (Minimalist S + wordmark)
  {
    name: "Stripe",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-gray-500 hover:text-indigo-600 transition-colors duration-300" viewBox="0 0 110 26">
        <path d="M12 4c-3 0-5 1.5-5 4s2 3 5 4 5 1.5 5 4-2 4-5 4-5-1.5-5-4h3c0 2 1.5 2 2 2s2-1 2-2-1.5-2-4.5-3-5.5-1.5-5.5-4 2-4 5-4c2.5 0 4.5 1 5 3h-3c0-1.5-1-1.5-2-1.5z" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">STRIPE</text>
      </svg>
    )
  },
  // Linear (Spiral orbit + wordmark)
  {
    name: "Linear",
    svg: (
      <svg className="h-5.5 w-auto fill-current text-gray-500 hover:text-purple-600 transition-colors duration-300" viewBox="0 0 110 26">
        <circle cx="10" cy="12" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="10" cy="12" r="3" />
        <text x="26" y="18" className="font-bold text-[15px] tracking-tight font-sans">LINEAR</text>
      </svg>
    )
  }
];

import { WordRevealHeading, FadeUp, ScaleIn, CountUp } from "./Motion";

const metrics = [
  { value: "1,800+", label: "Businesses Setup & Registered" },
  { value: "99.98%", label: "Accuracy & Tax Compliance" },
  { value: "100%", label: "Filing Deadline Success" }
];

const badges = [
  { text: "Clutch 4.9 ★★★★★", status: "Top Agency" },
  { text: "W3 Awards 2026", status: "Winner" },
  { text: "Vercel Enterprise", status: "Partner" }
];
export default function Trust() {
  return (
    <section className="relative bg-white py-10 sm:py-14 overflow-hidden">
      
      {/* Self-contained CSS styles for the infinite horizontal marquee */}
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

      {/* Decorative Soft Top Border Divider */}
      <div className="absolute top-0 left-5 sm:left-12 right-5 sm:right-12 h-[1px] bg-gray-300/60" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] items-start gap-10 lg:gap-12">
          
          {/* Left Column: Heading and Metrics (Asymmetric layout) */}
          <div className="flex flex-col items-start pr-0 lg:pr-8">
            <ScaleIn>
              <span className="text-[11px] sm:text-[12px] text-[#F26522] tracking-widest uppercase font-bold mb-2.5 block">
                Global Trust
              </span>
            </ScaleIn>
            <WordRevealHeading
              text="Powering fast-scaling startups and modern enterprises."
              className="text-[clamp(1.6rem,4.5vw,2.4rem)] type-section text-gray-900 max-w-[480px]"
            />

            {/* Metrics horizontal grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {metrics.map((m, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-start border-l-2 border-gray-300 pl-4 py-1 hover:border-[#F26522] transition-colors duration-300"
                >
                  <span className="text-3xl sm:text-[34px] type-card-title text-gray-900 leading-none">
                    {m.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-gray-500 font-medium tracking-wide mt-1.5 uppercase">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sliding Marquee of Logos & Industry Badges */}
          <div className="flex flex-col gap-10 lg:pl-6 w-full overflow-hidden">
            
            {/* Trust Statement */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] sm:text-[12px] text-gray-400 font-bold uppercase tracking-widest">
                  Trusted by Innovators
                </span>
                <p className="text-[15px] sm:text-[16px] text-gray-600 max-w-[620px] leading-relaxed">
                  From company incorporation and legal structuring to accounting, custom software engineering, and customer acquisition campaigns—we manage your business backbone.
                </p>
              </div>
            </FadeUp>

            {/* Logo Marquee Wrapper */}
            <div className="relative w-full overflow-hidden bg-white/40 border border-gray-200/40 rounded-2xl py-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] backdrop-blur-sm">
              {/* Fade masks */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#EFEFEF] via-[#EFEFEF]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#EFEFEF] via-[#EFEFEF]/40 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max overflow-hidden">
                {/* Dual marquee rows for loop continuity */}
                <div className="flex items-center gap-16 px-8 animate-marquee-slide">
                  {clientLogos.map((logo, idx) => (
                    <div key={idx} className="flex items-center justify-center shrink-0">
                      {logo.svg}
                    </div>
                  ))}
                  {/* Repeated items */}
                  {clientLogos.map((logo, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center justify-center shrink-0">
                      {logo.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industry Badges row */}
            <div className="flex flex-wrap items-center gap-3">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/60 border border-gray-300/40 rounded-full pl-3.5 pr-4 py-2 hover:border-gray-400/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
                  <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase">
                    {badge.text}
                  </span>
                  <span className="text-[9px] bg-gray-900 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">
                    {badge.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
      
    </section>
  );
}
