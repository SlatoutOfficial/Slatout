"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "1",
    title: "Tell us where you are",
    description:
      "Share your stage and what you need. The enquiry form takes a minute and commits you to nothing.",
  },
  {
    number: "2",
    title: "We suggest a starting point",
    description:
      "We recommend which service to begin with, and what can wait, based on your situation.",
  },
  {
    number: "3",
    title: "Scope is agreed up front",
    description:
      "Deliverables, responsibilities and reporting are agreed before work starts, so you know what you are getting.",
  },
  {
    number: "4",
    title: "We build and run it",
    description:
      "The relevant SLATOUT service plans and executes the work, following its own step-by-step approach.",
  },
  {
    number: "5",
    title: "You add the next layer",
    description:
      "When you are ready, add the next service. They are designed to connect.",
  },
];

export default function ProcessTrack() {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const manualRef = useRef(false);

  // Set progress clamped between 0 and 1
  const updateProgress = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    setProgress(clamped);
  }, []);

  // Update progress based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (manualRef.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Calculate scroll fraction through the track
      const p = (windowH * 0.78 - rect.top) / (windowH * 0.55 + rect.height * 0.3);
      updateProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateProgress]);

  // Scrub tracking via pointer on track line
  const handlePointerFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lineRef.current) return;
    const rect = lineRef.current.getBoundingClientRect();
    const isVertical = rect.height > rect.width;
    const p = isVertical
      ? (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width;
    updateProgress(p);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    manualRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handlePointerFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handlePointerFromEvent(e);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      manualRef.current = false;
    }, 1500);
  };

  // Jump to specific step on click
  const handleStepClick = (index: number) => {
    manualRef.current = true;
    const p = STEPS.length > 1 ? index / (STEPS.length - 1) : 0;
    updateProgress(p);
    setTimeout(() => {
      manualRef.current = false;
    }, 1500);
  };

  const numSteps = STEPS.length;

  return (
    <section
      className="sec proc-sec"
      id="process"
      aria-labelledby="proc-h"
      data-bg="#FAF7F2"
    >
      <div className="wrap">
        <div className="hh">
          <h2 className="h2" id="proc-h">
            Every world, one way of <em>working</em>
          </h2>
          <p className="lede">
            The same clear process behind every service, so you always know what
            happens next.
          </p>
        </div>

        <div
          ref={trackRef}
          className={`track ${isDragging ? "drag" : ""}`}
          style={
            {
              "--n": numSteps,
              "--p": progress,
            } as React.CSSProperties
          }
        >
          {/* Interactive track line and glowing orb */}
          <div
            ref={lineRef}
            className="tr-line"
            aria-hidden="true"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <i className="tr-fill" />
            <b className="tr-orb" />
          </div>

          {/* 5 Process Steps */}
          <ol className="tr-steps">
            {STEPS.map((step, idx) => {
              const threshold = numSteps > 1 ? idx / (numSteps - 1) - 0.02 : 0;
              const isOn = progress >= threshold;

              return (
                <li
                  key={step.number}
                  className={`tr-s ${isOn ? "on" : ""}`}
                  onClick={() => handleStepClick(idx)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="ps-n">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
