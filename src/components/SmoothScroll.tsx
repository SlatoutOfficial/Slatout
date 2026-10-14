"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(true);

  // Thin, glowing scroll progress bar fixed at the top of the screen
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollRef = useRef({
    target: 0,
    current: 0,
    ease: 0.08, // Controls the scroll momentum smoothness (lower is smoother)
    isMoving: false
  });

  useEffect(() => {
    // Only run on desktop/non-touch viewports
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const mobileQuery = window.innerWidth < 1024;
    setIsMobile(isTouch || mobileQuery);

    if (isTouch || mobileQuery) return;

    const scrollState = scrollRef.current;
    
    // Sync initial scroll state
    scrollState.current = window.scrollY;
    scrollState.target = window.scrollY;

    const onWheel = (e: WheelEvent) => {
      // Prevent the browser's default abrupt jump
      e.preventDefault();
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.target = Math.max(0, Math.min(maxScroll, scrollState.target + e.deltaY));

      if (!scrollState.isMoving) {
        scrollState.isMoving = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = scrollState.target - scrollState.current;
      scrollState.current += diff * scrollState.ease;

      // Scroll the actual window to trigger native position:sticky layouts
      window.scrollTo(0, scrollState.current);

      if (Math.abs(diff) > 0.5) {
        requestAnimationFrame(updateScroll);
      } else {
        scrollState.isMoving = false;
        scrollState.current = scrollState.target;
      }
    };

    // Listen to manual scrolling (scrollbar drag, arrow keys) to keep states synced
    const onScroll = () => {
      if (!scrollState.isMoving) {
        scrollState.current = window.scrollY;
        scrollState.target = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#F97432] origin-left z-[9999] pointer-events-none shadow-[0_0_8px_#F97432]"
      />
      <div className="w-full relative">{children}</div>
    </>
  );
}
