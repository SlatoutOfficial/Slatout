"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Database, Target, Megaphone, TrendingUp, Palette, Grid,
  Activity, ShieldAlert, FileText, Cloud, RefreshCw, BarChart3,
  ArrowUpRight, ArrowRight, Network, Scale, CreditCard, Landmark,
  ShieldCheck, ShoppingCart, Settings
} from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

interface Service {
  id: number;
  slug: string;
  number: string;
  badge: string;
  navTitle: string;
  headingPrefix: string;
  headingHighlight: string;
  desc: string;
  ctaText?: string;
  image: string;
  features: Feature[];
}

const SERVICES: Service[] = [
  {
    id: 1,
    slug: "business-setup-legal",
    number: "01",
    badge: "01 / INCORPORATION & LEGAL",
    navTitle: "Business Setup & Legal",
    headingPrefix: "Launch your business with ",
    headingHighlight: "bulletproof legal.",
    desc: "Incorporate entities, protect intellectual property, and draft custom founder agreements built for institutional scale.",
    ctaText: "Get started",
    image: "/images/service_mockup_legal.jpg",
    features: [
      {
        icon: Scale,
        title: "Entity Incorporation",
        desc: "Fast registration & statutory compliance."
      },
      {
        icon: FileText,
        title: "Partner Agreements",
        desc: "Airtight founder contracts & legal bylaws."
      },
      {
        icon: ShieldCheck,
        title: "Corporate Governance",
        desc: "Structural protection for venture scale."
      }
    ]
  },
  {
    id: 2,
    slug: "finance-tax-compliance",
    number: "02",
    badge: "02 / FINANCE & COMPLIANCE",
    navTitle: "Finance, Tax & Compliance",
    headingPrefix: "Streamline tax filings and ",
    headingHighlight: "financial operations.",
    desc: "Manage automated GST filings, statutory tax returns, audits, and maintain 24/7 visibility on operational runway.",
    ctaText: "Get started",
    image: "/images/service_mockup_finance.jpg",
    features: [
      {
        icon: FileText,
        title: "GST & Tax Filing",
        desc: "Automated filing with zero penalties."
      },
      {
        icon: BarChart3,
        title: "Virtual CFO Support",
        desc: "Strategic cash flow & runway modeling."
      },
      {
        icon: CreditCard,
        title: "Audit & Bookkeeping",
        desc: "Real-time visibility into operating margins."
      }
    ]
  },
  {
    id: 3,
    slug: "business-consulting-strategy",
    number: "03",
    badge: "03 / STRATEGY & CONSULTING",
    navTitle: "Consulting & Strategy",
    headingPrefix: "Maximize your enterprise ",
    headingHighlight: "market valuation.",
    desc: "Formulate defensible market positioning, investor-grade financial models, and scalable operating frameworks.",
    ctaText: "Get started",
    image: "/images/service_mockup_strategy.jpg",
    features: [
      {
        icon: Landmark,
        title: "Valuation Modeling",
        desc: "Metrics that institutional investors trust."
      },
      {
        icon: Target,
        title: "Market Penetration",
        desc: "Actionable GTM execution roadmaps."
      },
      {
        icon: TrendingUp,
        title: "Operational Scaling",
        desc: "Streamlined unit economics & revenue."
      }
    ]
  },
  {
    id: 4,
    slug: "technology-solutions",
    number: "04",
    badge: "04 / ENGINEERING & TECH",
    navTitle: "Technology Solutions",
    headingPrefix: "Engineer digital systems that ",
    headingHighlight: "scale effortlessly.",
    desc: "Bespoke full-stack engineering with modern Next.js architectures, high-performance cloud backends, and sub-50ms APIs.",
    ctaText: "Get started",
    image: "/images/service_mockup_tech.jpg",
    features: [
      {
        icon: Code2,
        title: "Next.js Platforms",
        desc: "Blazing frontend speed and core vitals."
      },
      {
        icon: Cloud,
        title: "Cloud Infrastructure",
        desc: "Resilient serverless autoscaling setups."
      },
      {
        icon: Database,
        title: "High-Throughput APIs",
        desc: "Low-latency microservices & DB clusters."
      }
    ]
  },
  {
    id: 5,
    slug: "ecommerce-solutions",
    number: "05",
    badge: "05 / E-COMMERCE SOLUTIONS",
    navTitle: "E-commerce Solutions",
    headingPrefix: "Turn your store into a ",
    headingHighlight: "growth engine.",
    desc: "We build high-converting ecommerce stores with seamless checkout, custom integrations, and a scalable setup for long-term growth.",
    ctaText: "Get started",
    image: "/images/service_mockup_ecommerce.jpg",
    features: [
      {
        icon: ShoppingCart,
        title: "Custom Storefronts",
        desc: "Unique, brand-focused designs that convert."
      },
      {
        icon: Settings,
        title: "Seamless Integrations",
        desc: "Payments, shipping, inventory and more."
      },
      {
        icon: BarChart3,
        title: "Built for Growth",
        desc: "Scalable and optimized for long-term success."
      }
    ]
  },
  {
    id: 6,
    slug: "branding-creative",
    number: "06",
    badge: "06 / BRANDING & DESIGN",
    navTitle: "Branding & Creative",
    headingPrefix: "Craft memorable identities that ",
    headingHighlight: "command authority.",
    desc: "We shape distinctive visual narratives, comprehensive Figma design systems, and digital assets that captivate audiences.",
    ctaText: "Get started",
    image: "/images/service_mockup_branding.jpg",
    features: [
      {
        icon: Palette,
        title: "Visual Identity Kits",
        desc: "Distinctive logos, typography, & palettes."
      },
      {
        icon: Grid,
        title: "Design Systems",
        desc: "Unified UI components aligned with code."
      },
      {
        icon: Activity,
        title: "Interactive UI Assets",
        desc: "Motion-driven interactions & graphics."
      }
    ]
  },
  {
    id: 7,
    slug: "marketing-growth",
    number: "07",
    badge: "07 / MARKETING & GROWTH",
    navTitle: "Marketing & Growth",
    headingPrefix: "Acquire and retain customers ",
    headingHighlight: "profitably.",
    desc: "Scale omnichannel paid media campaigns, technical SEO ranking engines, and lifecycle retention funnels.",
    ctaText: "Get started",
    image: "/images/service_mockup_marketing.jpg",
    features: [
      {
        icon: Megaphone,
        title: "Performance Ads",
        desc: "High-ROAS paid media on Meta & Google."
      },
      {
        icon: Network,
        title: "Technical SEO",
        desc: "Search architecture capturing organic intent."
      },
      {
        icon: RefreshCw,
        title: "Retention Funnels",
        desc: "Compounding lifetime value via CRM loops."
      }
    ]
  },
  {
    id: 8,
    slug: "legal-regulatory-compliance",
    number: "08",
    badge: "08 / COMPLIANCE & SECURITY",
    navTitle: "Legal & Regulatory",
    headingPrefix: "Protect and fortify your ",
    headingHighlight: "enterprise.",
    desc: "Navigate complex regulatory checklists, information security certifications, and continuous risk mitigation.",
    ctaText: "Get started",
    image: "/images/service_mockup_compliance.jpg",
    features: [
      {
        icon: ShieldCheck,
        title: "Statutory Audits",
        desc: "Comprehensive audits with zero penalties."
      },
      {
        icon: ShieldAlert,
        title: "Security Standards",
        desc: "SOC 2, ISO 27001, and GDPR governance."
      },
      {
        icon: FileText,
        title: "Risk Checklists",
        desc: "Automated policies & continuous monitoring."
      }
    ]
  }
];

export default function Services() {
  // Default to E-Commerce Solutions (index 4) matching the showcase mockup
  const [activeIdx, setActiveIdx] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const activeService = SERVICES[activeIdx];

  // Auto-play timer (advances active slide every 8 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="services"
      className="relative w-full text-gray-900 py-16 sm:py-20 px-4 sm:px-8 lg:px-12 select-none overflow-hidden bg-white"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF5500]/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#FF5500]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Grid line pattern background */}
      <div className="absolute inset-0 services-grid-bg opacity-30 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-start mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-[2px] bg-[#FF5500]" />
            <span className="text-[11px] font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em]">
              WHAT WE DO
            </span>
          </div>

          <h2 className="text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-3">
            Everything you need to <span className="text-[#FF5500]">move forward.</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            From idea to impact — we design, build, and scale digital solutions that help businesses grow in a rapidly changing world.
          </p>
        </div>

        {/* Main Content Layout (Sidebar Menu + Dynamic Showcase Box with Aligned Height) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[370px_1fr] gap-6 lg:gap-8 items-stretch lg:h-[500px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT SIDEBAR NAVIGATION MENU */}
          <div className="flex flex-col gap-2 w-full h-full justify-between">
            {SERVICES.map((service, idx) => {
              const isActive = idx === activeIdx;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative w-full text-left px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer border flex-1 ${isActive
                      ? "bg-white border-[#FF5500]/40 text-gray-900 shadow-[0_4px_18px_rgba(255,85,0,0.12)]"
                      : "bg-[#FAF8F5]/80 hover:bg-white border-[#EBE5DB] text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {/* Active Left Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-[#FF5500] rounded-r-full shadow-[0_0_10px_rgba(255,85,0,0.8)]" />
                  )}

                  <div className="flex items-center gap-3 pl-1.5">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${isActive ? "text-[#FF5500]" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                    >
                      {service.number}
                    </span>

                    <span className="w-[1px] h-3.5 bg-gray-200" />

                    <span
                      className={`text-[13.5px] font-semibold tracking-wide transition-colors ${isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                        }`}
                    >
                      {service.navTitle}
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <ArrowRight
                    size={15}
                    className={`transition-all duration-300 ${isActive
                        ? "text-[#FF5500] opacity-100 translate-x-0"
                        : "text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT FEATURED SERVICE SHOWCASE BOX (ALIGNED HEIGHT & BACKGROUND IMAGE) */}
          <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] border border-[#E8E2D7] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-9 bg-[#FAF7F2]">

            {/* BACKGROUND IMAGE LAYER (Covering right side with natural blend) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 ease-out"
                style={{
                  backgroundImage: `url(${activeService.image})`,
                  backgroundPosition: "right center",
                }}
              />
              {/* Left-to-right gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-40% sm:via-[#FAF7F2]/85 sm:via-48% to-transparent" />
              {/* Bottom gradient so feature cards are clean and high contrast */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-transparent" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col justify-between h-full relative z-10"
              >
                {/* Top Section: Left Copy Details */}
                <div className="flex flex-col items-start justify-center max-w-[480px]">
                  {/* Category Kicker Badge */}
                  <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#8C8072] uppercase mb-3">
                    {activeService.badge}
                  </span>

                  {/* Main Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-[#111111] tracking-tight leading-[1.14] mb-3 sm:mb-3.5">
                    {activeService.headingPrefix}
                    <span className="text-[#FF5500] block sm:inline">
                      {activeService.headingHighlight}
                    </span>
                  </h3>

                  {/* Body Description */}
                  <p className="text-[#645C51] text-xs sm:text-sm lg:text-[14px] leading-relaxed mb-5 max-w-[430px]">
                    {activeService.desc}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#ea4e00] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_4px_16px_rgba(255,85,0,0.3)] hover:shadow-[0_6px_22px_rgba(255,85,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                  >
                    <span>{activeService.ctaText || "Get started"}</span>
                    <ArrowUpRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Bottom Row: 3 Feature Highlights with Circular Icons */}
                <div className="pt-4 border-t border-[#E8E2D7]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 lg:gap-5">
                  {activeService.features.map((feat, fIdx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={fIdx} className="flex items-center gap-3 group">
                        {/* Circular Icon Container */}
                        <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#241F1A] shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <Icon size={18} strokeWidth={2.2} />
                        </div>

                        {/* Title & Description */}
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-[13px] font-bold text-[#14120E] leading-snug tracking-tight">
                            {feat.title}
                          </h4>
                          <p className="text-[11px] text-[#786F62] leading-tight mt-0.5">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
