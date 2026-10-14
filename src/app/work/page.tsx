"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import FeaturedCaseStudy from "../../components/FeaturedCaseStudy";
import CaseStudies from "../../components/CaseStudies";
import SiteEnd from "../../components/SiteEnd";
import { Sparkles } from "lucide-react";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[450px] sm:min-h-[500px] flex items-center bg-[#111] border-b border-white/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(17,17,17,0.95) 40%, rgba(17,17,17,0.7) 100%), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F97432] shadow-sm shrink-0">
                <Sparkles size={18} className="stroke-[1.5]" />
              </div>
              <span className="type-label text-[12px] border border-white/20 rounded-full px-3.5 py-1 text-white/90">
                Case Studies
              </span>
            </div>
            <h1 className="type-hero text-[clamp(2.2rem,6vw,4rem)] text-white mt-2 max-w-[900px]">
              Our Work: Proof in production.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[620px] mt-2">
              Explore how we've engineered high-velocity serverless setups, optimized vector database ingestion pipelines, and scaled startups.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <FeaturedCaseStudy />

      {/* Grid of Case Studies */}
      <CaseStudies />

      <SiteEnd />
    </main>
  );
}
