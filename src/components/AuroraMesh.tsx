"use client";

import React, { useEffect, useRef } from "react";

export default function AuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Rainbow Aurora palette containing premium soft glows
    const colors = [
      { r: 242, g: 101, b: 34 },  // #F26522 Slatout Orange
      { r: 138, g: 43, b: 226 },  // BlueViolet
      { r: 0, g: 191, b: 255 },    // DeepSkyBlue
      { r: 50, g: 205, b: 50 },    // LimeGreen
      { r: 255, g: 215, b: 0 }     // Gold
    ];

    // Create moving point hubs for the mesh effect
    const points = colors.map((c) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.min(canvas.width, canvas.height) * (0.65 + Math.random() * 0.35),
      color: `rgba(${c.r}, ${c.g}, ${c.b}, 0.16)`
    }));

    const drawFrame = () => {
      if (!canvas || !ctx) return;

      // Draw light gray base color
      ctx.fillStyle = "#EFEFEF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move points and paint overlapping radial gradients
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas margins
        if (p.x < -p.radius * 0.2 || p.x > canvas.width + p.radius * 0.2) p.vx *= -1;
        if (p.y < -p.radius * 0.2 || p.y > canvas.height + p.radius * 0.2) p.vy *= -1;

        // Radial gradient representing a color blob
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color.replace("0.16", "0.08"));
        gradient.addColorStop(1, "rgba(239, 239, 239, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
