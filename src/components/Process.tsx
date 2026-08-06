"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WordRevealHeading, FadeUp, ScaleIn } from "./Motion";
import { SecondaryCta, TextCta } from "./CtaSystem";

const processSteps = [
  {
    id: 1,
    phase: "Discover",
    branchName: "discover/audit",
    title: "Deep Scoping & Audit",
    timeline: "1-3 Days",
    desc: "Deconstructing your technical architecture and business goals to align product blueprints with your commercial KPIs.",
    deliverables: ["User Persona Matrix", "Architecture Audit", "Competitor Gap Report"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 font-mono text-[9px] sm:text-[10px] text-slate-350 select-none">
        <div className="w-full max-w-[240px] bg-slate-900 rounded-xl p-3.5 border border-slate-800 flex flex-col gap-2 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-1">
            <span className="text-slate-500 uppercase tracking-widest text-[8px]">Git Branch: discover/audit</span>
            <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px]">Audit OK</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Server Response</span>
            <span className="text-emerald-400 font-bold">200 OK</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Database Latency</span>
            <span className="text-[#F26522] font-bold">14ms</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>SEO Index Gaps</span>
            <span className="text-red-400 font-bold">3 found</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    phase: "Strategy",
    branchName: "strategy/blueprint",
    title: "The Scale Blueprint",
    timeline: "Week 1",
    desc: "Defining the product strategy, system architecture, database configurations, and custom sprint velocity calendars.",
    deliverables: ["Data Schema Maps", "UX Flowcharts", "Sprint Milestones Matrix"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 font-mono text-[9px] sm:text-[10px] text-slate-350 select-none">
        <div className="w-full max-w-[240px] bg-slate-900 rounded-xl p-3.5 border border-slate-800 flex flex-col gap-2 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <span className="text-slate-500 uppercase tracking-widest text-[8px]">Data Schema</span>
            <span className="text-orange-400 text-[8px] font-bold">Active</span>
          </div>
          <div className="bg-slate-950/40 border border-slate-800 rounded p-2">
            <span className="text-[#F26522] font-bold block">UserTable</span>
            <span className="text-slate-500 block mt-0.5">- id: UUID (PK)</span>
            <span className="text-slate-500 block">- active_setup: boolean</span>
            <span className="text-slate-500 block">- compliance_score: int</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    phase: "Design",
    branchName: "design/prototype",
    title: "High-Fidelity Prototypes",
    timeline: "Weeks 2-3",
    desc: "Creating robust modular design systems, custom high-fidelity mockups, and interactive motion prototypes.",
    deliverables: ["Figma Design System", "Interactive Prototype", "Visual Identity Guides"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 text-slate-400 font-sans text-xs select-none">
        <div className="w-full max-w-[240px] bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span className="text-[9px] font-mono text-slate-500">Design System</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded p-2 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="w-12 h-2 bg-slate-800 rounded" />
              <span className="w-18 h-1.5 bg-slate-850 rounded" />
            </div>
            <div className="w-6 h-3 bg-[#F26522]/20 border border-[#F26522]/30 rounded flex items-center justify-center text-[7px] text-[#F26522] font-bold">
              Tab
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono mt-0.5">
            <span>Primary: #F26522</span>
            <span>Radius: 12px</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    phase: "Development",
    branchName: "develop/engineering",
    title: "Production Engineering",
    timeline: "Weeks 4-7",
    desc: "Writing clean, type-safe Next.js platforms, building API integrations, and deploying server codes on Edge networks.",
    deliverables: ["Clean GitHub Repo", "Secure API Gateway", "Staging UI Build"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 font-mono text-[9px] text-slate-300 select-none">
        <div className="w-full max-w-[240px] bg-slate-950 rounded-xl border border-slate-850 p-3 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center gap-1.5 border-b border-slate-850 pb-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-slate-500">Console Output</span>
          </div>
          <p className="text-purple-400">git push origin main</p>
          <p className="text-slate-500">&gt; deploying next-app...</p>
          <p className="text-emerald-400">✓ Production build success</p>
          <p className="text-slate-400">Edge Network: 100% nodes synced</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    phase: "Launch",
    branchName: "launch/production",
    title: "Performance Release",
    timeline: "Week 8",
    desc: "Running production builds through Lighthouse performance audits, metadata SEO checklists, and SSL handshakes.",
    deliverables: ["100 Lighthouse Audit", "SEO Metadata Schema", "SSL Secure Gateway"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 text-slate-300 select-none">
        <div className="w-full max-w-[220px] bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Build Verification</span>
          <div className="relative w-14 h-14 flex items-center justify-center mt-1">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="#1e293b" strokeWidth="2" fill="transparent" />
              <circle cx="28" cy="28" r="24" stroke="#10b981" strokeWidth="3" fill="transparent" strokeDasharray="150" strokeDashoffset="0" />
            </svg>
            <span className="absolute text-xs font-bold font-mono text-emerald-400">100</span>
          </div>
          <span className="text-[9px] text-emerald-400 font-bold font-mono">SLA Checklist Cleared</span>
        </div>
      </div>
    )
  },
  {
    id: 6,
    phase: "Growth",
    branchName: "growth/scale",
    title: "Optimization & Loops",
    timeline: "Ongoing",
    desc: "Monitoring telemetry dashboards, tracking conversions, and releasing incremental feature upgrades.",
    deliverables: ["Telemetry Dashboard", "A/B Conversion Upgrades", "Feature Sprint Logs"],
    visual: (
      <div className="flex flex-col justify-center items-center h-full w-full p-4 text-slate-300 select-none">
        <div className="w-full max-w-[240px] bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Acquisition Loops</span>
            <span className="text-emerald-500 text-[9px] font-bold">+180% Leads</span>
          </div>
          <div className="h-12 w-full relative mt-1">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,90 Q 20,40 40,85 T 80,10 L 100,10 L 100,100 L 0,100 Z" fill="#10b981" fillOpacity="0.08" />
              <path d="M 0,90 Q 20,40 40,85 T 80,10 L 100,10" fill="none" stroke="#10b981" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    )
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(processSteps[0]);

  return (
    <section id="process" className="bg-[#F5F5F5] py-12 sm:py-16 border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Header Block */}
        <div className="flex flex-col items-start gap-3 mb-8 sm:mb-10">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                5
              </div>
              <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                Our Process
              </span>
            </div>
          </FadeUp>
          <WordRevealHeading
            text="A programmatic execution framework built for continuous product velocity."
            className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 max-w-[1000px]"
          />
        </div>

        {/* Git Branching Timeline Canvas */}
        <div className="relative bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] mb-6">
          
          {/* Scrollable SVG branching track container */}
          <div className="w-full overflow-x-auto scrollbar-none pb-4">
            <div className="min-w-[860px] relative">
              <svg className="w-full h-[100px]" viewBox="0 0 900 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main Branch Base Track Line */}
                <motion.line 
                  x1="30" 
                  y1="25" 
                  x2="870" 
                  y2="25" 
                  stroke="#E2E8F0" 
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Master Branch Tag */}
                <text x="35" y="16" className="fill-gray-400 font-mono text-[8px] font-bold tracking-widest uppercase">main</text>

                {processSteps.map((step, idx) => {
                  const cx = 75 + idx * 150;
                  const isActive = activeStep.id === step.id;
                  
                  // Bezier curve branching down and returning
                  const pathData = `M ${cx - 50} 25 C ${cx - 20} 25, ${cx - 20} 70, ${cx} 70 C ${cx + 20} 70, ${cx + 20} 25, ${cx + 50} 25`;
                  
                  return (
                    <g key={step.id} className="cursor-pointer" onClick={() => setActiveStep(step)}>
                      {/* Branching Path */}
                      <motion.path
                        d={pathData}
                        animate={{
                          stroke: isActive ? "#F26522" : "#E2E8F0",
                          strokeWidth: isActive ? 2.5 : 1.5
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                      
                      {/* Node circle on the active branch */}
                      <motion.circle
                        cx={cx}
                        cy="70"
                        animate={{
                          r: isActive ? 8 : 5,
                          fill: isActive ? "#F26522" : "#E2E8F0"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      
                      {/* Node Text Label on main branch */}
                      <text
                        x={cx}
                        y="15"
                        textAnchor="middle"
                        className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? "fill-[#F26522]" : "fill-gray-400"
                        }`}
                      >
                        {step.phase}
                      </text>
                      
                      {/* Step Number Tag inside node */}
                      <motion.text
                        x={cx}
                        y={isActive ? 73 : 72}
                        textAnchor="middle"
                        animate={{
                          fill: isActive ? "#FFFFFF" : "#6B7280"
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-[7px] font-bold select-none"
                      >
                        0{step.id}
                      </motion.text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Unified Delivery Console (With AnimatePresence for content transitions) */}
          <div className="relative overflow-hidden min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-gray-100 pt-6 mt-2 grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 items-center"
              >
                {/* Left Column: Console Details */}
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold font-mono">
                      <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12a9 9 0 0 0 9 9" /></svg>
                      <span>{activeStep.branchName}</span>
                    </div>
                    <span className="bg-orange-50 border border-orange-100 text-[#F26522] text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                      {activeStep.timeline}
                    </span>
                  </div>

                  <h3 className="type-card-title text-xl sm:text-2xl text-gray-900 mt-4 mb-2.5">
                    {activeStep.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5 max-w-[480px]">
                    {activeStep.desc}
                  </p>

                  {/* Deliverables Inline Row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {activeStep.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex gap-2 items-center">
                        <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" /></svg>
                        <span className="text-gray-800 text-[11px] font-bold leading-tight">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Console Visual Graphic Container */}
                <div className="bg-[#0E131F] border border-slate-800 rounded-2xl h-[170px] w-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#F26522]/5 rounded-full blur-2xl pointer-events-none" />
                  {activeStep.visual}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <FadeUp delay={0.1} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <SecondaryCta href="#contact">Schedule a discovery call</SecondaryCta>
          <TextCta href="#showcase" tone="muted">See what we've shipped</TextCta>
        </FadeUp>

      </div>
    </section>
  );
}
