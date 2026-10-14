"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, Trophy } from "lucide-react";
import { WordRevealHeading, FadeUp } from "../../components/Motion";
import SiteEnd from "../../components/SiteEnd";

export default function AboutPage() {
  const smallImg = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85";
  const largeImg = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85";

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[450px] sm:min-h-[500px] flex items-center bg-[#111] border-b border-white/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(17,17,17,0.95) 40%, rgba(17,17,17,0.7) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)`,
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
                Introducing Slatout
              </span>
            </div>
            <h1 className="type-hero text-[clamp(2.2rem,6vw,4rem)] text-white mt-2 max-w-[900px]">
              Strategy-led builders, delivering results in digital and beyond.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[620px] mt-2">
              Through research, engineering and digital growth, we help growing brands realize their full digital potential.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Philosophy */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side: Images */}
            <div className="flex flex-col gap-6">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                <img
                  src={largeImg}
                  alt="Slatout Collaborative Office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                  <img
                    src={smallImg}
                    alt="Engineering workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 flex flex-col justify-between">
                  <Trophy size={24} className="text-[#F97432] stroke-[1.5]" />
                  <div>
                    <span className="text-3xl font-bold text-gray-900 block tracking-tight">99+</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mt-1">Lighthouse Speed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Studio Values */}
            <div className="flex flex-col justify-center gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl sm:text-3xl type-card-title text-gray-900">
                  How We Think
                </h3>
                <p className="text-gray-600 text-base sm:text-[17px] leading-relaxed">
                  We don't believe in boilerplate solutions or templates. Your architecture should reflect the unique compliance, scalability, and design standards of your sector.
                </p>
              </div>

              {/* Toggles / Core Values */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    title: "Strategy First",
                    desc: "Every project begins with absolute alignment on your business model, customer segments, and growth metrics.",
                    icon: ShieldCheck
                  },
                  {
                    title: "Engineered to Win",
                    desc: "Handcrafted, highly optimized Next.js frameworks, headless APIs, and sub-second ingestion nodes.",
                    icon: Sparkles
                  },
                  {
                    title: "Long-term Partnerships",
                    desc: "We act as your dedicated engineering and marketing partner, scaling along with your monthly recurring revenue.",
                    icon: Heart
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200/80 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F97432] shrink-0">
                        <Icon size={18} className="stroke-[1.5]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-900 text-sm">{item.title}</span>
                        <span className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteEnd />
    </main>
  );
}
