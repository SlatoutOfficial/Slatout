"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, BarChart3, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WordRevealHeading, FadeUp, ScaleIn } from "./Motion";
import { TextCta } from "./CtaSystem";

const methods = [
  {
    id: 1,
    title: "Business-First Thinking",
    shortTitle: "Business First",
    desc: "We align all processes with your commercial metrics. We build setups, tax files, and platforms to push your core financial and operational targets forward.",
    bullets: [
      "Direct integration with revenue & compliance targets",
      "Deep discovery phases eliminating service overheads",
      "Continuous ROI mapping throughout delivery cycles"
    ],
    metric: "Revenue Aligned",
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="relative h-28 w-full max-w-[200px] border-l border-b border-gray-300">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0,90 Q 20,40 45,65 T 90,20 L 100,20 L 100,100 L 0,100 Z" fill="#F26522" fillOpacity="0.06" />
            <path d="M 0,90 Q 20,40 45,65 T 90,20" fill="none" stroke="#F26522" strokeWidth="2.5" />
            <circle cx="90" cy="20" r="3" className="fill-[#F26522]" />
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-gray-500 font-mono">ROI Active</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Transparent Communication",
    shortTitle: "Transparency",
    desc: "No black boxes or hidden cycles. We offer complete access to filing queues, database deploys, and active channels, keeping you in control of every step.",
    bullets: [
      "Daily asynchronous updates and file handovers",
      "Direct communication with dedicated professionals",
      "Full shared visibility on regulatory calendars"
    ],
    metric: "Open Logs",
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-2">
        <div className="w-full max-w-[220px] bg-slate-900 rounded-xl p-3 font-mono text-[9px] text-slate-300 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-1.5 border-b border-slate-850 pb-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-slate-500 uppercase tracking-wider">Sync Log</span>
          </div>
          <p className="text-slate-400">[09:00] Account Reconciliation complete</p>
          <p className="text-slate-400">[11:15] Company Charter approved</p>
          <p className="text-emerald-400">[13:00] GST Filing Submitted: Success</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Fast Delivery",
    shortTitle: "Fast Iterations",
    desc: "Speed is a competitive advantage. We leverage optimized pipelines to incorporate entities, submit tax documents, and deploy software at unmatched speeds.",
    bullets: [
      "Incorporation certificates processed in 3-5 days",
      "Bi-weekly software sprint releases & staging links",
      "Automated pipeline configurations reducing latency"
    ],
    metric: "3-5 Days SLA",
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
            <circle cx="48" cy="48" r="40" stroke="#F26522" strokeWidth="4.5" fill="transparent" strokeDasharray="250" strokeDashoffset="75" className="transition-all duration-1000" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-900 leading-none">4x</span>
            <span className="text-[8px] text-gray-400 uppercase tracking-widest font-mono mt-0.5">Speed</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Long-Term Partnership",
    shortTitle: "Partnership",
    desc: "We measure success in years, not sprints. Slatout remains committed as your strategic ally, scaling your tax compliance, branding, and server layers as you grow.",
    bullets: [
      "Dedicated account managers for ongoing compliance support",
      "Quarterly regulatory audits & technical reviews",
      "Scalable infrastructure designed for future expansions"
    ],
    metric: "Strategic Ally",
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-3">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-[#F26522]">
            <HeartHandshake size={16} />
          </div>
          <div className="w-10 h-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <BarChart3 size={16} />
          </div>
          <div className="w-10 h-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Zero Contract Lock-in</span>
      </div>
    )
  }
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState(methods[0]);

  return (
    <section id="why-choose-us" className="bg-[#FFFFFF] py-12 sm:py-16 border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Header Block */}
        <div className="flex flex-col items-start gap-3 mb-8 sm:mb-10">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                4
              </div>
              <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                Our Method
              </span>
            </div>
          </FadeUp>
          <WordRevealHeading
            text="Engineered to translate complex challenges into clear commercial outcomes."
            className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 max-w-[1000px]"
          />
        </div>

        {/* Tabbed Interface Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-start">
          
          {/* Left Side: Tabs Switcher (Desktop) */}
          <div className="hidden lg:flex flex-col gap-2.5">
            {methods.map((method) => {
              const isActive = activeTab.id === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setActiveTab(method)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-gray-50/80 border-[#F26522]/30 shadow-[0_4px_16px_rgba(242,101,34,0.01)]"
                      : "bg-transparent border-transparent hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className={`text-[10px] font-bold font-mono tracking-wider ${isActive ? "text-[#F26522]" : "text-gray-400"}`}>
                      PHASE 0{method.id}
                    </span>
                    <h3 className={`type-card-title text-base mt-1 transition-colors ${
                      isActive ? "text-[#F26522]" : "text-gray-900"
                    }`}>
                      {method.title}
                    </h3>
                  </div>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform duration-300 ${
                    isActive ? "translate-x-1 text-[#F26522]" : "group-hover:translate-x-0.5"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Left Side: Tabs Switcher (Mobile/Tablet horizontal list) */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {methods.map((method) => {
              const isActive = activeTab.id === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setActiveTab(method)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                    isActive
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {method.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Right Side: Active Tab Detail Panel (Desktop & Mobile) with AnimatePresence */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-gray-200/60 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 items-center min-h-[300px] shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative overflow-hidden"
              >
                {/* Left text column */}
                <div className="flex flex-col items-start text-left">
                  <span className="bg-orange-50 border border-orange-100 text-[#F26522] text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {activeTab.metric}
                  </span>
                  
                  <h3 className="type-card-title text-xl sm:text-2xl text-gray-900 mt-4 mb-3">
                    {activeTab.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5">
                    {activeTab.desc}
                  </p>

                  <div className="flex flex-col gap-2.5 w-full">
                    {activeTab.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 size={14} className="text-[#F26522] shrink-0 mt-0.5" />
                        <span className="text-gray-800 text-[12px] font-medium leading-tight">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right illustration column (reduced height & premium visual) */}
                <div className="bg-[#F5F5F5] border border-gray-200/50 rounded-2xl p-5 h-[160px] sm:h-[180px] w-full flex items-center justify-center relative overflow-hidden transition-all duration-300">
                  {activeTab.visual}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <FadeUp delay={0.1} className="mt-10 flex justify-start sm:justify-end">
          <TextCta href="#process">See how we execute</TextCta>
        </FadeUp>

      </div>
    </section>
  );
}
