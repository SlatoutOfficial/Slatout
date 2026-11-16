"use client";

import React, { useEffect, useRef, useState } from "react";
import { SYSTEM_SERVICES, SystemService } from "@/data/systemsData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroTower3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const towerRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Default to Service 02: Technology & AI Solutions (matching user reference screenshot)
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(1);
  const currentService: SystemService = SYSTEM_SERVICES[activeServiceIdx] || SYSTEM_SERVICES[1];

  // Set pathLength="1" on all SVG children so stroke-dashoffset works identically to the original
  useEffect(() => {
    if (svgRef.current) {
      const elements = svgRef.current.querySelectorAll("path, rect, circle, line, polyline, polygon");
      elements.forEach((el) => {
        el.setAttribute("pathLength", "1");
      });
    }

    // Trigger stroke draw animation (0 to 1 over 1.2s)
    const topPlate = plateRefs.current[2];
    if (topPlate) {
      topPlate.style.setProperty("--draw", "0");
      let start: number | null = null;
      let frameId: number | null = null;

      const step = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / 1200);
        topPlate.style.setProperty("--draw", progress.toFixed(3));
        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      };
      frameId = requestAnimationFrame(step);
      return () => {
        if (frameId) cancelAnimationFrame(frameId);
      };
    }
  }, [activeServiceIdx]);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ht = towerRef.current;
    if (!ht) return;

    const plates = plateRefs.current.filter(Boolean) as HTMLDivElement[];

    // Set initial landing state
    plates.forEach((p) => {
      p.style.setProperty("--land", "1");
      p.style.setProperty("--gap", "58px");
    });

    if (isReduced) return;

    // Mouse / Pointer Parallax & Proximity Hover Expansion Loop
    // Matches original SLATOUT sh-scene:
    // gap = 58 + C.s * 46px (resting 58px -> close hover 104px)
    const T = { x: 0, y: 0, s: 0 };
    const C = { x: 0, y: 0, s: 0 };
    let rafId: number | null = null;

    const hero = document.getElementById("hero") || containerRef.current?.closest("section") || document.body;

    const handlePointerMove = (e: PointerEvent) => {
      if (!ht) return;
      const r = ht.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);

      T.x = Math.max(-1, Math.min(1, ((e.clientX - cx) / window.innerWidth) * 2.6));
      T.y = Math.max(-1, Math.min(1, ((e.clientY - cy) / window.innerHeight) * 2.6));
      T.s = Math.max(0, Math.min(1, 1.1 - d / 520));

      if (!rafId) rafId = requestAnimationFrame(tk);
    };

    const handlePointerLeave = () => {
      T.x = 0;
      T.y = 0;
      T.s = 0;
      if (!rafId) rafId = requestAnimationFrame(tk);
    };

    function tk() {
      C.x += (T.x - C.x) * 0.12;
      C.y += (T.y - C.y) * 0.12;
      C.s += (T.s - C.s) * 0.1;

      if (ht) {
        ht.style.setProperty("--px", C.x.toFixed(3));
        ht.style.setProperty("--py", C.y.toFixed(3));
      }

      const gapStr = `${(58 + C.s * 46).toFixed(1)}px`;
      plates.forEach((p) => {
        p.style.setProperty("--gap", gapStr);
      });

      const delta = Math.abs(T.x - C.x) + Math.abs(T.y - C.y) + Math.abs(T.s - C.s);
      if (delta > 0.003) {
        rafId = requestAnimationFrame(tk);
      } else {
        rafId = null;
      }
    }

    hero.addEventListener("pointermove", handlePointerMove as EventListener);
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("pointermove", handlePointerMove as EventListener);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveServiceIdx((prev) => (prev - 1 + SYSTEM_SERVICES.length) % SYSTEM_SERVICES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveServiceIdx((prev) => (prev + 1) % SYSTEM_SERVICES.length);
  };

  return (
    <div
      ref={containerRef}
      className="sh-scene relative w-full flex flex-col items-center justify-center select-none"
      style={{
        perspective: "1500px",
        minHeight: "min(62svh, 560px)",
      }}
    >
      {/* 3D Isometric Service Tower Stage */}
      <div
        ref={towerRef}
        id="sh-tw"
        className="tw relative aspect-square preserve-3d"
        style={{
          width: "min(34vw, 330px)",
          transform: `translateY(calc(var(--py, 0) * 12px)) rotateX(calc(60deg + var(--py, 0) * 7deg)) rotateZ(calc(-40deg + var(--px, 0) * 12deg))`,
        }}
      >
        {/* Isometric 3D Floor Grid Plane */}
        <div
          className="floor absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: "1800px",
            height: "1800px",
            margin: "-900px 0 0 -900px",
            transform: "translateZ(-6px)",
          }}
        />

        {/* Plate 0: Base dim foundation slab */}
        <div
          ref={(el) => { plateRefs.current[0] = el; }}
          className="pl dim"
          style={{ "--i": 0, "--gap": "58px", "--land": 1 } as React.CSSProperties}
        >
          <div className="th" style={{ transform: "translateZ(-11.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-9.6px)" }} />
          <div className="th" style={{ transform: "translateZ(-8.0px)" }} />
          <div className="th" style={{ transform: "translateZ(-6.4px)" }} />
          <div className="th" style={{ transform: "translateZ(-4.8px)" }} />
          <div className="th" style={{ transform: "translateZ(-3.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-1.6px)" }} />
          <div className="fc" />
        </div>

        {/* Plate 1: Middle dim layer slab */}
        <div
          ref={(el) => { plateRefs.current[1] = el; }}
          className="pl dim"
          style={{ "--i": 1, "--gap": "58px", "--land": 1 } as React.CSSProperties}
        >
          <div className="th" style={{ transform: "translateZ(-11.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-9.6px)" }} />
          <div className="th" style={{ transform: "translateZ(-8.0px)" }} />
          <div className="th" style={{ transform: "translateZ(-6.4px)" }} />
          <div className="th" style={{ transform: "translateZ(-4.8px)" }} />
          <div className="th" style={{ transform: "translateZ(-3.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-1.6px)" }} />
          <div className="fc" />
        </div>

        {/* Plate 2: Top HOT Active Service Slab with SVG Artwork */}
        <div
          ref={(el) => { plateRefs.current[2] = el; }}
          className="pl hot"
          style={{ "--i": 2, "--gap": "58px", "--land": 1, "--draw": 1 } as React.CSSProperties}
        >
          <div className="th" style={{ transform: "translateZ(-11.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-9.6px)" }} />
          <div className="th" style={{ transform: "translateZ(-8.0px)" }} />
          <div className="th" style={{ transform: "translateZ(-6.4px)" }} />
          <div className="th" style={{ transform: "translateZ(-4.8px)" }} />
          <div className="th" style={{ transform: "translateZ(-3.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-1.6px)" }} />
          <div className="fc">
            <svg
              ref={svgRef}
              className="art"
              viewBox="0 0 200 200"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: currentService.artSvg }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Service Floor Controller Badge */}
      <div className="relative z-30 mt-8 flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg">
        <button
          onClick={handlePrev}
          aria-label="Previous service"
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2 px-1 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span className="text-[#FF5A1F] font-bold">{currentService.number}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/70 uppercase tracking-wider font-medium truncate max-w-[170px] sm:max-w-[220px]">
            {currentService.name}
          </span>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next service"
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
