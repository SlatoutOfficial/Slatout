"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PrimaryCta, TextCta } from "./CtaSystem";

/** Simple global CTA — above footer on every page except /contact */
export default function GlobalCTA() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section id="contact" className="bg-[#111111] text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          <div className="max-w-[640px]">
            <span className="type-label text-[11px] text-white/50 mb-5 block">
              Start building
            </span>
            <h2 className="type-section text-[clamp(1.85rem,4.5vw,3.25rem)] text-white mb-4">
              Let&apos;s Build the Next Growth Engine for Your Business.
            </h2>
            <p className="type-body text-[15px] sm:text-[16px] text-gray-400 max-w-[480px]">
              Book a strategy call — we&apos;ll map incorporation, platforms, and growth into one clear path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 shrink-0">
            <PrimaryCta href="/contact">Book a strategy call</PrimaryCta>
            <TextCta href="mailto:hello@slatout.com" tone="light">
              hello@slatout.com
            </TextCta>
          </div>
        </div>
      </div>
    </section>
  );
}
