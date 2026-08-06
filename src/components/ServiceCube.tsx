"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, TrendingUp, Layers, Cpu, Compass, BarChart3 } from "lucide-react";
import { TextCta } from "./CtaSystem";

// Service list matching the 6 sides, branded with Slatout's Charcoal-Black and Orange theme
const cubeServices = [
  {
    title: "Development",
    sub: "Web & Mobile Apps",
    gradient: "from-gray-950 via-gray-900 to-black",
    icon: Terminal,
    accentColor: "text-[#F26522]",
    borderColor: "border-white/10"
  },
  {
    title: "Growth Marketing",
    sub: "Acquisition & SEO",
    gradient: "from-[#111111] via-[#1a1a1a] to-black",
    icon: TrendingUp,
    accentColor: "text-[#F26522]",
    borderColor: "border-[#F26522]/30"
  },
  {
    title: "UI/UX Design",
    sub: "Product Interfaces",
    gradient: "from-gray-950 via-[#181818] to-black",
    icon: Layers,
    accentColor: "text-[#F26522]",
    borderColor: "border-white/10"
  },
  {
    title: "AI & Automation",
    sub: "Workflows & Agents",
    gradient: "from-[#0d0d0d] via-gray-900 to-black",
    icon: Cpu,
    accentColor: "text-[#F26522]",
    borderColor: "border-[#F26522]/30"
  },
  {
    title: "Brand Strategy",
    sub: "Identity Systems",
    gradient: "from-gray-950 via-[#1c1c1c] to-black",
    icon: Compass,
    accentColor: "text-[#F26522]",
    borderColor: "border-white/10"
  },
  {
    title: "Data & Analytics",
    sub: "Conversion Metrics",
    gradient: "from-[#121212] via-gray-900 to-black",
    icon: BarChart3,
    accentColor: "text-[#F26522]",
    borderColor: "border-[#F26522]/30"
  }
];

export default function ServiceCube() {
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const [translateZ, setTranslateZ] = useState(140); // responsive translateZ distance
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotX = useRef(-20);
  const startRotY = useRef(35);
  const animationFrameId = useRef<number | null>(null);
  const lastActivityTime = useRef<number>(Date.now());

  // Handle responsive translation depth
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTranslateZ(110); // 220px width cube
      } else if (window.innerWidth < 1024) {
        setTranslateZ(130); // 260px width cube
      } else {
        setTranslateZ(160); // 320px width cube
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global mousemove/mouseup to prevent cursor sticking outside canvas
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      lastActivityTime.current = Date.now();

      const deltaX = e.clientX - startX.current;
      const deltaY = e.clientY - startY.current;

      const nextRotY = startRotY.current + deltaX * 0.4;
      const nextRotX = startRotX.current - deltaY * 0.4;

      setRotation({
        x: Math.max(-80, Math.min(80, nextRotX)), // Clamp tilt to prevent inversion
        y: nextRotY
      });
    };

    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // Global touchmove/touchend for mobile
  useEffect(() => {
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      lastActivityTime.current = Date.now();

      const deltaX = e.touches[0].clientX - startX.current;
      const deltaY = e.touches[0].clientY - startY.current;

      const nextRotY = startRotY.current + deltaX * 0.4;
      const nextRotX = startRotX.current - deltaY * 0.4;

      setRotation({
        x: Math.max(-80, Math.min(80, nextRotX)),
        y: nextRotY
      });
    };

    const handleGlobalTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
    window.addEventListener("touchend", handleGlobalTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  // Slowly auto-rotate the cube when user is inactive
  useEffect(() => {
    const autoSpin = () => {
      const timeSinceActive = Date.now() - lastActivityTime.current;
      if (!isDragging.current && timeSinceActive > 1500) {
        setRotation((prev) => ({
          x: prev.x + Math.sin(Date.now() * 0.001) * 0.05, // Subtle bounce on X
          y: prev.y + 0.15 // Constant slow spin on Y
        }));
      }
      animationFrameId.current = requestAnimationFrame(autoSpin);
    };

    animationFrameId.current = requestAnimationFrame(autoSpin);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    startRotX.current = rotation.x;
    startRotY.current = rotation.y;
    lastActivityTime.current = Date.now();
  };

  return (
    <div className="flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing w-full h-[320px] sm:h-[380px] lg:h-[480px]">
      
      {/* 3D Perspective Wrapper */}
      <div 
        className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] relative animate-float-gentle"
        style={{ 
          perspective: "1000px",
          WebkitPerspective: "1000px",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d"
        }}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      >
        
        {/* Cube Assembly */}
        <div
          className="w-full h-full absolute transition-transform duration-100 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            WebkitTransform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
        >
          {cubeServices.map((service, idx) => {
            // Determine the 3D transform for each of the 6 sides
            let transformString = "";
            switch (idx) {
              case 0: // Front
                transformString = `rotateY(0deg) translateZ(${translateZ}px)`;
                break;
              case 1: // Right
                transformString = `rotateY(90deg) translateZ(${translateZ}px)`;
                break;
              case 2: // Back
                transformString = `rotateY(180deg) translateZ(${translateZ}px)`;
                break;
              case 3: // Left
                transformString = `rotateY(-90deg) translateZ(${translateZ}px)`;
                break;
              case 4: // Top
                transformString = `rotateX(90deg) translateZ(${translateZ}px)`;
                break;
              case 5: // Bottom
                transformString = `rotateX(-90deg) translateZ(${translateZ}px)`;
                break;
            }

            const IconComponent = service.icon;

            return (
              <div
                key={idx}
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} ${service.borderColor} rounded-none border p-5 sm:p-6 flex flex-col justify-between text-white shadow-2xl overflow-hidden`}
                style={{
                  transform: transformString,
                  WebkitTransform: transformString,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Backface glow */}
                <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-white/5 rounded-full blur-xl pointer-events-none" />

                {/* Top Row: Subtext */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/60">
                    {service.sub}
                  </span>
                  <span className="text-[10px] font-bold text-white/30">
                    0{idx + 1}
                  </span>
                </div>

                {/* Middle Row: Large Icon with Orange Drop Shadow */}
                <div className="flex justify-center items-center py-3">
                  <IconComponent className={`w-12 h-12 sm:w-16 sm:h-16 stroke-[1.2] ${service.accentColor} filter drop-shadow-[0_0_15px_rgba(242,101,34,0.35)]`} />
                </div>

                {/* Bottom Row: Title */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="type-card-title text-[18px] sm:text-[22px] text-white">
                    {service.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-white/40 font-semibold tracking-widest uppercase">
                    Slatout Services
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Redesigned Text Design & Small CTA Row */}
      <div className="flex items-center gap-3.5 mt-6 text-[11px] sm:text-[12px] font-medium tracking-wide">
        {/* Drag Indicator Badge */}
        <span className="text-gray-500 flex items-center gap-1.5 opacity-80">
          <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1" />
          </svg>
          Drag to Interact
        </span>
        
        {/* Elegant Minimal Divider */}
        <div className="w-[1px] h-3 bg-gray-300" />
        
        <TextCta href="#services" className="!text-[11px] sm:!text-[12px]">
          Explore services
        </TextCta>
      </div>
    </div>
  );
}
