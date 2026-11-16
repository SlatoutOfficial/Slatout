"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  TrendingUp,
  PenTool,
  Cloud,
  ShieldCheck,
  Database,
  Bot,
  LineChart,
  type LucideIcon,
} from "lucide-react";

type Face = { title: string; desc: string; Icon: LucideIcon };

const FACES: Face[] = [
  { title: "Development", desc: "Custom web, mobile & cloud software.", Icon: Code2 },
  { title: "Growth Marketing", desc: "Performance ads & brand scaling.", Icon: TrendingUp },
  { title: "UI/UX Design", desc: "Stunning, high-conversion design.", Icon: PenTool },
  { title: "Cloud Native", desc: "Secure hosting & devops setup.", Icon: Cloud },
  { title: "Cybersecurity", desc: "Systems shielding & code audits.", Icon: ShieldCheck },
  { title: "Data Platform", desc: "Modern analytics pipelines.", Icon: Database },
  { title: "AI Automation", desc: "Intelligent chatbot & workflow bots.", Icon: Bot },
  { title: "Analytics", desc: "BI & growth funnel tracking.", Icon: LineChart },
];

const W = 178;           // Width of carousel cards
const H = 265;           // Height of carousel cards
const R = 235;           // Radius of the carousel circle

function FaceContent({ face, isActive }: { face: Face; isActive: boolean }) {
  const { Icon } = face;
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 p-5"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-[#F97432] text-white shadow-[0_4px_12px_rgba(249,116,50,0.2)]" 
          : "bg-[#F97432]/10 text-[#F97432] border border-[#F97432]/15 shadow-[0_4px_12px_rgba(249,116,50,0.08)]"
      }`}>
        <Icon className="h-7 w-7" strokeWidth={2} />
      </div>
      
      <div className="flex flex-col items-center gap-2 mt-1">
        <span className="text-[13px] font-extrabold uppercase tracking-wider text-gray-800 text-center select-none max-w-[175px] leading-snug">
          {face.title}
        </span>
        <span className={`text-[11px] text-gray-500 text-center select-none max-w-[170px] leading-tight transition-all duration-300 ${
          isActive ? "opacity-100 max-h-[60px] scale-100" : "opacity-0 max-h-0 scale-95 overflow-hidden"
        }`}>
          {face.desc}
        </span>
      </div>
    </div>
  );
}

function CarouselCard({
  face,
  transform,
  opacity,
  scale,
  isActive,
}: {
  face: Face;
  transform: string;
  opacity: number;
  scale: number;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: W,
        height: H,
        marginLeft: -W / 2,
        marginTop: -H / 2,
        transformOrigin: "50% 50%",
        transform: `${transform} scale(${scale * (hovered ? 1.06 : 1)})`,
        transformStyle: "preserve-3d",
        opacity: opacity,
        transition: "opacity 0.25s ease, transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
        pointerEvents: opacity < 0.3 ? "none" : "auto",
        backfaceVisibility: "hidden",
        zIndex: hovered ? 50 : (isActive ? 40 : 10),
      }}
    >
      <div
        className="relative h-full w-full rounded-2xl border transition-all duration-300 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)",
          borderColor: hovered
            ? "#1A1A24"
            : (isActive ? "rgba(249, 116, 50, 0.35)" : "rgba(0, 0, 0, 0.05)"),
          boxShadow: hovered
            ? "0 20px 40px -8px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
            : (isActive
                ? "0 15px 35px -8px rgba(249, 116, 50, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)"),
        }}
      >
        <div className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${
          hovered ? "border-black/[0.03]" : "border-white/40"
        }`} />
        <FaceContent face={face} isActive={isActive || hovered} />
      </div>
    </div>
  );
}

export default function ServiceCube() {
  const [rot, setRot] = useState({ x: -10, y: 0 });
  const [activeFace, setActiveFace] = useState(0);

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const auto = useRef(true);
  const stepRef = useRef(0);
  const rotRef = useRef({ x: -10, y: 0 });
  const autoTimeoutRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    rotRef.current = rot;
  }, [rot]);

  useEffect(() => {
    return () => {
      if (autoTimeoutRef.current) window.clearTimeout(autoTimeoutRef.current);
    };
  }, []);

  // Slide transition interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (auto.current && !dragging.current) {
        stepRef.current += 1;
        setActiveFace(((stepRef.current % 8) + 8) % 8);
      }
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Interpolation loop
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setRot((r) => {
        if (auto.current) {
          const targetY = -stepRef.current * 45; // 45 degrees per step for 8 faces
          const newY = r.y + (targetY - r.y) * 0.075;
          return { x: -10, y: newY };
        }
        return r;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const start = (x: number, y: number) => {
    dragging.current = true;
    auto.current = false;
    last.current = { x, y };
  };

  const move = (x: number, y: number) => {
    if (!dragging.current) return;
    const dx = x - last.current.x;
    last.current = { x, y };
    setRot((r) => ({
      x: -10,
      y: r.y + dx * 0.4,
    }));
  };

  const end = () => {
    dragging.current = false;
    const currentY = rotRef.current.y;
    // Snap to the closest 45 degree step
    const closestStep = Math.round(-currentY / 45);
    stepRef.current = closestStep;
    setActiveFace(((closestStep % 8) + 8) % 8);

    if (autoTimeoutRef.current) window.clearTimeout(autoTimeoutRef.current);
    autoTimeoutRef.current = window.setTimeout(() => {
      if (!dragging.current) auto.current = true;
    }, 2000);
  };

  return (
    <>
      <style>{`
        @keyframes slat-spin-ring {
          from { transform: rotateX(75deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateZ(360deg); }
        }
      `}</style>
      <div
        className="relative mx-auto flex h-[620px] w-full max-w-[620px] cursor-grab select-none items-center justify-center active:cursor-grabbing"
        style={{ perspective: "1100px" }}
        onMouseDown={(e) => start(e.clientX, e.clientY)}
        onMouseMove={(e) => move(e.clientX, e.clientY)}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) start(t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) move(t.clientX, t.clientY);
        }}
        onTouchEnd={end}
      >
        {/* ambient glow */}
        <div className="pointer-events-none absolute h-[660px] w-[660px] rounded-full bg-[#F97432]/20 blur-[140px]" />



        {/* 3D Carousel Container */}
        <div style={{ transformStyle: "preserve-3d" }}>
          <div
            className="relative"
            style={{
              width: W,
              height: H,
              transformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            }}
          >
            {FACES.map((face, i) => {
              // Calculate relative Y rotation angle of card i relative to the camera view (0 deg)
              let relativeAngle = (rot.y + i * 45) % 360;
              if (relativeAngle > 180) relativeAngle -= 360;
              if (relativeAngle < -180) relativeAngle += 360;
              const absAngle = Math.abs(relativeAngle);

              // Fade out and scale down cards as they rotate away from front stage
              let opacity = 0;
              let scale = 0.8;

              if (absAngle < 90) {
                // Front half of the carousel ring (fully visible in front, fading on sides)
                const ratio = Math.cos(absAngle * Math.PI / 180);
                opacity = 0.2 + 0.8 * ratio;
                scale = 0.8 + 0.2 * ratio;
              } else {
                // Back half of the carousel (completely hidden to avoid backward/reversed text showing)
                opacity = 0;
                scale = 0.8;
              }

              return (
                <CarouselCard
                  key={face.title}
                  face={face}
                  transform={`rotateY(${i * 45}deg) translateZ(${R}px)`}
                  opacity={opacity}
                  scale={scale}
                  isActive={((activeFace % 8) + 8) % 8 === i}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation Dots (8 Services) */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-30">
          {Array.from({ length: 8 }).map((_, i) => {
            const isActive = ((activeFace % 8) + 8) % 8 === i;
            return (
              <button
                key={i}
                onClick={() => {
                  auto.current = false;
                  const currentActiveIndex = ((stepRef.current % 8) + 8) % 8;
                  let diff = i - currentActiveIndex;
                  if (diff > 4) diff -= 8;
                  if (diff < -4) diff += 8;
                  
                  stepRef.current += diff;
                  setActiveFace(i);
                  
                  if (autoTimeoutRef.current) window.clearTimeout(autoTimeoutRef.current);
                  autoTimeoutRef.current = window.setTimeout(() => {
                    auto.current = true;
                  }, 4000);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "w-6 bg-[#F97432]" 
                    : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>

        <span className="pointer-events-none absolute bottom-8 text-[9px] uppercase tracking-widest text-zinc-400 font-bold opacity-80">
          Drag to explore
        </span>
      </div>
    </>
  );
}
