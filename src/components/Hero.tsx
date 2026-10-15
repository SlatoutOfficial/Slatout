"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FadeUp } from "./Motion";
import { PrimaryCta, SecondaryCta } from "./CtaSystem";
import { Rocket, TrendingUp, ShieldCheck, Sparkles, Box, Target, Cloud, Triangle, Hexagon } from "lucide-react";

// Dynamically import client 3D components to prevent SSR hydration mismatches
const ServiceCube = dynamic(() => import("./ServiceCube"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-[#09080E] text-white overflow-hidden">
      {/* Interactive Ambient Radial Glow matching original HTML */}
      <div
        className="glow absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(560px circle at var(--mx, 72%) var(--my, 45%), rgba(255, 110, 0, 0.22), transparent 70%)"
        }}
      />



      {/* Hero Content (z-20) */}
      <div className="relative z-20 flex-1 flex flex-col justify-start w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-8 sm:pt-30 lg:pt-32 xl:pt-34 lg:pb-12">

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] xl:grid-cols-[55%_45%] items-start gap-8 lg:gap-6 w-full">

          {/* Left Column: Typography and Action CTAs */}
          <div className="flex flex-col items-start justify-start">
            {/* Small Label */}
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-7 h-[2px] bg-[#FF5500]" />
                <span className="type-label text-[12px] sm:text-[13px] text-[#FF5500] tracking-[0.25em] uppercase font-bold font-mono">
                  SLATOUT AGENCY
                </span>
              </div>
            </FadeUp>

            {/* Headline h1 */}
            <FadeUp delay={0.2}>
              <h1 className="type-hero text-[clamp(1.8rem,5vw,2.5rem)] sm:text-[clamp(2.2rem,4vw,3.0rem)] lg:text-[clamp(2.5rem,3.5vw,3.5rem)] xl:text-[clamp(3.25rem,4vw,4.25rem)] leading-[1.08] text-white tracking-[-0.03em] font-medium">
                Slatout handles the systems.
                <br />
                You scale the business<span className="text-[#F97432]">.</span>
              </h1>
            </FadeUp>

            {/* Subheading */}
            <FadeUp delay={0.3}>
              <p className="text-zinc-400 text-[13px] sm:text-[15px] lg:text-[16px] xl:text-[18px] max-w-lg mt-4 lg:mt-5 xl:mt-6 leading-relaxed font-light">
                At Slatout, we build, scale, and secure the core systems that power modern businesses and drive sustainable growth.
              </p>
            </FadeUp>

            {/* CTA Row */}
            <FadeUp delay={0.4}>
              <div className="mt-6 lg:mt-8 xl:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <PrimaryCta href="#contact" className="!px-6 !py-3 !text-[15px]">
                  Book a strategy call
                </PrimaryCta>
                <SecondaryCta href="#services" className="!px-6 !py-3 !text-[15px]" dark>
                  Explore services
                </SecondaryCta>
              </div>
            </FadeUp>

            {/* Trusted By */}
            <FadeUp delay={0.5}>
              <div className="mt-10 lg:mt-12 xl:mt-16 w-full max-w-[500px]">
                <p className="text-[10px] font-extrabold tracking-[0.12em] text-zinc-400 uppercase mb-5">
                  Trusted by growing companies
                </p>
                <div
                  className="w-full overflow-hidden relative"
                  style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                >
                  <style>{`
                    @keyframes hero-marquee {
                      0% { transform: translateX(0%); }
                      100% { transform: translateX(-50%); }
                    }
                    .animate-hero-marquee {
                      animation: hero-marquee 20s linear infinite;
                    }
                  `}</style>

                  {/* Marquee Track */}
                  <div className="flex w-max animate-hero-marquee items-center opacity-95 transition-all duration-500 hover:[animation-play-state:paused]">

                    {/* Set 1 */}
                    <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                      <div className="flex items-center gap-1.5">
                        <Box size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">AcmeCorp</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Target size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">aven.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cloud size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">Cloudix</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Triangle size={16} className="text-zinc-400 stroke-[2.5] rotate-180" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">vertex</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hexagon size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">stackly</span>
                      </div>
                    </div>

                    {/* Set 2 (Duplicate for seamless loop) */}
                    <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                      <div className="flex items-center gap-1.5">
                        <Box size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">AcmeCorp</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Target size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">aven.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cloud size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">Cloudix</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Triangle size={16} className="text-zinc-400 stroke-[2.5] rotate-180" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">vertex</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hexagon size={16} className="text-zinc-400 stroke-[2.5]" />
                        <span className="text-zinc-400 font-extrabold text-[15px] tracking-tight">stackly</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Interactive 3D Octagonal Service Carousel */}
          <div className="flex items-center justify-center lg:justify-end w-full relative min-h-[460px] lg:min-h-[540px] mt-6 lg:mt-0 lg:-translate-y-16 xl:-translate-y-20">
            <ServiceCube />
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <FadeUp delay={0.6}>
          <div className="w-full mt-12 lg:mt-16 xl:mt-20 mb-6 lg:mb-8">
            <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-white/5 pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 divide-y md:divide-y-0 md:divide-x divide-zinc-800/60">

                {/* Feature 1 */}
                <div className="flex items-start gap-4 md:px-6 first:pl-0 pt-6 md:pt-0 first:pt-0">
                  <Rocket className="text-[#F97432] shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="text-white font-semibold text-[15px] mb-1.5">Launch Faster</h4>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">Ship products and features with confidence.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 md:px-6 pt-6 md:pt-0">
                  <TrendingUp className="text-[#F97432] shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="text-white font-semibold text-[15px] mb-1.5">Scale Efficiently</h4>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">Build systems that grow with your business.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4 md:px-6 pt-6 md:pt-0">
                  <ShieldCheck className="text-[#F97432] shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="text-white font-semibold text-[15px] mb-1.5">Secure Everything</h4>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">Protect your data, users, and infrastructure.</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-4 md:px-6 pr-0 pt-6 md:pt-0">
                  <Sparkles className="text-[#F97432] shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="text-white font-semibold text-[15px] mb-1.5">Drive Growth</h4>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">Data-driven strategies that deliver real results.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
