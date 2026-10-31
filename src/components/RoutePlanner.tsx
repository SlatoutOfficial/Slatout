"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface WorldRouteNode {
  num: string;
  slug: string;
  shortTitle: string;
  fullName: string;
  tagline: string;
  h: string;
  hm: string;
  hi: string;
}

const ROUTE_NODES: WorldRouteNode[] = [
  {
    num: "01",
    slug: "business-setup-registration",
    shortTitle: "Business Setup",
    fullName: "Business Setup & Registration",
    tagline: "Structure, licences and incorporation",
    h: "#E3EEDC",
    hm: "#A9CFA2",
    hi: "#2E5B34",
  },
  {
    num: "02",
    slug: "technology-ai-solutions",
    shortTitle: "Technology & AI",
    fullName: "Technology & AI Solutions",
    tagline: "Modern web platforms, custom AI and software",
    h: "#E2E6FF",
    hm: "#A3AEF4",
    hi: "#3140A3",
  },
  {
    num: "03",
    slug: "offline-business-launch",
    shortTitle: "Offline Launch",
    fullName: "Offline Business Launch & Market Setup",
    tagline: "Market research, location & offline setup",
    h: "#F4EAD8",
    hm: "#DCC08C",
    hi: "#6E5320",
  },
  {
    num: "04",
    slug: "branding-marketing",
    shortTitle: "Branding",
    fullName: "Branding & Marketing",
    tagline: "Visual identity, design systems & brand collateral",
    h: "#FBE1E6",
    hm: "#EFA2B3",
    hi: "#A1324C",
  },
  {
    num: "05",
    slug: "content-strategy",
    shortTitle: "Content Strategy",
    fullName: "Content Strategy & Editorial Desk",
    tagline: "Editorial planning, voice and high-impact content",
    h: "#FFF3CC",
    hm: "#F2D165",
    hi: "#7A5900",
  },
  {
    num: "06",
    slug: "digital-marketing",
    shortTitle: "Digital Marketing",
    fullName: "Digital Marketing & Growth",
    tagline: "Organic search, performance marketing & social",
    h: "#D8F2EA",
    hm: "#86D6C1",
    hi: "#126B5A",
  },
  {
    num: "07",
    slug: "ecommerce-marketplace-growth",
    shortTitle: "Marketplace Growth",
    fullName: "E-Commerce & Marketplace Growth",
    tagline: "Marketplace onboarding, catalog & sales growth",
    h: "#EDE3FB",
    hm: "#BCA4EE",
    hi: "#5C3C9F",
  },
  {
    num: "08",
    slug: "programmatic-advertising",
    shortTitle: "Programmatic Ads",
    fullName: "Programmatic Advertising & Media",
    tagline: "Data-driven programmatic display & video",
    h: "#DDEFFB",
    hm: "#93C8EC",
    hi: "#175C88",
  },
  {
    num: "09",
    slug: "business-development-outsourcing",
    shortTitle: "BD Outsourcing",
    fullName: "Business Development Outsourcing",
    tagline: "Outsourced sales pipeline & B2B lead generation",
    h: "#FFE6D1",
    hm: "#FFB683",
    hi: "#A2470F",
  },
  {
    num: "10",
    slug: "finance-tax-compliance",
    shortTitle: "Finance & Tax",
    fullName: "Finance, Tax & Compliance",
    tagline: "Accounting, GST, tax filing & financial reporting",
    h: "#DDEDEC",
    hm: "#93C5C3",
    hi: "#24555A",
  },
];

interface StageOption {
  label: string;
  targets: string[];
}

const STAGES: StageOption[] = [
  {
    label: "Just an idea",
    targets: ["business-setup-registration", "finance-tax-compliance"],
  },
  {
    label: "Registered, not launched",
    targets: ["technology-ai-solutions", "branding-marketing"],
  },
  {
    label: "Running, ready to grow",
    targets: ["digital-marketing", "content-strategy"],
  },
  {
    label: "Established, ready to scale",
    targets: ["programmatic-advertising", "business-development-outsourcing"],
  },
];

interface NeedOption {
  label: string;
  targets: string[];
}

const NEEDS: NeedOption[] = [
  {
    label: "Get legally set up",
    targets: ["business-setup-registration"],
  },
  {
    label: "Stay compliant and manage money",
    targets: ["finance-tax-compliance"],
  },
  {
    label: "Build a website, app or AI",
    targets: ["technology-ai-solutions"],
  },
  {
    label: "Open a physical outlet",
    targets: ["offline-business-launch"],
  },
  {
    label: "Build my brand and content",
    targets: ["branding-marketing", "content-strategy"],
  },
  {
    label: "Get customers online",
    targets: ["digital-marketing"],
  },
  {
    label: "Sell on marketplaces",
    targets: ["ecommerce-marketplace-growth"],
  },
  {
    label: "Reach big audiences with ads",
    targets: ["programmatic-advertising"],
  },
  {
    label: "Build a B2B sales pipeline",
    targets: ["business-development-outsourcing"],
  },
];

export default function RoutePlanner() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<number[]>([]);
  const [stackAdded, setStackAdded] = useState(false);

  // Toggle stage chip (single-select toggle)
  const handleStageClick = (idx: number) => {
    setSelectedStage((prev) => (prev === idx ? null : idx));
    setStackAdded(false);
  };

  // Toggle need chip (multi-select)
  const handleNeedClick = (idx: number) => {
    setSelectedNeeds((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
    setStackAdded(false);
  };

  // Determine active slugs from selections
  const { activeSlugs, chosenNodes, pathD, nodePositions, sendHref } = useMemo(() => {
    const set = new Set<string>();

    if (selectedStage !== null && STAGES[selectedStage]) {
      STAGES[selectedStage].targets.forEach((t) => set.add(t));
    }

    selectedNeeds.forEach((nIdx) => {
      if (NEEDS[nIdx]) {
        NEEDS[nIdx].targets.forEach((t) => set.add(t));
      }
    });

    // Compute alternate heights (y%) for active nodes and build SVG path points
    let j = 0;
    const pts: [number, number][] = [];
    const positions = ROUTE_NODES.map((node, i) => {
      const on = set.has(node.slug);
      const y = on ? (j++ % 2 ? 72 : 28) : 50;
      if (on) {
        pts.push([50 + i * 99, y * 2.2]);
      }
      return { on, y };
    });

    // Generate smooth SVG cubic bezier path
    let d = "";
    pts.forEach((p, idx) => {
      if (idx === 0) {
        d = `M${p[0]} ${p[1]}`;
      } else {
        const prev = pts[idx - 1];
        const mx = (prev[0] + p[0]) / 2;
        d += ` C${mx} ${prev[1]} ${mx} ${p[1]} ${p[0]} ${p[1]}`;
      }
    });

    const chosen = ROUTE_NODES.filter((n) => set.has(n.slug));
    const chosenSlugs = chosen.map((n) => n.slug);

    const stageLabel = selectedStage !== null ? STAGES[selectedStage].label : "";
    const needsLabels = selectedNeeds.map((idx) => NEEDS[idx].label);

    const msg = `Hello SLATOUT, we are at the "${stageLabel || "not sure yet"}" stage${
      needsLabels.length ? " and need to: " + needsLabels.join("; ").toLowerCase() : ""
    }. We would like to start with: ${chosen.map((n) => n.fullName).join(", ")}.`;

    const href = `/contact/?service=${chosenSlugs.join(",")}&msg=${encodeURIComponent(
      msg
    )}#enquire`;

    return {
      activeSlugs: set,
      chosenNodes: chosen,
      pathD: d,
      nodePositions: positions,
      sendHref: href,
    };
  }, [selectedStage, selectedNeeds]);

  // Handle "Add to my stack"
  const handleAddToStack = () => {
    try {
      const slugs = chosenNodes.map((n) => n.slug);
      sessionStorage.setItem("slatout.stack", JSON.stringify(slugs));
      setStackAdded(true);
      setTimeout(() => setStackAdded(false), 2400);
    } catch {
      // ignore
    }
  };

  return (
    <section
      className="sec plan-sec"
      id="plan"
      aria-labelledby="plan-h"
      data-bg="#F1F4EE"
    >
      <div className="wrap">
        <div className="hh">
          <h2 className="h2" id="plan-h">
            Plan your <em>route</em> through the worlds.
          </h2>
          <p className="lede">
            Choose your stage and what you need. We draw the route through the
            worlds you need, in the order we would build them.
          </p>
        </div>

        <div className="planb">
          {/* ── Left Column: Questions & Filter Chips ── */}
          <div className="pq">
            {/* Question 1: Stage */}
            <div className="q">
              <h3>
                <span>1</span> Where is your business today?
              </h3>
              <div
                className="chips"
                id="pl-st"
                role="group"
                aria-label="Business stage"
              >
                {STAGES.map((st, idx) => {
                  const isPressed = selectedStage === idx;
                  return (
                    <button
                      key={st.label}
                      type="button"
                      className="chip"
                      aria-pressed={isPressed}
                      onClick={() => handleStageClick(idx)}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Needs */}
            <div className="q">
              <h3>
                <span>2</span> What do you need most? Pick as many as you like.
              </h3>
              <div
                className="chips"
                id="pl-g"
                role="group"
                aria-label="Needs"
              >
                {NEEDS.map((nd, idx) => {
                  const isPressed = selectedNeeds.includes(idx);
                  return (
                    <button
                      key={nd.label}
                      type="button"
                      className="chip"
                      aria-pressed={isPressed}
                      onClick={() => handleNeedClick(idx)}
                    >
                      {nd.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Route Map & Output ── */}
          <div className="pv">
            {/* SVG Track & Alternating Worlds */}
            <div className="route" aria-hidden="true">
              <svg
                className="route-svg"
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
              >
                <path className="route-p" d={pathD} />
              </svg>

              <ol className="route-n">
                {ROUTE_NODES.map((node, i) => {
                  const pos = nodePositions[i];
                  return (
                    <li
                      key={node.num}
                      className={pos.on ? "on" : ""}
                      style={
                        {
                          "--x": i,
                          "--y": `${pos.y}%`,
                          "--h": node.h,
                          "--hm": node.hm,
                          "--hi": node.hi,
                        } as React.CSSProperties
                      }
                      data-sl={node.slug}
                    >
                      <span>{node.num}</span>
                      <b>{node.shortTitle}</b>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Output List & Route Actions */}
            <div className="out" aria-live="polite">
              {chosenNodes.length === 0 ? (
                <p className="empty" id="pl-empty">
                  Pick a stage or a need. Your route lights up through the
                  worlds, in the order we would build them.
                </p>
              ) : (
                <ol id="pl-list">
                  {chosenNodes.map((node, k) => (
                    <li key={node.num}>
                      <Link
                        href={`/services/${node.slug}/`}
                        style={
                          {
                            "--h": node.h,
                            "--hm": node.hm,
                            "--hi": node.hi,
                            "--k": k,
                          } as React.CSSProperties
                        }
                      >
                        <b>{node.num}</b>
                        <span>{node.fullName}</span>
                        <small>{node.tagline}</small>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}

              {chosenNodes.length > 0 && (
                <div className="pl-act" id="pl-act">
                  <Link
                    className="btn-plan btn-plan-p"
                    id="pl-send"
                    href={sendHref}
                  >
                    <span>Send this route to SLATOUT</span>
                  </Link>

                  <button
                    className="btn-plan btn-plan-o"
                    type="button"
                    id="pl-stack"
                    onClick={handleAddToStack}
                  >
                    <span>
                      {stackAdded ? "✓ Added to stack!" : "Add to my stack"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
