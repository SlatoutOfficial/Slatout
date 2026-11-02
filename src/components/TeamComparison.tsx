"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

export default function TeamComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);

  // Update slider position clamped between 0 and 100
  const updatePosFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percent));
    setSliderPos(clamped);
    userInteractedRef.current = true;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Avoid dragging if clicking on an interactive link inside
    if ((e.target as HTMLElement).closest("a")) return;
    setIsDragging(true);
    userInteractedRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    updatePosFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosFromClientX(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    userInteractedRef.current = true;
    const step = e.shiftKey ? 20 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  // Gentle demonstration swing the first time it scrolls into view if untouched
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let animId: number;
    let observer: IntersectionObserver | null = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !userInteractedRef.current) {
        observer?.disconnect();
        observer = null;

        const t0 = performance.now();
        const keys = [
          [0, 50],
          [900, 26],
          [1900, 74],
          [2900, 50],
        ];

        const animate = (now: number) => {
          if (userInteractedRef.current) return;
          const elapsed = now - t0;
          if (elapsed >= 2900) {
            setSliderPos(50);
            return;
          }

          let i = 0;
          while (i < keys.length - 1 && keys[i + 1][0] <= elapsed) i++;
          const k0 = keys[i];
          const k1 = keys[i + 1];
          const progress = (elapsed - k0[0]) / (k1[0] - k0[0]);
          // Smooth sine interpolation
          const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
          const current = k0[1] + (k1[1] - k0[1]) * ease;
          setSliderPos(current);
          animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });

    observer.observe(el);

    return () => {
      observer?.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      className="sec vs-sec"
      id="comparison"
      aria-labelledby="why-h"
      data-bg="#EEF0F6"
    >
      <div className="wrap">
        <div className="hh">
          <h2 className="h2" id="why-h">
            Ten vendors, or <em>one</em> team?
          </h2>
          <p className="lede">
            Drag the handle. Fewer hand-overs, clearer scope, and decisions that
            start with your business, not a tool.
          </p>
        </div>

        {/* ── Interactive Split Comparison Slider ── */}
        <div
          ref={containerRef}
          className={`vs ${isDragging ? "drag" : ""}`}
          style={{ "--x": `${sliderPos}%` } as React.CSSProperties}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Left Pane: Separate Vendors */}
          <div className="vs-pane vs-a">
            <svg
              className="vs-svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1000 540"
              aria-hidden="true"
              focusable="false"
            >
              <g className="ch-ls">
                <path className="ch-l" d="M500 280 Q305 165 190 110" style={{ "--d": "1.2s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q495 205 410 70" style={{ "--d": "1.6s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q555 216 690 92" style={{ "--d": "2.0s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q720 205 860 190" style={{ "--d": "2.4s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q650 350 880 360" style={{ "--d": "1.2s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q635 405 690 470" style={{ "--d": "1.6s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q430 350 440 480" style={{ "--d": "2.0s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q390 390 200 440" style={{ "--d": "2.4s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q265 320 110 300" style={{ "--d": "1.2s" } as React.CSSProperties} />
                <path className="ch-l" d="M500 280 Q440 225 300 230" style={{ "--d": "1.6s" } as React.CSSProperties} />
                <path className="ch-x" d="M190 110 L860 190" />
                <path className="ch-x" d="M410 70 L440 480" />
                <path className="ch-x" d="M690 92 L110 300" />
                <path className="ch-x" d="M880 360 L200 440" />
                <path className="ch-x" d="M690 470 L300 230" />
                <path className="ch-x" d="M860 190 L440 480" />
              </g>

              {/* Vendor Badges */}
              <g className="ch-n j0" style={{ "--x": "190px", "--y": "110px" } as React.CSSProperties}>
                <rect x="150" y="93" width="79" height="34" rx="17" />
                <text x="190" y="115">CA firm</text>
              </g>
              <g className="ch-n j1" style={{ "--x": "410px", "--y": "70px" } as React.CSSProperties}>
                <rect x="329" y="53" width="161" height="34" rx="17" />
                <text x="410" y="75">Company secretary</text>
              </g>
              <g className="ch-n j2" style={{ "--x": "690px", "--y": "92px" } as React.CSSProperties}>
                <rect x="626" y="75" width="129" height="34" rx="17" />
                <text x="690" y="97">Web developer</text>
              </g>
              <g className="ch-n j3" style={{ "--x": "860px", "--y": "190px" } as React.CSSProperties}>
                <rect x="796" y="173" width="129" height="34" rx="17" />
                <text x="860" y="195">Logo designer</text>
              </g>
              <g className="ch-n j4" style={{ "--x": "880px", "--y": "360px" } as React.CSSProperties}>
                <rect x="832" y="343" width="96" height="34" rx="17" />
                <text x="880" y="365">Ad agency</text>
              </g>
              <g className="ch-n j0" style={{ "--x": "690px", "--y": "470px" } as React.CSSProperties}>
                <rect x="622" y="453" width="137" height="34" rx="17" />
                <text x="690" y="475">SEO freelancer</text>
              </g>
              <g className="ch-n j1" style={{ "--x": "440px", "--y": "480px" } as React.CSSProperties}>
                <rect x="372" y="463" width="137" height="34" rx="17" />
                <text x="440" y="485">Content writer</text>
              </g>
              <g className="ch-n j2" style={{ "--x": "200px", "--y": "440px" } as React.CSSProperties}>
                <rect x="99" y="423" width="202" height="34" rx="17" />
                <text x="200" y="445">Marketplace consultant</text>
              </g>
              <g className="ch-n j3" style={{ "--x": "110px", "--y": "300px" } as React.CSSProperties}>
                <rect x="54" y="283" width="112" height="34" rx="17" />
                <text x="110" y="305">Media buyer</text>
              </g>
              <g className="ch-n j4" style={{ "--x": "300px", "--y": "230px" } as React.CSSProperties}>
                <rect x="223" y="213" width="153" height="34" rx="17" />
                <text x="300" y="235">Sales freelancer</text>
              </g>

              {/* Central User Circle */}
              <g className="ch-you">
                <circle cx="500" cy="280" r="38" />
                <text x="500" y="286">You</text>
              </g>

              {/* Chat Popups */}
              <g className="ch-b b0">
                <rect x="555" y="168" width="196" height="30" rx="8" />
                <text x="567" y="188">Who has the GST login?</text>
              </g>
              <g className="ch-b b1">
                <rect x="250" y="352" width="186" height="30" rx="8" />
                <text x="262" y="372">Waiting on the website</text>
              </g>
              <g className="ch-b b2">
                <rect x="730" y="268" width="140" height="30" rx="8" />
                <text x="742" y="288">Another invoice</text>
              </g>
            </svg>
            <p className="vs-cap">
              <strong>Separate vendors.</strong> Ten briefs, ten invoices, ten
              logins, and you in the middle holding it together.
            </p>
          </div>

          {/* Right Pane: One SLATOUT Team */}
          <div className="vs-pane vs-b">
            <svg
              className="vs-svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1000 540"
              aria-hidden="true"
              focusable="false"
            >
              <ellipse className="cm-o" cx="500" cy="280" rx="360" ry="205" />
              <path id="cl0" className="cm-l" d="M500 280 L500 75" />
              <path id="cl1" className="cm-l" d="M500 280 L712 114" />
              <path id="cl2" className="cm-l" d="M500 280 L842 217" />
              <path id="cl3" className="cm-l" d="M500 280 L842 343" />
              <path id="cl4" className="cm-l" d="M500 280 L712 446" />
              <path id="cl5" className="cm-l" d="M500 280 L500 485" />
              <path id="cl6" className="cm-l" d="M500 280 L288 446" />
              <path id="cl7" className="cm-l" d="M500 280 L158 343" />
              <path id="cl8" className="cm-l" d="M500 280 L158 217" />
              <path id="cl9" className="cm-l" d="M500 280 L288 114" />

              {/* Animated particle pulses */}
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="0.00s" repeatCount="indefinite">
                  <mpath href="#cl0" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="0.28s" repeatCount="indefinite">
                  <mpath href="#cl1" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="0.56s" repeatCount="indefinite">
                  <mpath href="#cl2" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="0.84s" repeatCount="indefinite">
                  <mpath href="#cl3" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="1.12s" repeatCount="indefinite">
                  <mpath href="#cl4" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="1.40s" repeatCount="indefinite">
                  <mpath href="#cl5" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="1.68s" repeatCount="indefinite">
                  <mpath href="#cl6" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="1.96s" repeatCount="indefinite">
                  <mpath href="#cl7" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="2.24s" repeatCount="indefinite">
                  <mpath href="#cl8" />
                </animateMotion>
              </circle>
              <circle className="cm-p" r="4">
                <animateMotion dur="2.8s" begin="2.52s" repeatCount="indefinite">
                  <mpath href="#cl9" />
                </animateMotion>
              </circle>

              {/* Unified Service Nodes */}
              <g className="cm-n">
                <rect x="432" y="58" width="136" height="34" rx="17" />
                <text x="500" y="80">Business Setup</text>
              </g>
              <g className="cm-n">
                <rect x="640" y="97" width="144" height="34" rx="17" />
                <text x="712" y="119">Technology &amp; AI</text>
              </g>
              <g className="cm-n">
                <rect x="774" y="200" width="136" height="34" rx="17" />
                <text x="842" y="222">Offline Launch</text>
              </g>
              <g className="cm-n">
                <rect x="798" y="326" width="88" height="34" rx="17" />
                <text x="842" y="348">Branding</text>
              </g>
              <g className="cm-n">
                <rect x="636" y="429" width="152" height="34" rx="17" />
                <text x="712" y="451">Content Strategy</text>
              </g>
              <g className="cm-n">
                <rect x="420" y="468" width="160" height="34" rx="17" />
                <text x="500" y="490">Digital Marketing</text>
              </g>
              <g className="cm-n">
                <rect x="204" y="429" width="168" height="34" rx="17" />
                <text x="288" y="451">Marketplace Growth</text>
              </g>
              <g className="cm-n">
                <rect x="82" y="326" width="152" height="34" rx="17" />
                <text x="158" y="348">Programmatic Ads</text>
              </g>
              <g className="cm-n">
                <rect x="90" y="200" width="136" height="34" rx="17" />
                <text x="158" y="222">BD Outsourcing</text>
              </g>
              <g className="cm-n">
                <rect x="224" y="97" width="128" height="34" rx="17" />
                <text x="288" y="119">Finance &amp; Tax</text>
              </g>

              {/* Central SLATOUT Connected Hub */}
              <g className="cm-hub">
                <circle className="cm-glow" cx="500" cy="280" r="70" />
                <circle cx="500" cy="280" r="46" />
                <g transform="translate(500 280) scale(1.5) translate(-20 -20)">
                  <path
                    d="M20 25.5 35 31 20 36.5 5 31Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 20.5 20 26 35 20.5V23L20 28.5 5 23Z"
                    fill="#C24E00"
                  />
                  <path
                    d="M20 15 35 20.5 20 26 5 20.5Z"
                    fill="#FF6A00"
                  />
                  <path
                    d="M20 4 35 9.5 20 15 5 9.5Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
            <p className="vs-cap">
              <strong>One SLATOUT team.</strong> One plan and one point of contact,
              with every service connected to the next.
            </p>
          </div>

          {/* Draggable Handle */}
          <div
            className="vs-handle"
            role="slider"
            tabIndex={0}
            aria-label="Compare separate vendors with one SLATOUT team"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            aria-valuetext={
              sliderPos < 15
                ? "Separate vendors"
                : sliderPos > 85
                ? "One SLATOUT team"
                : `${Math.round(100 - sliderPos)} percent one SLATOUT team`
            }
            onKeyDown={handleKeyDown}
          >
            <span aria-hidden="true" />
          </div>

          {/* Tags */}
          <span className="vs-tag vs-tl" aria-hidden="true">
            Separate vendors
          </span>
          <span className="vs-tag vs-tr" aria-hidden="true">
            One SLATOUT team
          </span>
        </div>

        {/* ── 4 Feature Cards Below ── */}
        <ul className="why4">
          <li>
            <span>01</span>
            <h3>One connected team</h3>
            <p>
              Registration, technology, branding, marketing, sales and finance
              work from the same plan, not ten separate briefs.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Strategy before channels</h3>
            <p>
              We start with your business problem, not with a platform, a logo or
              a tool.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Scope you can read</h3>
            <p>
              Each service page lists what is included, what you receive and what
              is not covered.
            </p>
          </li>
          <li>
            <span>04</span>
            <h3>No guaranteed outcomes</h3>
            <p>
              Rankings, AI-answer inclusion, sales and customer numbers depend on
              your market and offer. We agree deliverables and report against
              them instead of promising results.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
