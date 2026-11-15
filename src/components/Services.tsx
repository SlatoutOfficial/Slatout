"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  panelId: string;
  num: string;
  name: string;
  shortTag: string;
  stage: string;
  stageLabel: string;
  t: string;
  m: string;
  k: string;
  desc: string;
  tags: string[];
  exploreHref: string;
  exploreLabel: string;
  visual: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: "t0",
    panelId: "p0",
    num: "01",
    name: "Business Setup & Registration",
    shortTag: "Build Your Business on the Right Foundation",
    stage: "Start",
    stageLabel: "01 · Start stage",
    t: "#E3EEDC",
    m: "#A9CFA2",
    k: "#2E5B34",
    desc: "Structure, registrations, licences, IP and legal documents.",
    tags: [
      "Business Structure & Registration",
      "Tax & Statutory Registrations",
      "Industry-Specific Licences & Approvals",
      "Startup & MSME Registrations",
    ],
    exploreHref: "/services/business-setup-registration/",
    exploreLabel: "Explore Business Setup",
    visual: (
      <div className="mi mi-rg">
        <b>Certificate</b>
        <span />
        <span />
        <em>Filed</em>
      </div>
    ),
  },
  {
    id: "t1",
    panelId: "p1",
    num: "02",
    name: "Technology & AI Solutions",
    shortTag: "Build Your Business. Connect Your Customers. Automate Your Operations.",
    stage: "Build",
    stageLabel: "02 · Build stage",
    t: "#E2E6FF",
    m: "#A3AEF4",
    k: "#3140A3",
    desc: "Websites, software, automation and AI built around a real business problem.",
    tags: [
      "Establish Your Digital Presence",
      "Build Digital Customer Experiences",
      "Digitise Your Business Operations",
      "Automate Repetitive Work",
    ],
    exploreHref: "/services/technology-ai-solutions/",
    exploreLabel: "Explore Technology & AI",
    visual: (
      <div className="mi mi-tm">
        <span>$ slatout build</span>
        <span className="ok">&#10003; website</span>
        <span className="ok">&#10003; crm</span>
        <span className="ok">&#10003; ai assistant</span>
        <i />
      </div>
    ),
  },
  {
    id: "t2",
    panelId: "p2",
    num: "03",
    name: "Offline Business Launch & Market Setup",
    shortTag: "Build Your Business Around the Market, Not Assumptions",
    stage: "Start",
    stageLabel: "03 · Start stage",
    t: "#F4EAD8",
    m: "#DCC08C",
    k: "#6E5320",
    desc: "Market research, location strategy and local launch planning.",
    tags: [
      "Market & Customer Intelligence",
      "Location Strategy",
      "Competition & Positioning",
      "Physical Brand Presence",
    ],
    exploreHref: "/services/offline-business-launch/",
    exploreLabel: "Explore Offline Launch",
    visual: (
      <div className="mi mi-mp">
        <i className="r1" />
        <i className="r2" />
        <i className="r3" />
        <b className="pin" />
        <s />
      </div>
    ),
  },
  {
    id: "t3",
    panelId: "p3",
    num: "04",
    name: "Branding & Marketing",
    shortTag: "Give Your Business an Identity Worth Remembering",
    stage: "Build",
    stageLabel: "04 · Build stage",
    t: "#FBE1E6",
    m: "#EFA2B3",
    k: "#A1324C",
    desc: "Brand strategy, visual identity and offline marketing.",
    tags: [
      "Brand Strategy",
      "Visual Identity",
      "Brand Guidelines",
      "Marketing Collateral",
    ],
    exploreHref: "/services/branding-marketing/",
    exploreLabel: "Explore Branding",
    visual: (
      <div className="mi mi-bb">
        <b>Aa</b>
        <span>
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    ),
  },
  {
    id: "t4",
    panelId: "p4",
    num: "05",
    name: "Content Strategy",
    shortTag: "Know What to Say Before You Decide Where to Say It",
    stage: "Build",
    stageLabel: "05 · Build stage",
    t: "#FFF3CC",
    m: "#F2D165",
    k: "#7A5900",
    desc: "Pillars, voice, editorial calendar and content briefs.",
    tags: [
      "Content Audit",
      "Content Pillars & Themes",
      "Voice & Messaging Guidelines",
      "Editorial Calendar",
    ],
    exploreHref: "/services/content-strategy/",
    exploreLabel: "Explore Content Strategy",
    visual: (
      <div className="mi mi-ed">
        <b>The Content Desk</b>
        <span />
        <span />
        <span />
        <em />
      </div>
    ),
  },
  {
    id: "t5",
    panelId: "p5",
    num: "06",
    name: "Digital Marketing & Growth",
    shortTag: "Turn Visibility into Customers",
    stage: "Grow",
    stageLabel: "06 · Grow stage",
    t: "#D8F2EA",
    m: "#86D6C1",
    k: "#126B5A",
    desc: "SEO, AI-search visibility, paid ads, social and analytics as one system.",
    tags: [
      "Digital Marketing Strategy",
      "SEO (Search Engine Optimisation)",
      "AEO & GEO: Visibility in AI Search",
      "Performance Marketing",
    ],
    exploreHref: "/services/digital-marketing/",
    exploreLabel: "Explore Digital Marketing",
    visual: (
      <div className="mi mi-db">
        <span className="q">near me</span>
        <svg viewBox="0 0 100 40" aria-hidden="true">
          <path d="M0 36 C20 32 30 26 45 24 S70 12 100 4" />
        </svg>
      </div>
    ),
  },
  {
    id: "t6",
    panelId: "p6",
    num: "07",
    name: "E-Commerce & Marketplace Growth",
    shortTag: "Sell Better. Rank Higher. Scale Across Marketplaces.",
    stage: "Grow",
    stageLabel: "07 · Grow stage",
    t: "#EDE3FB",
    m: "#BCA4EE",
    k: "#5C3C9F",
    desc: "Seller onboarding, listings, marketplace SEO and advertising.",
    tags: [
      "Marketplace Setup & Seller Onboarding",
      "Product Listing & Catalogue Management",
      "Marketplace SEO & Product Ranking",
      "Marketplace Advertising & PPC Management",
    ],
    exploreHref: "/services/ecommerce-marketplace-growth/",
    exploreLabel: "Explore Marketplace Growth",
    visual: (
      <div className="mi mi-mk">
        <i className="im" />
        <b>Your product</b>
        <span>★★★★☆</span>
        <em>Add to cart</em>
      </div>
    ),
  },
  {
    id: "t7",
    panelId: "p7",
    num: "08",
    name: "Programmatic Advertising",
    shortTag: "Reach the Right Audience, Everywhere They Are — Automatically",
    stage: "Grow",
    stageLabel: "08 · Grow stage",
    t: "#DDEFFB",
    m: "#93C8EC",
    k: "#175C88",
    desc: "Real-time buying across display, video, connected TV and audio.",
    tags: [
      "Programmatic Strategy & Audit",
      "Programmatic Tools & Platform Selection",
      "Audience Targeting & Data",
      "Creative & Ad Formats",
    ],
    exploreHref: "/services/programmatic-advertising/",
    exploreLabel: "Explore Programmatic Ads",
    visual: (
      <div className="mi mi-ax">
        <i />
        <i />
        <i />
        <b />
      </div>
    ),
  },
  {
    id: "t8",
    panelId: "p8",
    num: "09",
    name: "Business Development Outsourcing",
    shortTag: "Build Your Pipeline. Win More Customers. Grow Your Business.",
    stage: "Grow",
    stageLabel: "09 · Grow stage",
    t: "#FFE6D1",
    m: "#FFB683",
    k: "#A2470F",
    desc: "Market research, B2B lead generation, outreach and pipeline management.",
    tags: [
      "Business Development Strategy",
      "Market Research & Opportunity Identification",
      "B2B Lead Generation & Prospect Research",
      "Outbound Sales & Customer Acquisition",
    ],
    exploreHref: "/services/business-development-outsourcing/",
    exploreLabel: "Explore BD Outsourcing",
    visual: (
      <div className="mi mi-pp">
        <span>
          <i />
          <i />
        </span>
        <span>
          <i />
        </span>
        <span>
          <i className="w" />
        </span>
      </div>
    ),
  },
  {
    id: "t9",
    panelId: "p9",
    num: "10",
    name: "Finance, Tax & Compliance",
    shortTag: "The Financial and Compliance Partner Your Business Needs to Keep Moving",
    stage: "Run & Protect",
    stageLabel: "10 · Run & Protect stage",
    t: "#DDEDEC",
    m: "#93C5C3",
    k: "#24555A",
    desc: "Accounting, GST, income tax, audit, payroll, FEMA and virtual CFO support.",
    tags: [
      "Accounting & Bookkeeping",
      "GST & Indirect Tax",
      "Income Tax & Direct Tax",
      "Audit & Assurance",
    ],
    exploreHref: "/services/finance-tax-compliance/",
    exploreLabel: "Explore Finance & Tax",
    visual: (
      <div className="mi mi-lg">
        <span>
          <b>GST</b>
          <i>&#10003;</i>
        </span>
        <span>
          <b>TDS</b>
          <i>&#10003;</i>
        </span>
        <span>
          <b>ROC</b>
          <i>&#10003;</i>
        </span>
        <em>Balanced</em>
      </div>
    ),
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const selectTab = (index: number, shouldFocus: boolean = false) => {
    setActiveTab(index);
    if (shouldFocus && tabRefs.current[index]) {
      tabRefs.current[index]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % SERVICES.length;
      selectTab(next, true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + SERVICES.length) % SERVICES.length;
      selectTab(prev, true);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth > 1060) {
      selectTab(index, false);
    }
  };

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rvElements = section.querySelectorAll(".rv");
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      rvElements.forEach((el) => io.observe(el));
      return () => io.disconnect();
    } else {
      rvElements.forEach((el) => el.classList.add("in"));
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sec"
      id="services"
      aria-labelledby="sv-h"
    >
      <div className="wrap">
        <div className="head rv">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="h2" id="sv-h">
              One company. <em>Ten services.</em>
            </h2>
          </div>
          <p className="lede">
            Every service a growing business needs, from the first registration
            to the last filing of the year. Pick one to see how it works.
          </p>
        </div>

        <div className="sv-g" style={{ alignItems: "start" }}>
          {/* LIST */}
          <ol
            className="sv-list rv"
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            style={{ alignSelf: "start", margin: 0 }}
          >
            {SERVICES.map((svc, i) => {
              const isSelected = activeTab === i;
              return (
                <li
                  key={svc.num}
                  style={
                    {
                      "--t": svc.t,
                      "--m": svc.m,
                      "--k": svc.k,
                    } as React.CSSProperties
                  }
                >
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={svc.id}
                    aria-controls={svc.panelId}
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectTab(i, false)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  >
                    <span className="n">{svc.num}</span>
                    <span>
                      <b>{svc.name}</b>
                      <small>{svc.shortTag}</small>
                    </span>
                    <span className="st">{svc.stage}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* PREVIEW PANELS */}
          <div className="sv-stage rv" style={{ alignSelf: "start", margin: 0 }}>
            {SERVICES.map((svc, i) => {
              const isSelected = activeTab === i;
              return (
                <div
                  key={svc.panelId}
                  className={`sv-p ${isSelected ? "on" : ""}`}
                  id={svc.panelId}
                  role="tabpanel"
                  aria-labelledby={svc.id}
                  style={
                    {
                      "--t": svc.t,
                      "--m": svc.m,
                      "--k": svc.k,
                    } as React.CSSProperties
                  }
                >
                  <div className="sv-vis" aria-hidden="true">
                    {svc.visual}
                  </div>
                  <p className="k">{svc.stageLabel}</p>
                  <h3>{svc.name}</h3>
                  <p>{svc.desc}</p>
                  <ul className="tags">
                    {svc.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="acts">
                    <Link className="btn btn-k" href={svc.exploreHref}>
                      {svc.exploreLabel} <i>&rarr;</i>
                    </Link>
                    <a className="btn btn-s" href="#enquire">
                      Book a strategy call
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
