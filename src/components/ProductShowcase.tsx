"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, Play, Cpu, Zap, Layers } from "lucide-react";
import { WordRevealHeading, FadeUp, ScaleIn, CountUp } from "./Motion";
import { SecondaryCta, TextCta } from "./CtaSystem";

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    // Smooth tilt angles
    setTilt({
      x: x * 3, // Max 1.5 degrees rotation on Y
      y: -y * 3 // Max 1.5 degrees rotation on X
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="showcase" className="relative bg-[#09080E] py-14 sm:py-20 border-b border-white/10 overflow-hidden">
      
      {/* Self-contained animations for floating devices and workflow lines */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-desktop {
          0%, 100% { transform: translateY(0px) rotate(0.5deg); }
          50% { transform: translateY(-4px) rotate(-0.5deg); }
        }
        @keyframes float-mobile {
          0%, 100% { transform: translateY(0px) scale(1) rotate(-1deg); }
          50% { transform: translateY(-6px) scale(1.01) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes run-particle {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-float-desktop {
          animation: float-desktop 8s ease-in-out infinite;
        }
        .animate-float-mobile {
          animation: float-mobile 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 5s ease-in-out infinite;
        }
        .animate-run-particle {
          stroke-dasharray: 8 12;
          animation: run-particle 1.8s linear infinite;
        }
      `}} />

      {/* Decorative ambient background glow behind the devices */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#F97432]/10 to-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Additional ambient top-left glow to brighten dark background */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#F97432]/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] items-center gap-12 lg:gap-16">
          
          {/* Left Column: Product Value Pitch */}
          <div className="flex flex-col items-start text-left">
            
            {/* Badge */}
            <ScaleIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-full bg-white text-gray-900 text-[11px] font-semibold flex items-center justify-center">
                  6
                </div>
                <span className="type-label text-[12px] border border-white/10 rounded-full px-3.5 py-1 text-gray-300">
                  Product Showcase
                </span>
              </div>
            </ScaleIn>

            {/* Headline */}
            <WordRevealHeading
              text="Built for businesses that demand more."
              className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-white mb-6"
            />

            {/* Description */}
            <FadeUp delay={0.1}>
              <p className="type-body text-gray-400 text-[15px] sm:text-[16px] mb-8 max-w-[480px]">
                We design and engineer digital platforms that convert. From sub-second response times to secure database scaling and intelligent AI agent workflows, our solutions are architected to establish permanent market advantages.
              </p>
            </FadeUp>

            {/* Feature Highlights */}
            <div className="flex flex-col gap-4 mb-8 w-full">
              {[
                {
                  title: "Enterprise UI",
                  desc: "Pixel-perfect, high-fidelity components built for scale.",
                  icon: Layers
                },
                {
                  title: "Lightning Fast Performance",
                  desc: "Edge-cached data structures and sub-100ms response cycles.",
                  icon: Zap
                },
                {
                  title: "AI Ready Architecture",
                  desc: "Intelligent automation and LLM pipelines running natively.",
                  icon: Cpu
                }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start border-l border-white/10 pl-4 py-1 hover:border-[#F97432] transition-colors duration-300">
                    <div className="w-5 h-5 rounded-md bg-[#F97432]/10 flex items-center justify-center text-[#F97432] shrink-0 mt-0.5">
                      <Icon size={12} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="type-card-title text-sm text-white">{feat.title}</h4>
                      <p className="text-xs text-gray-450 mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progressive CTAs — exploration before convert */}
            <FadeUp delay={0.15}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <SecondaryCta href="#testimonials" dark>See partner results</SecondaryCta>
                <TextCta href="#contact" tone="brand">Discuss a similar build</TextCta>
              </div>
            </FadeUp>

          </div>

          {/* Right Column: Immersive 3D Tilt Devices Mockup */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/3] max-w-[760px] mx-auto flex items-center justify-center cursor-default"
            style={{ perspective: "1200px" }}
          >
            {/* Inner tilt wrapper */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              
              {/* Radial gradient background aura inside the tilt space */}
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-[#F97432]/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none opacity-60 z-0 animate-pulse-glow" />

              {/* ----------------- 1. Desktop Browser Mockup ----------------- */}
              <div 
                className="absolute w-[82%] aspect-[16/10] bg-[#0E131F] rounded-2xl border border-slate-800 shadow-[0_24px_70px_rgba(0,0,0,0.4)] overflow-hidden z-10 animate-float-desktop"
                style={{ transform: "translateZ(0px)" }}
              >
                {/* Browser top chrome header */}
                <div className="bg-[#151C2C] px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="bg-[#0E131F] px-4 py-1 rounded-md text-[10px] text-slate-500 font-mono w-[45%] text-center border border-slate-800/40">
                    console.slatout.io/analytics
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#F97432] animate-pulse" />
                  </div>
                </div>

                {/* Dashboard Inner Grid */}
                <div className="p-4 grid grid-cols-[20%_80%] gap-4 h-[calc(100%-43px)] text-slate-300 font-sans">
                  
                  {/* Dashboard Sidebar */}
                  <div className="flex flex-col gap-4 border-r border-slate-800/60 pr-3 justify-between pb-2">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Workspace</span>
                      <div className="bg-slate-800/40 rounded-lg p-2 flex items-center gap-2 border border-slate-700/30">
                        <div className="w-4 h-4 rounded-md bg-[#F97432] flex items-center justify-center text-[10px] font-bold text-white">S</div>
                        <span className="text-[11px] font-semibold text-slate-200">Slatout</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 mt-2">
                        {["Overview", "Workflows", "Models", "Security"].map((item, idx) => (
                          <div
                            key={idx}
                            className={`px-2 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-2 transition-colors ${
                              idx === 0 ? "bg-[#F97432]/10 text-[#F97432]" : "hover:bg-slate-800/30 text-slate-400"
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-[#F97432]" : "bg-slate-600"}`} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-600 font-mono">v1.2.8-edge</div>
                  </div>

                  {/* Dashboard Main Content Area */}
                  <div className="flex flex-col gap-4 overflow-hidden pr-1">
                    
                    {/* Header Row */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-white">Analytics Overview</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">Real-time enterprise ingestion metrics</p>
                      </div>
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                        AI Agent Active
                      </span>
                    </div>

                    {/* Stats Metrics Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Pipeline Uptime", val: "99.998", suffix: "%", metric: "12ms avg" },
                        { label: "Active Connections", val: "48,290", suffix: "", metric: "+12.4% /hr" },
                        { label: "Cost Efficiency", val: "84.2", suffix: "%", metric: "Saved $4.2k" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-800/20 border border-slate-800/80 rounded-xl p-2.5 flex flex-col justify-between">
                          <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">{item.label}</span>
                          <span className="text-sm font-bold text-white mt-1">
                            {item.val}{item.suffix}
                          </span>
                          <span className="text-[9px] text-emerald-400 font-mono mt-1 font-semibold">{item.metric}</span>
                        </div>
                      ))}
                    </div>

                    {/* SVG Chart & Workflow Grid split */}
                    <div className="grid grid-cols-[55%_45%] gap-3 flex-1 overflow-hidden min-h-0">
                      
                      {/* Interactive Graph Box */}
                      <div className="bg-slate-800/20 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-bold">API Ingestion Rate</span>
                          <span className="text-[9px] text-slate-500 font-mono">1m interval</span>
                        </div>
                        
                        {/* Area Chart SVG */}
                        <div className="relative h-24 w-full mt-2">
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F97432" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#F97432" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="75" x2="100" y2="75" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                            
                            {/* Area path */}
                            <path d="M 0,100 L 0,80 Q 15,50 30,65 T 60,35 T 85,20 L 100,50 L 100,100 Z" fill="url(#chartGradient)" />
                            
                            {/* Line path */}
                            <path d="M 0,80 Q 15,50 30,65 T 60,35 T 85,20 L 100,50" fill="none" stroke="#F97432" strokeWidth="2" />
                            
                            {/* Hot point */}
                            <circle cx="85" cy="20" r="2.5" className="fill-[#F97432] stroke-white stroke-[0.5]" />
                          </svg>
                        </div>
                      </div>

                      {/* Automation Workflow stream box */}
                      <div className="bg-slate-800/20 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
                        <span className="text-[10px] text-slate-400 font-bold mb-2 block">Agent Orchestrator</span>
                        
                        <div className="flex flex-col gap-2 relative flex-1 justify-center">
                          {/* Animated flow connectors */}
                          <svg className="absolute left-[15px] top-[14px] bottom-[14px] w-[2px] h-[calc(100%-28px)] text-[#F97432] pointer-events-none" fill="none">
                            <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="1.5" className="animate-run-particle" />
                          </svg>

                          {[
                            { name: "Checkout Trigger", status: "Webhook", dotColor: "bg-[#F97432]" },
                            { name: "Risk LLM Node", status: "AI Analysis", dotColor: "bg-purple-500" },
                            { name: "Payment Complete", status: "Stripe API", dotColor: "bg-orange-400" }
                          ].map((node, nIdx) => (
                            <div key={nIdx} className="flex items-center gap-3 relative pl-6">
                              <span className={`absolute left-2.5 w-2 h-2 rounded-full ${node.dotColor} z-10`} />
                              <div className="flex-1 bg-slate-800/40 border border-slate-700/30 rounded-lg p-1.5 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-white">{node.name}</span>
                                <span className="text-[8px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">{node.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* ----------------- 2. Floating Mobile Device Mockup ----------------- */}
              <div 
                className="absolute right-0 bottom-4 w-[28%] aspect-[9/18.5] bg-[#090D16] rounded-[36px] border-[5px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-20 animate-float-mobile"
                style={{ transform: "translateZ(80px)" }} // Pop out in front of desktop
              >
                {/* Phone screen notch area */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-4 bg-slate-800 rounded-b-xl z-30" />
                
                {/* Screen background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97432]/10 rounded-full blur-xl pointer-events-none" />

                {/* Mobile screen details */}
                <div className="p-3.5 pt-7 flex flex-col gap-4 text-white font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-[10px] font-semibold text-slate-400">Telemetry</span>
                    <span className="text-[9px] text-[#F97432] font-bold uppercase tracking-wider">Live</span>
                  </div>

                  {/* Circular Speed Ring Chart */}
                  <div className="flex flex-col items-center justify-center py-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1e293b" strokeWidth="3" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#F97432" strokeWidth="3.5" fill="transparent" strokeDasharray="176" strokeDashoffset="44" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-xs font-bold leading-none">
                        94ms
                      </span>
                      <span className="text-[6px] text-slate-500 uppercase tracking-widest mt-0.5">Latency</span>
                    </div>
                  </div>

                  {/* Compact statistics rows */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] uppercase font-bold text-slate-500 tracking-wider">Metrics Stream</span>
                    
                    {[
                      { label: "API Hits", val: "142.8", suffix: "k/s" },
                      { label: "Err Rate", val: "0.002", suffix: "%" },
                      { label: "Memory", val: "14.2", suffix: " GB" }
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-2 flex justify-between items-center">
                        <span className="text-[9px] text-slate-400 font-medium">{row.label}</span>
                        <span className="text-[9px] text-white font-mono font-semibold">
                          {row.val}{row.suffix}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
