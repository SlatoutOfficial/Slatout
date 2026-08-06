"use client";

import React from "react";
import dynamic from "next/dynamic";
// Dynamically import client components to prevent SSR hydration mismatches with WebGL/Canvas
const HeroShader = dynamic(() => import("./HeroShader"), { ssr: false });
const ServiceCube = dynamic(() => import("./ServiceCube"), { ssr: false });

import { FadeUp } from "./Motion";
import { PrimaryCta, SecondaryCta } from "./CtaSystem";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#EFEFEF] overflow-hidden">

      {/* 
        Video Background Layer (z-0, below the shader overlay).
        The video plays continuously and is dynamically refracted by the FlutedGlass 
        WebGL shader stack on top of it, creating an incredible lens refraction effect.
      */}
      <video
        src="/videos/hero-section-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Subtle overlay gradient to ensure high readability of text */}
      <div className="absolute inset-0 bg-white/[0.05] pointer-events-none z-5" />

      {/* Full-screen WebGL refraction shader overlay (z-10) */}
      <HeroShader />

      {/* Hero Content (z-20) */}
      <div className="relative z-20 flex-1 flex flex-col justify-end lg:justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-0 pt-20 sm:pt-24 select-none">

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center gap-10 lg:gap-6 w-full">

          {/* Left Column: Typography and Action CTAs */}
          <div className="flex flex-col items-start justify-center">
            {/* Small Label */}
            <FadeUp delay={0.05}>
              <span className="type-label text-[12px] sm:text-[13px] text-gray-900 mb-5 sm:mb-8 block">
                Slatout Agency
              </span>
            </FadeUp>

            {/* Headline h1 — locked to 3 lines */}
            <FadeUp delay={0.1}>
              <h1 className="type-hero text-[clamp(1.85rem,6.5vw,3.75rem)] sm:text-[clamp(2.35rem,5vw,3.85rem)] lg:text-[clamp(2.5rem,4.2vw,4.25rem)] text-gray-900">
                Launch, scale,
                <br />
                and protect your
                <br />
                business infrastructure.
              </h1>
            </FadeUp>

            {/* CTA Row — primary conversion + progressive exploration */}
            <FadeUp delay={0.25}>
              <div className="mt-8 sm:mt-12 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <PrimaryCta href="#contact">Book a strategy call</PrimaryCta>
                  <SecondaryCta href="#services">Explore services</SecondaryCta>
                </div>

              </div>
            </FadeUp>
          </div>

          {/* Right Column: Interactive 3D Cube */}
          <div className="flex items-center justify-center lg:justify-end w-full">
            <ServiceCube />
          </div>

        </div>

      </div>
    </section>
  );
}
