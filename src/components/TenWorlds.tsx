"use client";

import React from "react";
import Link from "next/link";

interface WorldData {
  num: string;
  name: string;
  slug: string;
  title: string;
  desc: string;
  h: string;
  hm: string;
  hi: string;
  cardClass: string;
  visual: React.ReactNode;
}

const WORLDS: WorldData[] = [
  {
    num: "World 01",
    name: "The Registry",
    slug: "/services/business-setup-registration/",
    title: "Business Setup & Registration",
    desc: "Structure, registrations, licences, IP and legal documents.",
    h: "#E3EEDC",
    hm: "#A9CFA2",
    hi: "#2E5B34",
    cardClass: "wt-registry",
    visual: (
      <div className="mi mi-rg">
        <i className="g" />
        <b>Certificate</b>
        <span />
        <span />
        <em>Filed</em>
      </div>
    ),
  },
  {
    num: "World 02",
    name: "The Terminal",
    slug: "/services/technology-ai-solutions/",
    title: "Technology & AI Solutions",
    desc: "Websites, software, automation and AI built around a real business problem.",
    h: "#E2E6FF",
    hm: "#A3AEF4",
    hi: "#3140A3",
    cardClass: "wt-terminal",
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
    num: "World 03",
    name: "The Street Map",
    slug: "/services/offline-business-launch/",
    title: "Offline Business Launch & Market Setup",
    desc: "Market research, location strategy and local launch planning.",
    h: "#F4EAD8",
    hm: "#DCC08C",
    hi: "#6E5320",
    cardClass: "wt-map",
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
    num: "World 04",
    name: "The Brand Book",
    slug: "/services/branding-marketing/",
    title: "Branding & Marketing",
    desc: "Brand strategy, visual identity and offline marketing.",
    h: "#FBE1E6",
    hm: "#EFA2B3",
    hi: "#A1324C",
    cardClass: "wt-brand",
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
    num: "World 05",
    name: "The Editorial Desk",
    slug: "/services/content-strategy/",
    title: "Content Strategy",
    desc: "Pillars, voice, editorial calendar and content briefs.",
    h: "#FFF3CC",
    hm: "#F2D165",
    hi: "#7A5900",
    cardClass: "wt-editorial",
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
    num: "World 06",
    name: "The Dashboard",
    slug: "/services/digital-marketing/",
    title: "Digital Marketing & Growth",
    desc: "SEO, AI-search visibility, paid ads, social and analytics as one system.",
    h: "#D8F2EA",
    hm: "#86D6C1",
    hi: "#126B5A",
    cardClass: "wt-dashboard",
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
    num: "World 07",
    name: "The Marketplace",
    slug: "/services/ecommerce-marketplace-growth/",
    title: "E-Commerce & Marketplace Growth",
    desc: "Seller onboarding, listings, marketplace SEO and advertising.",
    h: "#EDE3FB",
    hm: "#BCA4EE",
    hi: "#5C3C9F",
    cardClass: "wt-market",
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
    num: "World 08",
    name: "The Ad Exchange",
    slug: "/services/programmatic-advertising/",
    title: "Programmatic Advertising",
    desc: "Real-time buying across display, video, connected TV and audio.",
    h: "#DDEFFB",
    hm: "#93C8EC",
    hi: "#175C88",
    cardClass: "wt-exchange",
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
    num: "World 09",
    name: "The Pipeline",
    slug: "/services/business-development-outsourcing/",
    title: "Business Development Outsourcing",
    desc: "Market research, B2B lead generation, outreach and pipeline management.",
    h: "#FFE6D1",
    hm: "#FFB683",
    hi: "#A2470F",
    cardClass: "wt-pipeline",
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
    num: "World 10",
    name: "The Ledger",
    slug: "/services/finance-tax-compliance/",
    title: "Finance, Tax & Compliance",
    desc: "Accounting, GST, income tax, audit, payroll, FEMA and virtual CFO support.",
    h: "#DDEDEC",
    hm: "#93C5C3",
    hi: "#24555A",
    cardClass: "wt-ledger",
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

export default function TenWorlds() {
  return (
    <section className="sec worlds-sec" id="worlds" aria-labelledby="worlds-h">
      <div className="wrap">
        <div className="hh">
          <h2 className="h2" id="worlds-h">
            One company. <em>Ten worlds.</em>
          </h2>
          <p className="lede">
            Every service has its own space, built the way that profession
            works: a registry for registration, a terminal for technology, a
            ledger for finance. Step into the one you need.
          </p>
        </div>

        <ol className="worlds">
          {WORLDS.map((w) => (
            <li
              key={w.num}
              className={`wt ${w.cardClass}`}
              style={
                {
                  "--h": w.h,
                  "--hm": w.hm,
                  "--hi": w.hi,
                } as React.CSSProperties
              }
            >
              <Link href={w.slug}>
                <div className="wt-vis" aria-hidden="true">
                  {w.visual}
                </div>
                <div className="wt-b">
                  <p className="wt-k">
                    {w.num} &middot; {w.name}
                  </p>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <span className="wt-go">
                    Enter{" "}
                    <svg
                      className="ic-s"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
