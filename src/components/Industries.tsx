"use client";

import React from "react";
import { CreditCard, BrainCircuit, ShoppingBag, HeartPulse, Cpu, Activity, ShieldCheck, Lock } from "lucide-react";
import { WordRevealHeading, FadeUp, StaggerContainer, StaggerChild } from "./Motion";
import { CardCta, TextCta } from "./CtaSystem";

export default function Industries() {
  return (
    <section id="industries" className="bg-[#EFEFEF] py-12 sm:py-16 border-b border-gray-200 overflow-hidden">
      
      {/* Dynamic Keyframes for In-Card Visual Actions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-pulse-flow {
          stroke-dasharray: 6 6;
          animation: pulse-flow 2s linear infinite;
        }
        @keyframes draw-path {
          0% { stroke-dashoffset: 200; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
        .animate-draw-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-path 5s ease-in-out infinite;
        }
        @keyframes progress-drift {
          0% { width: 0%; }
          15% { width: 98%; }
          30%, 100% { width: 98%; }
          60% { width: 92%; }
          80% { width: 99%; }
        }
        .animate-progress-grow {
          animation: progress-drift 8s ease-in-out infinite;
        }
        @keyframes pulse-light {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }
        @keyframes block-float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes block-float-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes block-float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-block-1 {
          animation: block-float-1 3s infinite ease-in-out;
        }
        .animate-block-2 {
          animation: block-float-2 3.5s infinite ease-in-out;
        }
        .animate-block-3 {
          animation: block-float-3 2.8s infinite ease-in-out;
        }
      `}} />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col items-start gap-3">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  3
                </div>
                <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                  Target Industries
                </span>
              </div>
            </FadeUp>
            <WordRevealHeading
              text="Expertise across high-growth sectors."
              className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900"
            />
          </div>
          <div className="flex items-end lg:pl-10 justify-between gap-6 w-full">
            <FadeUp delay={0.15}>
              <p className="type-body text-gray-600 text-[14px] sm:text-[15px] max-w-[540px]">
                We adapt our development velocities, system architectures, and user design languages to match the unique compliance and performance demands of your specific sector.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* ================= 1. FinTech & Payments ================= */}
          <StaggerChild>
            <div className="group relative bg-white border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(242,101,34,0.03)] hover:border-[#F26522]/30 hover:-translate-y-0.5 overflow-hidden">
              
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#F26522]">
                    <CreditCard size={16} className="stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 font-mono">01 / SECTOR</span>
                </div>

                <h3 className="type-card-title text-xl text-gray-900 mb-2">
                  FinTech & Payments
                </h3>
              <p className="type-body text-gray-500 text-[13px] sm:text-[14px] mb-4">
                Building secure billing architectures, recurring subscriptions, custom ledger integrations, and double-entry reconciliation engines.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {["PCI Compliant", "Stripe API", "Ledger Sync"].map((tag) => (
                  <span key={tag} className="bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* In-card Visual: Sleek SVG Transaction Chart */}
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 h-20 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,100 L 0,80 Q 20,40 45,65 T 90,20 L 100,20 L 100,100 Z" fill="#F26522" fillOpacity="0.06" />
                <path d="M 0,80 Q 20,40 45,65 T 90,20" fill="none" stroke="#F26522" strokeWidth="2" className="animate-draw-path" />
              </svg>
              <div className="absolute top-2 right-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-bold text-slate-500 font-mono">Live Ledger Sync</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-5 flex justify-between items-center">
              <span className="text-[10px] text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                SOC2 Ready
              </span>
              <CardCta href="#why-choose-us">See FinTech approach</CardCta>
            </div>

            </div>

          </StaggerChild>

          {/* ================= 2. Headless E-Commerce ================= */}
          <StaggerChild>
            <div className="group relative bg-white border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(242,101,34,0.03)] hover:border-[#F26522]/30 hover:-translate-y-0.5 overflow-hidden">
              
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#F26522]">
                    <ShoppingBag size={16} className="stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 font-mono">02 / SECTOR</span>
                </div>

                <h3 className="type-card-title text-xl text-gray-900 mb-2">
                  Headless E-Commerce
                </h3>
                <p className="type-body text-gray-500 text-[13px] sm:text-[14px] mb-4">
                  Creating fast headless engines and inventory synchronization funnels maximizing order value.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Shopify GraphQL", "Edge Caches", "Speed Ingestion"].map((tag) => (
                    <span key={tag} className="bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* In-card Visual: Speed Meter */}
              <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 h-20 flex flex-col justify-center gap-1.5">
                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                  <span>Lighthouse Core Speed</span>
                  <span className="text-emerald-600 font-mono">98/100</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-progress-grow" style={{ width: "98%" }} />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-5 flex justify-between items-center">
                <span className="text-[10px] text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  GDPR Ready
                </span>
                <CardCta href="#showcase">See commerce builds</CardCta>
              </div>

            </div>
          </StaggerChild>

          {/* ================= 3. HealthTech & BioTech ================= */}
          <StaggerChild>
            <div className="group relative bg-white border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(242,101,34,0.03)] hover:border-[#F26522]/30 hover:-translate-y-0.5 overflow-hidden">
              
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#F26522]">
                    <HeartPulse size={16} className="stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 font-mono">03 / SECTOR</span>
                </div>

                <h3 className="type-card-title text-xl text-gray-900 mb-2">
                  HealthTech & BioTech
                </h3>
                <p className="type-body text-gray-500 text-[13px] sm:text-[14px] mb-4">
                  Developing secure telemetry trackers and client logging portals with HIPAA compliance standards.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["HIPAA Architecture", "Telemetry Sync", "Secure Audit"].map((tag) => (
                    <span key={tag} className="bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* In-card Visual: Audit Logging Checklist */}
              <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 h-20 flex flex-col justify-center gap-2 font-mono text-[8px] text-slate-500">
                <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Lock size={8} className="text-emerald-600 animate-pulse-light" />
                    <span>Patient Telemetry: Encrypted</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={9} className="text-[#F26522] animate-pulse-light" />
                  <span>Audit Logs: Signed & Sealed</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-5 flex justify-between items-center">
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  HIPAA Ready
                </span>
                <CardCta href="#process">See compliance model</CardCta>
              </div>

            </div>
          </StaggerChild>

          {/* ================= 4. Web3 & Cryptography ================= */}
          <StaggerChild>
            <div className="group relative bg-white border border-gray-255/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(242,101,34,0.03)] hover:border-[#F26522]/30 hover:-translate-y-0.5 overflow-hidden">
              
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#F26522]">
                    <Cpu size={16} className="stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 font-mono">04 / SECTOR</span>
                </div>

                <h3 className="type-card-title text-xl text-gray-900 mb-2">
                  Web3 & Cryptography
                </h3>
                <p className="type-body text-gray-500 text-[13px] sm:text-[14px] mb-4">
                  Engineering custom RPC telemetry portals and contract verification pipelines.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Smart Contracts", "RPC Node Sync", "DApp Ingests"].map((tag) => (
                    <span key={tag} className="bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* In-card Visual: Block explorer stack */}
              <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 h-20 flex items-center justify-center gap-2">
                {[1, 2, 3].map((b) => (
                  <div key={b} className={`w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center text-[7px] font-mono text-slate-400 animate-block-${b}`}>
                    <span className="font-bold text-[#F26522]">Blk</span>
                    <span>#08{b}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mt-5 flex justify-between items-center">
                <span className="text-[10px] text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  120+ Deployments
                </span>
                <CardCta href="#process">See Web3 delivery</CardCta>
              </div>

            </div>
          </StaggerChild>

        </StaggerContainer>

        <FadeUp delay={0.1} className="mt-10 flex justify-start sm:justify-end">
          <TextCta href="#why-choose-us">Discover our approach</TextCta>
        </FadeUp>

      </div>
    </section>
  );
}
