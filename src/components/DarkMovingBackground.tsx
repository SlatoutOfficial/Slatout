"use client";

import React, { useEffect, useRef } from "react";

export default function DarkMovingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking coordinate map
    const mouse = {
      x: 0,
      y: 0,
      active: false,
      radius: 175,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Attach to parent container so it only tracks coordinates within the Hero section bounds
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
      parent.addEventListener("mouseenter", () => { mouse.active = true; });
    }

    // Glowing background color blobs
    const blobs = [
      {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.min(width, height) * 0.65,
        color: "rgba(249, 116, 50, 0.05)", // Slatout Orange
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.min(width, height) * 0.75,
        color: "rgba(99, 102, 241, 0.06)", // Indigo
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.min(width, height) * 0.5,
        color: "rgba(139, 92, 246, 0.04)", // Violet
      },
    ];

    // Constellation Particles
    const particleCount = Math.min(65, Math.floor((width * height) / 16000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.15,
      alpha: 0,
    }));

    // Initialize particle opacity
    particles.forEach(p => p.alpha = p.baseAlpha);

    const drawFrame = () => {
      if (!canvas || !ctx) return;

      // Deep dark canvas background
      ctx.fillStyle = "#09080E";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing background color blobs
      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        // Bounce back from boundaries
        if (b.x < -b.radius * 0.3 || b.x > width + b.radius * 0.3) b.vx *= -1;
        if (b.y < -b.radius * 0.3 || b.y > height + b.radius * 0.3) b.vy *= -1;

        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(0.5, b.color.replace(/[\d.]+\)$/, "0.01)"));
        gradient.addColorStop(1, "rgba(9, 8, 14, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // 2. Draw particle connections (constellation lines)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.11;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connections to interactive mouse pointer
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Magnetic effect: attract particles slightly towards mouse coordinate
            const force = (mouse.radius - dist) / mouse.radius;
            p1.x -= dx * force * 0.018;
            p1.y -= dy * force * 0.018;

            const alpha = (1 - dist / mouse.radius) * 0.2;
            // Draw a thin orange gradient connection
            ctx.strokeStyle = `rgba(249, 116, 50, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Loop boundaries smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
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
