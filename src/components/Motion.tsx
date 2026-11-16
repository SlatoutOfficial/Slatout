"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// 1. Simple fade-up heading (Apple/Stripe style)
export function WordRevealHeading({
  text,
  className = "",
  as: Tag = "h2"
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // easeOutExpo
      }}
      className={className}
    >
      {text}
    </MotionTag>
  );
}

// 2. Soft upward fade for paragraphs or blocks
export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.5
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Staggered Grid Container for cards
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.05
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Stagger Child item (e.g. for card fade-ups)
export function StaggerChild({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const childVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] // easeOutExpo
      }
    }
  };

  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}

// 5. Scale In animation (for badges, icons)
export function ScaleIn({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.98
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Snappy Interactive Count Up component
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const numericString = value.replace(/[^0-9.]/g, "");
  const targetNumber = parseFloat(numericString);
  const suffix = value.replace(/[0-9.,]/g, "");
  const hasComma = value.includes(",");
  const decimalPlaces = (numericString.split(".")[1] || "").length;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 150, // much faster settle
  });

  const [currentDisplay, setCurrentDisplay] = useState("0");

  useEffect(() => {
    if (inView && !isNaN(targetNumber)) {
      motionValue.set(targetNumber);
    }
  }, [inView, targetNumber, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      let formatted = latest.toFixed(decimalPlaces);
      if (hasComma) {
        const parts = formatted.split(".");
        parts[0] = Math.floor(parseFloat(parts[0])).toLocaleString();
        formatted = parts.join(".");
      }
      setCurrentDisplay(formatted + suffix);
    });
  }, [springValue, decimalPlaces, hasComma, suffix]);

  return <span ref={ref} className="tabular-nums">{currentDisplay}</span>;
}

// 8. Slide In (Left/Right)
export function SlideIn({ children, direction = "left", delay = 0, className = "" }: { children: React.ReactNode, direction?: "left" | "right", delay?: number, className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const xOffset = direction === "left" ? -60 : 60;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
