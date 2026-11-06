"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SiteEnd from "../../components/SiteEnd";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#171714]">
      <section className="bg-[#171714] pt-32 pb-12 text-white sm:pt-40 sm:pb-16">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-12">
          <div className="py-4 sm:py-8">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              <span className="h-px w-8 bg-[#F26522]" />
              Contact / Slatout
            </p>
            <h1 className="max-w-[12ch] text-5xl font-semibold leading-[1.04] sm:text-6xl">
              Let&apos;s get into <span className="font-serif italic text-[#F26522]">the details.</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us what you&apos;re building, where you&apos;re stuck, or what you want to make possible. We&apos;ll work out the right next step together.
            </p>
            <a
              href="mailto:info@slatout.com"
              className="mt-8 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-sm font-medium text-white transition-colors hover:border-[#F26522] hover:text-[#F26522]"
            >
              info@slatout.com
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[360px] lg:min-h-[410px]">
            <Image
              src="/images/services_studio_swatches.jpg"
              alt="Studio materials and color samples arranged on a work table"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />
            <p className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:bottom-7 sm:left-7">
              Strategy / Design / Delivery
            </p>
          </div>
        </div>
      </section>
      <SiteEnd />
    </main>
  );
}
