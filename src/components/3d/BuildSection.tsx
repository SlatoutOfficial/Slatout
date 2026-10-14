"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Plate3D from "./Plate3D";
import { SYSTEM_SERVICES } from "@/data/systemsData";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function BuildSection() {
  const buildRef = useRef<HTMLDivElement>(null);
  const towerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isInBuild, setIsInBuild] = useState<boolean>(false);
  const [hoveredPlate, setHoveredPlate] = useState<number | null>(null);

  // Per-plate dynamic styles state
  const [platesState, setPlatesState] = useState(
    SYSTEM_SERVICES.map(() => ({
      land: 0,
      draw: 0,
      isHot: false,
      isDim: false,
      gap: 34
    }))
  );

  const [towerProps, setTowerProps] = useState({
    cy: "-30px",
    sc: "1",
    rz: "-44deg"
  });


  const N = SYSTEM_SERVICES.length;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateFrame();
          ticking = false;
        });
      }
    };

    const updateFrame = () => {
      if (!buildRef.current) return;
      const vh = window.innerHeight;
      const rect = buildRef.current.getBoundingClientRect();
      const total = buildRef.current.offsetHeight - (vh - 64);
      const progress = clamp(-rect.top / total, 0, 1);

      const inSection = rect.top < vh * 0.5 && rect.bottom > vh * 0.5;
      setIsInBuild(inSection);

      const isMobile = window.innerWidth < 960;
      const t = progress * (N + 1);
      const e = clamp(t - N, 0, 1);
      const gap = 34 + e * (isMobile ? 18 : 40);

      // Update plate calculations
      const newPlates = SYSTEM_SERVICES.map((_, i) => {
        const land = clamp((t - i) / 0.6, 0, 1);
        const draw = clamp((t - i - 0.25) / 0.4, 0, 1);
        const isCurrent = t < N && Math.floor(t) === i;
        const isHot = isCurrent || t >= N;
        const isDim = !isCurrent && t < N && t >= i + 1;
        return { land, draw, isHot, isDim, gap };
      });
      setPlatesState(newPlates);

      // Tower geometry transform
      const h = Math.min(Math.floor(t) + 1, N) * gap;
      const cy = `${h * (isMobile ? 0.2 : 0.25) - 30 + e * (isMobile ? -20 : 46)}px`;
      const sc = (1 - e * (isMobile ? 0.42 : 0.18)).toFixed(3);
      const rz = `${-44 + progress * 22}deg`;
      setTowerProps({ cy, sc, rz });

      // Active panel index
      const act = t >= N ? N : Math.min(Math.floor(t), N - 1);
      setActiveIndex(act);

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateFrame);
    updateFrame();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateFrame);
    };
  }, [N]);

  // Jump directly to service floor via elevator
  const scrollToService = (index: number) => {
    if (!buildRef.current) return;
    const vh = window.innerHeight;
    const top = buildRef.current.getBoundingClientRect().top + window.scrollY;
    const total = buildRef.current.offsetHeight - (vh - 64);
    const targetScroll = top + ((index + 0.5) / (N + 1)) * total;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <div id="services-system" className="relative bg-[#FAF8F5] text-[#171714]">
      {/* ── Section Intro Header ── */}
      {/* <div className="border-t border-gray-200/70 bg-[#FAF8F5] pt-16 pb-12 sm:pt-20 sm:pb-16 relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-[2px] bg-[#FF5500]" />
              <span className="text-[12px] font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em]">
                SYSTEMS ARCHITECTURE
              </span>
            </div>
            <h2 className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-extrabold tracking-[-0.035em] leading-[1.08] text-gray-900">
              Build the entire system.
              <br />
              <span className="text-[#FF5500]">Out of the box.</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-5 leading-relaxed font-light max-w-2xl">
              Growth rarely breaks in one place — it breaks in the gaps between vendors. We connect company foundations, technology, brand, customer acquisition, and compliance into a unified operating engine.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8 text-xs font-mono font-semibold">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                10 INTEGRATED LAYERS
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm text-gray-600">
                SCROLL DOWN TO ASSEMBLE TOWER ↓
              </span>
            </div>
          </div>
        </div>
      </div> */}

      {/* ── 2. Sticky 10-Layer 3D Stacking System (ref={buildRef}) ── */}
      <section
        ref={buildRef}
        className="relative bg-[#FAF8F5] text-[#171714] border-t border-gray-200/70"
        style={{
          height: `calc(${N} * 74vh + 170vh)`
        }}
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-[64px] h-[calc(100vh-64px)] overflow-hidden flex items-center max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] items-center w-full h-full relative">

            {/* Left Column: Redesigned Content Panels */}
            <div className="relative h-full flex items-center pr-0 lg:pr-10">

              {/* Service Step Panels (0 through 9) */}
              {SYSTEM_SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={service.id}
                    className={`absolute left-0 right-0 top-1/2 transition-all duration-500 ease-out ${isActive
                        ? "opacity-100 -translate-y-1/2 pointer-events-auto visible"
                        : "opacity-0 -translate-y-[44%] pointer-events-none invisible"
                      }`}
                  >
                    {/* Layer Progress Indicator: 10 Mini Segment Bars */}
                    <div className="flex items-center gap-1.5 mb-5 max-w-xs">
                      {SYSTEM_SERVICES.map((_, barIdx) => (
                        <div
                          key={barIdx}
                          className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${barIdx <= index
                              ? "bg-[#FF5500] shadow-[0_0_8px_rgba(255,85,0,0.35)]"
                              : "bg-gray-200"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Layer Meta Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/25 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                        <span>LAYER {service.number} / 10</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono tracking-wider text-gray-700 bg-white border border-gray-200/80 uppercase font-semibold shadow-sm">
                        {service.category}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-[clamp(2.1rem,3.6vw,3.4rem)] font-extrabold tracking-[-0.035em] leading-[1.05] text-gray-900 max-w-[13em]">
                      {service.name}
                    </h3>

                    {/* One-Liner Description */}
                    <p className="text-gray-600 text-[clamp(0.95rem,1.2vw,1.15rem)] max-w-xl mt-3.5 leading-relaxed font-normal">
                      {service.oneLiner}
                    </p>

                    {/* 2x2 Structured Deliverables Micro-Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-5 max-w-xl">
                      {service.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#FF5500]/50 hover:shadow-md"
                        >
                          <span className="font-mono text-xs font-bold text-[#FF5500] mt-0.5 shrink-0 bg-[#FF5500]/10 px-1.5 py-0.5 rounded">
                            0{idx + 1}
                          </span>
                          <span className="text-[13px] sm:text-sm font-semibold text-gray-800 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action CTA & Navigation hint */}
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="chamfer-btn inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-900 text-white hover:bg-[#FF5500] text-sm font-bold tracking-wide transition-all duration-300 shadow-sm group"
                      >
                        <span>Explore Layer {service.number} details</span>
                        <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                      <span className="text-xs font-mono text-gray-400 hidden sm:inline-block">
                        Scroll down to stack next layer ↓
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Finale Panel (index = N) */}
              <div
                className={`absolute left-0 right-0 top-1/2 transition-all duration-500 ease-out ${activeIndex === N
                    ? "opacity-100 -translate-y-1/2 pointer-events-auto visible"
                    : "opacity-0 -translate-y-[44%] pointer-events-none invisible"
                  }`}
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                    <span>10/10 LAYERS ASSEMBLED</span>
                  </span>
                  <span className="text-xs font-mono tracking-widest text-[#171714]/55 font-semibold uppercase">
                    COMPLETE BUSINESS STACK
                  </span>
                </div>

                <h3 className="text-[clamp(2.1rem,3.6vw,3.5rem)] font-extrabold tracking-[-0.04em] leading-[1.04] max-w-[12em] text-[#171714]">
                  Ten Layers. One Connected System.
                </h3>

                <p className="text-[#171714]/75 text-[clamp(1rem,1.2vw,1.15rem)] max-w-xl mt-3 leading-relaxed">
                  No fragmented vendors. SLATOUT connects setup, software, brand, growth, and compliance into a scalable operating system.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 max-w-xl max-h-[200px] overflow-y-auto pr-2 scrollbar-none">
                  {SYSTEM_SERVICES.map((s, idx) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      onMouseEnter={() => setHoveredPlate(idx)}
                      onMouseLeave={() => setHoveredPlate(null)}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-[#171714]/10 text-xs sm:text-sm font-semibold transition-all hover:border-[#FF5A1F] hover:bg-white"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[#FF5A1F] font-bold text-xs">{s.number}</span>
                        <span className="truncate text-[#171714]">{s.name}</span>
                      </div>
                      <span className="text-[#FF5A1F] text-xs">→</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#plan-builder"
                    className="chamfer-btn inline-block px-7 py-3.5 bg-[#FF5A1F] text-white font-bold text-sm tracking-wide transition-all hover:bg-[#171714] shadow-md shadow-[#FF5A1F]/20"
                  >
                    Configure Custom Roadmap →
                  </a>
                  <a
                    href="#contact"
                    className="chamfer-btn inline-block px-6 py-3.5 bg-transparent border border-[#171714]/25 text-[#171714] font-bold text-sm tracking-wide transition-all hover:bg-[#171714] hover:text-white"
                  >
                    Talk to an Architect
                  </a>
                </div>
              </div>
            </div>


            {/* Right Column: 3D Isometric Stacking Tower Stage */}
            <div
              className="relative h-full flex items-center justify-center select-none"
              style={{ perspective: "1700px" }}
            >
              {/* Ambient Ember Spotlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(480px circle at 50% 50%, rgba(255, 90, 31, 0.12), transparent 70%)"
                }}
              />

              {/* Isometric Floor Grid */}
              <div className="floor-grid floor-grid-light opacity-60" />

              {/* The 10-Plate Stacking Tower */}
              <div
                ref={towerRef}
                id="b-tw"
                className="relative w-[min(34vw,340px)] aspect-square preserve-3d"
                style={{
                  transform: `translateY(${towerProps.cy}) scale(${towerProps.sc}) rotateX(60deg) rotateZ(${towerProps.rz})`,
                  transition: "transform 0.15s ease-out"
                }}
              >
                {SYSTEM_SERVICES.map((service, index) => {
                  const state = platesState[index] || {
                    land: 0,
                    draw: 0,
                    isHot: false,
                    isDim: false,
                    gap: 34
                  };
                  const isHovered = hoveredPlate === index;

                  return (
                    <Plate3D
                      key={service.id}
                      index={index}
                      artSvg={service.artSvg}
                      gap={state.gap}
                      land={state.land}
                      draw={state.draw}
                      isHot={state.isHot || isHovered}
                      isDim={state.isDim && !isHovered}
                      ty={isHovered ? "12%" : "0%"}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Fixed Floating "Lift" Elevator (right edge) ── */}
        <div
          id="lift"
          className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 transition-opacity duration-300 ${isInBuild ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          {SYSTEM_SERVICES.map((s, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={s.id}
                onClick={() => scrollToService(index)}
                className={`lift-button ${isActive ? "on" : ""}`}
                aria-label={`Jump to floor ${s.number}: ${s.name}`}
              >
                <i />
                <span>
                  {s.number} · {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
