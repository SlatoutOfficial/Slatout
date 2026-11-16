"use client";

import React from "react";
import { ArrowUpRight, Play, Users, BarChart3 } from "lucide-react";
import { FadeUp, SlideIn } from "./Motion";

export default function HeroLight() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-24 pb-12 overflow-hidden selection:bg-[#F97432] selection:text-white">

      {/* Background radial gradient to give a very subtle depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F97432]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

        {/* LEFT COLUMN: Typography and CTA */}
        <div className="flex flex-col items-start pr-0 lg:pr-12">

          <FadeUp delay={0.1}>
            <h1 className="text-[48px] sm:text-[64px] lg:text-[76px] font-bold text-[#1A1A24] leading-[1.05] tracking-tight">
              Turn Clicks into <br /> Conversions
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-gray-500 text-lg sm:text-xl max-w-[500px] mt-6 leading-relaxed">
              With Slatout, master the art of online persuasion as we harness data, creativity, and technology to transform your digital engagement strategy.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="mt-10 flex items-center gap-6">
              <button className="bg-[#F97432] hover:bg-[#F97432] text-white px-8 py-3.5 rounded-2xl font-semibold transition-colors shadow-[0_8px_20px_rgba(249,116,50,0.25)] hover:shadow-[0_12px_25px_rgba(249,116,50,0.35)] duration-300">
                Start Now
              </button>

              <button className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#1A1A24] rounded-xl flex items-center justify-center text-white group-hover:bg-[#F97432] transition-colors duration-300">
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <span className="text-gray-500 font-medium group-hover:text-gray-900 transition-colors">
                  Learn more
                </span>
              </button>
            </div>
          </FadeUp>

          {/* Powered by logos */}
          <FadeUp delay={0.7}>
            <div className="mt-16 sm:mt-24">
              <p className="text-gray-400 text-sm mb-5">Powered by</p>
              <div className="flex items-center gap-6 sm:gap-10 flex-wrap opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="font-bold text-gray-700 text-xl tracking-tight flex items-center gap-1.5"><span className="w-4 h-4 bg-[#F97432] rounded-sm block" /> UrbaNest</div>
                <div className="font-bold text-gray-700 text-xl tracking-tight flex items-center gap-1.5"><span className="w-4 h-4 rounded-full border-2 border-[#F97432] block" /> Mountana</div>
                <div className="font-bold text-gray-700 text-xl tracking-tight">FactFix</div>
                <div className="font-bold text-gray-700 text-xl tracking-tight flex items-center gap-1.5"><span className="w-4 h-4 bg-[#F97432] rotate-45 block" /> Log Trans</div>
              </div>
            </div>
          </FadeUp>

        </div>

        {/* RIGHT COLUMN: Bento Grid Collage */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[650px]">
          <SlideIn direction="right" delay={0.2} className="w-full h-full relative">

            {/* Top Left Orange Card */}
            <div className="absolute top-0 left-0 w-[42%] h-[48%] bg-[#F97432] rounded-[32px] p-6 flex flex-col justify-between text-white shadow-lg overflow-hidden">
              {/* Fake Avatars */}
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#F97432] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-[#F97432] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-[#F97432] object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="User 3" />
              </div>
              <div>
                <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-1">124K+</h3>
                <p className="text-white/80 text-[13px] leading-tight max-w-[120px]">More than 2,000 people has joined us</p>
              </div>
            </div>

            {/* Middle Left Orange Card (Growth) */}
            <div className="absolute top-[52%] left-0 w-[42%] h-[20%] bg-[#F97432] rounded-[24px] p-5 flex items-center justify-between text-white shadow-lg overflow-hidden group">
              <div className="flex flex-col justify-center h-full">
                <span className="text-[14px] font-semibold leading-tight max-w-[80px]">Successful growth</span>
              </div>
              <div className="w-16 h-full relative">
                {/* Abstract Graph */}
                <div className="absolute bottom-0 left-0 w-3 h-[40%] bg-white/40 rounded-t-sm" />
                <div className="absolute bottom-0 left-4 w-3 h-[70%] bg-white/70 rounded-t-sm" />
                <div className="absolute bottom-0 left-8 w-3 h-[100%] bg-white rounded-t-sm" />
                <ArrowUpRight className="absolute top-0 right-0 text-white/50 group-hover:text-white transition-colors" size={24} />
              </div>
            </div>

            {/* Top Right Vertical Image */}
            <div className="absolute top-0 right-[15%] w-[40%] h-[58%] rounded-[32px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                alt="Professional Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Wide Image */}
            <div className="absolute bottom-4 left-0 w-[85%] h-[24%] rounded-[32px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Video Circle */}
            <div className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#1A1A24] border-8 border-white flex items-center justify-center shadow-xl z-20 cursor-pointer group hover:scale-105 transition-transform duration-300">
              {/* Circular Text (Approximated with absolute positioning or SVG. Using simple text for now) */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="text-[9.5px] font-bold fill-white uppercase tracking-widest">
                  <textPath href="#circlePath" startOffset="0%">
                    Watch Video • Of Our Action •
                  </textPath>
                </text>
              </svg>
              <div className="w-10 h-10 rounded-full bg-[#F97432] flex items-center justify-center text-white relative z-10 group-hover:bg-white group-hover:text-[#F97432] transition-colors">
                <Play fill="currentColor" size={16} className="ml-1" />
              </div>
            </div>

            {/* Floating Stat Widget 1 */}
            <div className="absolute top-[35%] right-0 w-[140px] bg-[#1A1A24] rounded-2xl p-4 shadow-2xl z-20 transform translate-x-4">
              <span className="text-white/70 text-[11px] font-medium leading-none block mb-1">satisfied rate</span>
              <span className="text-[#F97432] text-2xl font-bold tracking-tight">98%</span>
            </div>

            {/* Floating Stat Widget 2 */}
            <div className="absolute top-[52%] right-0 w-[140px] bg-[#1A1A24] rounded-2xl p-4 shadow-2xl z-20 transform translate-x-4">
              <span className="text-white/70 text-[11px] font-medium leading-none block mb-1">successful projects</span>
              <span className="text-[#F97432] text-2xl font-bold tracking-tight">14K</span>
            </div>

            {/* Floating Stat Widget 3 */}
            <div className="absolute top-[69%] right-0 w-[140px] bg-[#1A1A24] rounded-2xl p-4 shadow-2xl z-20 transform translate-x-4">
              <span className="text-white/70 text-[11px] font-medium leading-none block mb-1">clients served</span>
              <span className="text-[#F97432] text-2xl font-bold tracking-tight">5,8K</span>
            </div>

          </SlideIn>
        </div>

      </div>
    </section>
  );
}
