"use client";

import React, { useEffect, useRef } from "react";

export default function HeroTower3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const towerRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ht = towerRef.current;
    if (!ht) return;

    const plates = plateRefs.current.filter(Boolean) as HTMLDivElement[];

    // Initialize plates with --land: 0 and .nt
    plates.forEach((p, i) => {
      p.classList.add("nt");
      p.style.setProperty("--gap", "46px");
      p.style.setProperty("--land", "0");

      const delay = isReduced ? 0 : 350 + i * 260;
      setTimeout(() => {
        p.classList.remove("nt");
        p.style.transition = "transform 1.2s cubic-bezier(0.2, 0.9, 0.2, 1)";
        p.style.setProperty("--land", "1");
        setTimeout(() => {
          p.style.transition = "";
        }, 1300);
      }, delay);
    });

    if (isReduced) return;

    // Mouse / Pointer Parallax & Vertical Expansion Loop
    // Exactly matches SLATOUT — Out of the Box Website Redesign.html lines 448-456:
    // T.s = max(0.1, min(1, 1.1 - d/520))
    // gap = 46 + C.s * 70 (resting ~60px, near-hover ~116px)
    const T = { x: 0, y: 0, s: 0.2 };
    const C = { x: 0, y: 0, s: 0.2 };
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
      T.s = Math.max(0.1, Math.min(1, 1.1 - d / 520));

      if (hero) {
        const hr = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - hr.left}px`);
        hero.style.setProperty("--my", `${e.clientY - hr.top}px`);
      }

      if (!rafId) rafId = requestAnimationFrame(tk);
    };

    const handlePointerLeave = () => {
      T.x = 0;
      T.y = 0;
      T.s = 0.2;
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

      const gapStr = `${(46 + C.s * 70).toFixed(1)}px`;
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

  return (
    <div
      ref={containerRef}
      className="scene relative w-full flex items-center justify-center select-none"
      style={{
        perspective: "1500px",
        minHeight: "min(60svh, 560px)",
      }}
    >
      <div
        ref={towerRef}
        id="hero-tw"
        className="tw hp-tw relative aspect-square preserve-3d"
        style={{
          width: "min(36vw, 340px)",
          transform: `rotateX(calc(58deg + var(--py, 0) * 7deg)) rotateZ(calc(-38deg + var(--px, 0) * 12deg))`,
        }}
      >
        {/* Isometric Floor Grid inside the 3D tower stage matching the original HTML */}
        <div
          className="floor absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: "1800px",
            height: "1800px",
            margin: "-900px 0 0 -900px",
            transform: "translateZ(-6px)",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            WebkitMaskImage: "radial-gradient(closest-side, #000 8%, transparent 68%)",
            maskImage: "radial-gradient(closest-side, #000 8%, transparent 68%)",
          }}
        />

        {/* Plate 0: Low Slab */}
        <div
          ref={(el) => { plateRefs.current[0] = el; }}
          className="pl hp low"
          style={{ "--i": 0, "--gap": "46px", "--land": 0 } as React.CSSProperties}
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

        {/* Plate 1: Mid Slab (Solid Vibrant Orange Ember) */}
        <div
          ref={(el) => { plateRefs.current[1] = el; }}
          className="pl hp mid"
          style={{ "--i": 1, "--gap": "46px", "--land": 0 } as React.CSSProperties}
        >
          <div className="th" style={{ transform: "translateZ(-11.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-9.6px)" }} />
          <div className="th" style={{ transform: "translateZ(-8.0px)" }} />
          <div className="th" style={{ transform: "translateZ(-6.4px)" }} />
          <div className="th" style={{ transform: "translateZ(-4.8px)" }} />
          <div className="th" style={{ transform: "translateZ(-3.2px)" }} />
          <div className="th" style={{ transform: "translateZ(-1.6px)" }} />
          <div className="fc flex items-center justify-center p-6">
            <img
              src="/images/logo.png"
              alt="Slatout Logo"
              className="w-full h-full max-w-[150px] max-h-[150px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] filter brightness-0 invert pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Plate 2: Top Slab */}
        <div
          ref={(el) => { plateRefs.current[2] = el; }}
          className="pl hp top"
          style={{ "--i": 2, "--gap": "46px", "--land": 0 } as React.CSSProperties}
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
      </div>
    </div>
  );
}
