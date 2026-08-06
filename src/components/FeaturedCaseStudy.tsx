"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Cpu, Database, BarChart3, Star, Clock } from "lucide-react";

export default function FeaturedCaseStudy() {
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("challenge");

  return (
    <section id="case-study" className="relative bg-[#F5F5F5] py-14 sm:py-20 border-b border-gray-200 overflow-hidden">
      
      {/* Self-contained animations for graphs and line flow */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-progress {
          0% { stroke-dashoffset: 180; }
          100% { stroke-dashoffset: 45; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-draw-progress {
          stroke-dasharray: 180;
          animation: draw-progress 2s ease-out forwards;
        }
        .animate-float-badge {
          animation: float-badge 4s ease-in-out infinite;
        }
      `}} />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Badge and Title */}
        <div className="flex flex-col items-start gap-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
              7
            </div>
            <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
              Featured Case Study
            </span>
          </div>
          <h2 className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 max-w-[800px]">
            Narrativ AI: Scaling ingestion to 50M+ requests.
          </h2>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Business Story details */}
          <div className="flex flex-col items-start text-left">
            
            {/* Industry and Meta badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full">
                SaaS & Generative AI
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#F26522]/10 text-[#F26522] px-3 py-1 rounded-full">
                Enterprise Scale
              </span>
            </div>

            {/* Editorial tabs: Challenge, Solution, Results */}
            <div className="flex border-b border-gray-200 w-full mb-6">
              {(["challenge", "solution", "results"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 -mb-[2px] ${
                    activeTab === tab
                      ? "border-[#F26522] text-[#F26522]"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Content Panel */}
            <div className="min-h-[220px] w-full">
              {activeTab === "challenge" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900">The Ingestion Bottleneck</h3>
                  <p className="type-body text-gray-600 text-[14px] sm:text-[15px]">
                    Narrativ AI's vector database pipeline was choking under heavy concurrent ingestion requests from enterprise clients. File parsing delays led to API execution timeouts, database locks, and spiraling compute overheads on legacy cloud functions.
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Core pain points:</span>
                    <ul className="flex flex-col gap-2 pl-1">
                      {[
                        "Database lock contention during parallel vector syncs",
                        "High latency spikes (up to 4.2 seconds per file parse)",
                        "Unpredictable hosting costs during peak client uploads"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900">Serverless Edge Orchestrator</h3>
                  <p className="type-body text-gray-600 text-[14px] sm:text-[15px]">
                    We designed a serverless ingestion pipeline utilizing Next.js Edge APIs and isolated worker pools. Heavy PDF extraction is delegated asynchronously, while parallel embeddings are batched via Redis queue gates before ingestion into their vector databases.
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Engineered elements:</span>
                    <ul className="flex flex-col gap-2 pl-1">
                      {[
                        "Next.js Edge orchestration running asynchronous threads",
                        "Upstream caching layers minimizing duplicate file parsing",
                        "Optimized parallel vector sync routes utilizing Redis queues"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "results" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900">Unlocking Product Velocity</h3>
                  <p className="type-body text-gray-600 text-[14px] sm:text-[15px]">
                    The platform upgrade completely decoupled ingestion latency from database write speeds. High concurrent load is handled effortlessly with sub-second API execution, enabling Narrativ to sign three fortune-500 accounts in their subsequent quarter.
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Impact:</span>
                    <ul className="flex flex-col gap-2 pl-1">
                      {[
                        "Zero ingestion timeouts recorded post-deployment",
                        "Average client onboarding processing cut down to minutes",
                        "Reduced aggregate database write costs by 62%"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 size={14} className="text-[#F26522] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Technology Stack Grid */}
            <div className="mt-6 pt-6 border-t border-gray-200 w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Technology Used
              </span>
              <div className="flex flex-wrap gap-2">
                {["Next.js Edge", "Redis Queue", "OpenAI APIs", "Vector Database", "Serverless Workers"].map((tech) => (
                  <span
                    key={tech}
                    className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Read Case Study Button */}
            <a
              href="#contact"
              className="group flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white type-button text-[13px] sm:text-[14px] rounded-full pl-6 pr-2 py-2 mt-8 transition-colors duration-300 w-full sm:w-[240px]"
            >
              <span className="overflow-hidden h-[20px] relative block">
                <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center leading-none">Read Full Case Study</span>
                  <span className="h-[20px] flex items-center leading-none">Read Full Case Study</span>
                </span>
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center text-white transition-transform duration-500 ease-custom group-hover:translate-x-0.5">
                <ArrowRight size={14} className="stroke-[2.5]" />
              </div>
            </a>

          </div>

          {/* Right Column: Immersive Analytics and App mockup */}
          <div className="relative w-full flex flex-col gap-6">
            
            {/* Large high-fidelity visual mock dashboard */}
            <div className="w-full bg-[#0E131F] rounded-3xl border border-slate-800 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-slate-300 font-sans relative overflow-hidden">
              
              {/* Background accent ambient light */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#F26522] flex items-center justify-center text-[8px] text-white font-bold">N</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white leading-none">Narrativ Ingestion Control</span>
                    <span className="text-[9px] text-slate-500 mt-1">Live worker nodes status</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
                  <span className="text-[10px] text-slate-400 font-mono">532 req/sec</span>
                </div>
              </div>

              {/* Ingest Flow Visualizer */}
              <div className="flex flex-col gap-3.5 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 mb-5">
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Real-time Stream Logs</span>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-400">
                  <div className="flex items-center gap-2 border-b border-slate-800/40 pb-1.5">
                    <span className="text-[#F26522] font-semibold">[09:42:15]</span>
                    <span className="text-slate-300">File "doc_contract_92.pdf" received (14.2 MB)</span>
                  </div>
                  <div className="flex items-center gap-2 border-b border-slate-800/40 pb-1.5">
                    <span className="text-purple-400 font-semibold">[09:42:16]</span>
                    <span className="text-slate-300">Extracted metadata & parsed 48 text blocks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold">[09:42:16]</span>
                    <span className="text-emerald-400">Success: Synced 1,280 token embeddings</span>
                  </div>
                </div>
              </div>

              {/* Graphic charts inside client work */}
              <div className="grid grid-cols-[55%_45%] gap-4">
                
                {/* SVG Graph showing cost savings */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Vector Write Load</span>
                    <span className="text-xs font-bold text-white mt-1">Decoupled queue</span>
                  </div>

                  <div className="h-16 w-full mt-3 relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0,90 Q 20,40 40,85 T 80,20 L 100,20 L 100,100 L 0,100 Z" fill="#F26522" fillOpacity="0.1" />
                      <path d="M 0,90 Q 20,40 40,85 T 80,20 L 100,20" fill="none" stroke="#F26522" strokeWidth="2.5" />
                      <circle cx="80" cy="20" r="3" className="fill-[#F26522]" />
                    </svg>
                  </div>
                </div>

                {/* Progress Circle showing speed multiplier */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Engine Speed</span>
                    <span className="text-base font-bold text-white mt-1">4.2x faster</span>
                    <span className="text-[9px] text-[#F26522] font-semibold mt-1">Pipeline optimization</span>
                  </div>
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="2.5" fill="transparent" />
                      <circle cx="24" cy="24" r="20" stroke="#F26522" strokeWidth="3" fill="transparent" strokeDasharray="125" strokeDashoffset="31" />
                    </svg>
                    <span className="absolute text-[8px] font-mono font-bold text-white">80%</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Storytelling Impact Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { value: "+180% Leads", desc: "Via real-time interactive demo features." },
                { value: "4x Faster", desc: "Automated ingestion worker pipelines." },
                { value: "95% CSAT", desc: "Unmatched customer onboarding speed." }
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-gray-300 transition-colors duration-300"
                >
                  <span className="text-xl sm:text-[22px] type-card-title text-gray-900 leading-none mb-2 block">
                    {metric.value}
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
