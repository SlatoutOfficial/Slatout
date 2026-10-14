"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { FadeUp } from "./Motion";

export default function CTA() {
  return (
    <section 
      id="contact"
      className="w-full py-16 sm:py-20 text-white relative overflow-hidden select-none bg-[#09080E] border-t border-zinc-900"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Subtext */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <FadeUp delay={0.05} className="flex flex-col items-start">
              
              {/* Status Pill */}
              <span className="inline-flex items-center gap-2 text-[11px] font-mono text-[#F97432] bg-[#F97432]/10 border border-[#F97432]/25 px-3.5 py-1 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97432] animate-pulse" />
                <span>Let&apos;s Build Together</span>
              </span>

              {/* Headline */}
              <h2 className="text-white text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.15] mb-4">
                We&apos;re making the hard stuff <span className="text-[#F97432]">easy.</span>
              </h2>

              {/* Subtext */}
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                We align design, engineering, and compliance into a singular velocity. Partner with us to scale your technical infrastructure, automate operations, and secure your digital future.
              </p>

            </FadeUp>
          </div>

          {/* Right Column: CTA Buttons */}
          <div className="lg:col-span-5 flex flex-col items-stretch lg:items-end justify-center w-full">
            <FadeUp delay={0.15} className="w-full flex flex-col sm:flex-row lg:flex-col gap-3.5 items-stretch lg:items-end max-w-md ml-auto">
              
              <Link
                href="/contact"
                className="w-full sm:w-auto lg:w-[220px] bg-[#F97432] hover:bg-[#e66324] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(249,116,50,0.25)] hover:shadow-[0_6px_28px_rgba(249,116,50,0.35)] flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Get started</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="#talk"
                className="w-full sm:w-auto lg:w-[220px] border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:border-zinc-700"
              >
                <MessageSquare size={15} className="text-zinc-400" />
                <span>Talk to an expert</span>
              </Link>

            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}


