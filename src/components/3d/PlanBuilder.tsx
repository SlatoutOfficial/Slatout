"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Plate3D from "./Plate3D";
import { SYSTEM_SERVICES, STAGE_OPTIONS, GOAL_OPTIONS } from "@/data/systemsData";

export default function PlanBuilder() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<Record<number, boolean>>({});

  // Compute union of selected service indices
  const activeServiceIndices = useMemo(() => {
    const set = new Set<number>();

    if (selectedStage !== null) {
      STAGE_OPTIONS[selectedStage].serviceIndices.forEach((idx) => set.add(idx));
    }

    Object.entries(selectedGoals).forEach(([goalIdxStr, isSelected]) => {
      if (isSelected) {
        const goalIdx = Number(goalIdxStr);
        GOAL_OPTIONS[goalIdx]?.serviceIndices.forEach((idx) => set.add(idx));
      }
    });

    return Array.from(set).sort((a, b) => a - b);
  }, [selectedStage, selectedGoals]);

  const toggleGoal = (index: number) => {
    setSelectedGoals((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleStartPlan = () => {
    const stageName = selectedStage !== null ? STAGE_OPTIONS[selectedStage].label : "Evaluating stage";
    const serviceNames = activeServiceIndices.map((i) => SYSTEM_SERVICES[i].name).join(", ");
    const text = `Hello SLATOUT team,\n\nWe are currently at the "${stageName}" stage. Based on our requirements, we would like to start with the following system layers:\n- ${serviceNames}\n\nPlease get in touch to discuss the roadmap and onboarding.`;

    // Try to auto-populate contact textarea if present
    const textarea = document.getElementById("message") as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = text;
    }

    // Smooth scroll to contact
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="plan-builder" className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#171714] border-b border-[#171714]/15">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#FF5A1F]" />
            <span className="text-xs font-mono font-bold text-[#FF5A1F] uppercase tracking-[0.2em]">
              INTERACTIVE CONFIGURATOR
            </span>
          </div>

          <h2 className="text-[clamp(2.2rem,4.8vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[1.02]">
            Build Your Custom Roadmap
          </h2>
          <p className="text-[#171714]/70 text-[clamp(1.05rem,1.35vw,1.2rem)] mt-4 leading-relaxed">
            Select your business stage and active goals to see your tailored stack assemble in real time.
          </p>
        </div>

        {/* 2-Column Layout: Controls on left, Live 3D Tower on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 mt-12 sm:mt-16 items-start">
          
          {/* Controls Column */}
          <div>
            {/* Question 1: Stage */}
            <div className="mb-10">
              <h3 className="font-bold text-lg sm:text-xl text-[#171714] mb-4">
                1. Where is your business right now?
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {STAGE_OPTIONS.map((st, i) => {
                  const isSelected = selectedStage === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedStage(isSelected ? null : i)}
                      className={`chamfer-chip px-5 py-3 text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[#FF5A1F] text-white shadow-md"
                          : "bg-[#171714]/[0.06] text-[#171714] hover:bg-[#171714]/[0.12]"
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Goals */}
            <div className="mb-10">
              <h3 className="font-bold text-lg sm:text-xl text-[#171714] mb-4">
                2. What do you want to accomplish next?
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {GOAL_OPTIONS.map((g, i) => {
                  const isSelected = !!selectedGoals[i];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleGoal(i)}
                      className={`chamfer-chip px-5 py-3 text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[#FF5A1F] text-white shadow-md"
                          : "bg-[#171714]/[0.06] text-[#171714] hover:bg-[#171714]/[0.12]"
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Action List Output */}
            <div className="border-t border-[#171714]/15 pt-6">
              <h4 className="text-xs font-mono font-bold text-[#FF5A1F] uppercase tracking-[0.2em] mb-4">
                RECOMMENDED SYSTEM LAYERS ({activeServiceIndices.length})
              </h4>

              {activeServiceIndices.length === 0 ? (
                <p className="text-[#171714]/50 py-3 text-sm">
                  Select a stage or goal above to preview your custom system roadmap.
                </p>
              ) : (
                <ol className="divide-y divide-[#171714]/15">
                  {activeServiceIndices.map((idx) => {
                    const s = SYSTEM_SERVICES[idx];
                    return (
                      <li key={s.id} className="py-3">
                        <Link
                          href={`/services/${s.slug}`}
                          className="grid grid-cols-[3.2em_1fr] items-baseline gap-2 group"
                        >
                          <b className="font-mono text-[#FF5A1F] font-bold">{s.number}</b>
                          <div>
                            <span className="font-semibold text-base text-[#171714] group-hover:text-[#FF5A1F] transition-colors">
                              {s.name}
                            </span>
                            <small className="block text-[#171714]/65 text-xs sm:text-sm mt-0.5">
                              {s.oneLiner}
                            </small>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}

              {activeServiceIndices.length > 0 && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleStartPlan}
                    className="chamfer-btn px-8 py-4 bg-[#FF5A1F] text-white font-bold text-sm tracking-wide transition-all hover:bg-[#171714] shadow-lg shadow-[#FF5A1F]/20"
                  >
                    Start With This Plan →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sticky 3D Tower Preview Column */}
          <div className="sticky top-[100px] flex flex-col items-center select-none">
            <div
              className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center overflow-visible"
              style={{ perspective: "1500px" }}
            >
              {/* Radial ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(420px circle at 50% 50%, rgba(255, 90, 31, 0.14), transparent 70%)"
                }}
              />

              {/* Floor grid */}
              <div className="floor-grid floor-grid-light opacity-50" />

              {/* 3D Tower Stack for Plan Builder */}
              <div
                id="p-tw"
                className="relative w-[min(26vw,220px)] aspect-square preserve-3d transition-transform duration-500"
                style={{
                  transform: "translateY(50px) rotateX(60deg) rotateZ(-38deg)"
                }}
              >
                {SYSTEM_SERVICES.map((s, index) => {
                  const isSelected = activeServiceIndices.includes(index);
                  return (
                    <Plate3D
                      key={s.id}
                      index={index}
                      artSvg={s.artSvg}
                      gap="34px"
                      land={1}
                      draw={1}
                      isHot={isSelected}
                      isDim={!isSelected && activeServiceIndices.length > 0}
                      ty={isSelected ? "14%" : "0%"}
                      style={{
                        transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-xs font-mono text-[#171714]/50 tracking-wider text-center mt-2">
              LIVE 3D SYSTEM PROJECTION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
