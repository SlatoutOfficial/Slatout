"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { ArrowLeft, ArrowRight, CheckCircle2, Scale, CreditCard, Landmark, Code, ShoppingBag, Palette, Megaphone, ShieldCheck, HelpCircle, FileText, Settings, Compass, Send } from "lucide-react";
import SiteEnd from "../../../components/SiteEnd";

// Full services data mapping for dynamic page rendering
const servicesData: Record<string, {
  title: string;
  desc: string;
  longDesc: string;
  icon: any;
  image: string;
  metricValue: string;
  metricLabel: string;
  benefits: string[];
  subServices: string[];
  process: { step: string; title: string; desc: string }[];
}> = {
  "business-setup-legal": {
    title: "Business Setup & Legal",
    desc: "Helping entrepreneurs legally establish and protect their businesses.",
    longDesc: "Navigating the complexities of company registration, licenses, and initial tax enrollments can be daunting. We handle the entire legal stack from initial name approvals to ready-to-operate registrations, ensuring complete regulatory compliance from day one.",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
    metricValue: "3-5 Days",
    metricLabel: "Average Incorporation Time",
    benefits: [
      "End-to-end processing with state & federal regulators",
      "Drafting custom bylaws & shareholder agreements",
      "Immediate tax registration (GST, PAN, TAN) setup"
    ],
    subServices: [
      "Company Registration (Pvt Ltd, OPC)",
      "LLP Registration",
      "Partnership Firm Registration",
      "Proprietorship Registration",
      "GST Registration",
      "MSME Registration",
      "Startup India Registration",
      "Trademark Registration",
      "Copyright Registration",
      "FSSAI Registration",
      "Import Export Code (IEC)",
      "Shop & Establishment Registration",
      "PAN & TAN Registration",
      "Legal Documentation & Agreements",
      "Business Licenses & Regulatory Approvals"
    ],
    process: [
      { step: "01", title: "Document Collection", desc: "Digital collection and verification of founder IDs and address proofs." },
      { step: "02", title: "Name Reservation", desc: "Filing name clearance applications with corporate registries." },
      { step: "03", title: "Drafting Charter", desc: "Preparing Custom Articles and Memorandums of Association." },
      { step: "04", title: "Final Incorporation", desc: "Submitting certificates, corporate bank account setup, and tax codes." }
    ]
  },
  "finance-tax-compliance": {
    title: "Finance, Tax & Compliance",
    desc: "Managing the financial backbone of businesses.",
    longDesc: "Proper financial stewardship is critical for investor relations and operational survival. Our team provides active bookkeeping, precise tax filing, and CFO-level insights to keep your balance sheets clean, scalable, and audit-ready.",
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop",
    metricValue: "100%",
    metricLabel: "Accuracy & Filing Guarantee",
    benefits: [
      "Zero compliance delays or regulatory penalties",
      "Detailed monthly cash flow & runway reports",
      "Bespoke tax optimization strategies for startups"
    ],
    subServices: [
      "Accounting & Bookkeeping",
      "GST Filing & Compliance",
      "Income Tax Filing",
      "TDS Filing",
      "ROC Compliance",
      "Payroll Processing",
      "Audit & Assurance",
      "Financial Statements",
      "Tax Planning & Advisory",
      "Budgeting & Forecasting",
      "Cash Flow Management",
      "Virtual CFO Services"
    ],
    process: [
      { step: "01", title: "Ledger Set Up", desc: "Setting up dedicated accounts on modern cloud-bookkeeping software." },
      { step: "02", title: "Monthly Reconcile", desc: "Continuous mapping of payments, expenses, and payroll pipelines." },
      { step: "03", title: "Filing Cycle", desc: "Timely processing and filing of monthly GST, TDS, and state taxes." },
      { step: "04", title: "Audit & Close", desc: "Annual financial closures, balance sheets, and audit handovers." }
    ]
  },
  "business-consulting-strategy": {
    title: "Business Consulting & Strategy",
    desc: "Helping founders make better business decisions.",
    longDesc: "Growth requires more than effort—it demands strategic clarity. We analyze market conditions, audit competitors, and build comprehensive go-to-market roadmaps that de-risk expansion and drive measurable pipeline velocity.",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    metricValue: "2.4x",
    metricLabel: "Average Pipeline Acceleration",
    benefits: [
      "Data-backed pricing models maximizing gross margins",
      "Comprehensive competitor analysis mapping gaps",
      "Strategic expansion plans with clear execution phases"
    ],
    subServices: [
      "Startup Consulting",
      "Business Consulting",
      "Business Strategy",
      "Business Planning",
      "Market Research",
      "Competitor Analysis",
      "Industry Research",
      "Pricing Strategy",
      "Go-to-Market Strategy",
      "Business Intelligence",
      "Financial Planning",
      "Feasibility Studies",
      "Business Expansion Strategy"
    ],
    process: [
      { step: "01", title: "Auditing Models", desc: "Deep dive audit into current business plans and operational models." },
      { step: "02", title: "Market Intelligence", desc: "Quantitative competitor research and demand analyses." },
      { step: "03", title: "Strategy Framing", desc: "Structuring go-to-market phases, pricing sheets, and sales plans." },
      { step: "04", title: "Execution Handoff", desc: "Delivering business plans, KPI frameworks, and expansion maps." }
    ]
  },
  "technology-solutions": {
    title: "Technology Solutions",
    desc: "Building digital infrastructure for businesses.",
    longDesc: "Digital dominance requires high-performance code. We build custom applications, API integrations, and robust database layers designed for speed, safety, and continuous integration cycles.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1600&auto=format&fit=crop",
    metricValue: "94ms",
    metricLabel: "Average Server Response Time",
    benefits: [
      "Serverless architecture scaling dynamically on edge nodes",
      "Modular design patterns supporting future additions",
      "Automated deployment and testing integrations"
    ],
    subServices: [
      "Corporate Websites",
      "Business Websites",
      "E-commerce Websites",
      "Shopify Development",
      "WooCommerce Development",
      "Custom Software Development",
      "Mobile App Development",
      "CRM Development",
      "ERP Solutions",
      "API Integration",
      "Business Automation",
      "AI Automation",
      "Cloud Solutions",
      "Technical Support & Maintenance"
    ],
    process: [
      { step: "01", title: "Architecture Mapping", desc: "Mapping DB schemas, technical specs, and interface wires." },
      { step: "02", title: "Sprint Coding", desc: "Modular coding sprints with continuous staging access." },
      { step: "03", title: "Integrate & Test", desc: "Plugging APIs, automated load-testing, and compliance checks." },
      { step: "04", title: "Production Launch", desc: "Edge deployment, CDNs, and post-launch SLA monitoring." }
    ]
  },
  "ecommerce-solutions": {
    title: "E-commerce Solutions",
    desc: "Helping brands launch and scale online.",
    longDesc: "D2C brands scale on conversion speed and operational efficiency. We set up storefronts, sync payment systems, and automate inventory updates across marketplaces to maximize your cart order values.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
    metricValue: "+42%",
    metricLabel: "Checkout Conversion Uplift",
    benefits: [
      "Seamless payment gateway & fulfillment configurations",
      "Omnichannel stock synchronization preventing over-sells",
      "Speed-optimized custom checkout funnels"
    ],
    subServices: [
      "Shopify Store Setup",
      "WooCommerce Store Setup",
      "Amazon Seller Setup",
      "Flipkart Seller Setup",
      "Meesho Seller Setup",
      "Product Listing",
      "Product Catalog Management",
      "Inventory Management",
      "Order Management",
      "Payment Gateway Integration",
      "Shipping Integration",
      "Marketplace Advertising",
      "Conversion Rate Optimization (CRO)",
      "E-commerce SEO"
    ],
    process: [
      { step: "01", title: "Store Setup", desc: "Creating Shopify/WooCommerce structures and domain bindings." },
      { step: "02", title: "Catalog Loading", desc: "Optimizing listings, catalog schema, and images." },
      { step: "03", title: "Gateway Sync", desc: "Integrating secure payment checkouts and shipping rates." },
      { step: "04", title: "Go Live", desc: "Setting live telemetry tracking and search marketing pipelines." }
    ]
  },
  "branding-creative": {
    title: "Branding & Creative",
    desc: "Building memorable brands.",
    longDesc: "Brand identity is the ultimate differentiator. We create design languages, bespoke logo guidelines, corporate copy, and user interface systems that express premium values and establish instant credibility.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=1600&auto=format&fit=crop",
    metricValue: "100%",
    metricLabel: "Bespoke Custom Design",
    benefits: [
      "Comprehensive typography, color, and design systems",
      "High-end packaging, logo, and digital guidelines",
      "State-of-the-art interactive UI/UX prototypes"
    ],
    subServices: [
      "Brand Strategy",
      "Brand Positioning",
      "Brand Naming",
      "Logo Design",
      "Visual Identity Design",
      "Brand Guidelines",
      "Packaging Design",
      "Graphic Design",
      "UI/UX Design",
      "Product Photography",
      "Corporate Photography",
      "Video Production",
      "Video Editing",
      "Motion Graphics",
      "Content Creation"
    ],
    process: [
      { step: "01", title: "Brand Audit", desc: "Auditing positioning goals, competitors, and target demographics." },
      { step: "02", title: "Visual Concepts", desc: "Developing logo alternatives, color ranges, and type sets." },
      { step: "03", title: "Guidelines Draft", desc: "Documenting guidelines, layout principles, and asset kits." },
      { step: "04", title: "Asset Delivery", desc: "Handoff of creative kits, packaging mockups, and UI Figma boards." }
    ]
  },
  "marketing-growth": {
    title: "Marketing & Growth",
    desc: "Helping businesses acquire customers and increase revenue.",
    longDesc: "Growth is a science of acquisition loops and bid optimizations. We plan, execute, and monitor performance marketing campaigns (Google/Meta Ads), local SEO setups, and automated lead nurture sequences.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    metricValue: "+180%",
    metricLabel: "Average Lead Pipeline Growth",
    benefits: [
      "Precise demographic bidding minimizing client acquisition costs",
      "Organic authority SEO strategies ranking for high-intent search",
      "High-performance landing pages maximizing conversion rates"
    ],
    subServices: [
      "Digital Marketing",
      "Performance Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Local SEO",
      "Social Media Marketing",
      "Social Media Management",
      "Content Marketing",
      "Influencer Marketing",
      "Email Marketing",
      "WhatsApp Marketing",
      "Lead Generation",
      "Marketing Automation",
      "Analytics & Reporting",
      "Traditional Marketing"
    ],
    process: [
      { step: "01", title: "Audit Pipeline", desc: "Auditing current customer sources and digital channels." },
      { step: "02", title: "Campaign Launch", desc: "Setting target keyword lists, ad creatives, and lead hooks." },
      { step: "03", title: "Bid Optimize", desc: "A/B testing ad budgets, landing pages, and search ranks." },
      { step: "04", title: "Scale Revenue", desc: "Scaling high-performing ad routes and reporting dashboard syncs." }
    ]
  },
  "legal-regulatory-compliance": {
    title: "Legal & Regulatory Compliance",
    desc: "Helping businesses stay legally compliant throughout their lifecycle.",
    longDesc: "Post-incorporation compliance is vital to protect against penalties and corporate liability. We handle recurring annual filings, board minutes, secretary support, and legal document drafts seamlessly.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600&auto=format&fit=crop",
    metricValue: "0 Penalty",
    metricLabel: "Compliance Assurance",
    benefits: [
      "Active tracking of corporate board resolutions & minutes",
      "Drafting robust vendor covenants, employment agreements, & NDAs",
      "Professional secretarial filings keeping corporate ledgers clean"
    ],
    subServices: [
      "ROC Compliance",
      "Annual Compliance",
      "Board Resolutions & Minutes",
      "Shareholding & Company Secretarial Support",
      "Legal Documentation",
      "Business Agreements",
      "Employment Agreements",
      "Vendor Agreements",
      "NDA (Non-Disclosure Agreements)",
      "Contract Drafting & Review",
      "Compliance Management",
      "Labour Law Compliance",
      "Corporate Governance Support",
      "Regulatory Advisory",
      "Legal Due Diligence"
    ],
    process: [
      { step: "01", title: "Compliance Audit", desc: "Analyzing current business filings, minutes, and legal agreements." },
      { step: "02", title: "Calendar Mapping", desc: "Scheduling crucial filing deadlines (ROC, annual, tax)." },
      { step: "03", title: "Agreement Drafts", desc: "Reviewing vendor agreements, NDAs, and contractor codes." },
      { step: "04", title: "Ongoing Secretary", desc: "Handling shareholder records, corporate board notes, and annual close." }
    ]
  }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];
  const [inquiryText, setInquiryText] = useState("");
  const [success, setSuccess] = useState(false);

  // If service slug is invalid, redirect or show safe fallback
  if (!service) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 select-none">
          <HelpCircle size={48} className="text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Service Not Found</h1>
          <p className="text-gray-500 text-sm mt-1 mb-6">The requested service page does not exist or has moved.</p>
          <a href="/" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">
            Back to Home
          </a>
        </div>
        <SiteEnd />
      </main>
    );
  }

  const Icon = service.icon;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setInquiryText("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[450px] sm:min-h-[500px] flex items-center bg-[#111] border-b border-white/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(17,17,17,0.92) 35%, rgba(17,17,17,0.65) 100%), url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
          {/* Back button */}
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-[11px] font-bold text-white/70 hover:text-white transition-colors duration-300 mb-6 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm active:scale-95 transition-all w-fit"
          >
            <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-end">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F97432] shadow-sm shrink-0">
                  <Icon size={18} className="stroke-[1.5]" />
                </div>
                <span className="type-label text-[12px] border border-white/20 rounded-full px-3.5 py-1 text-white/90">
                  Services Suite
                </span>
              </div>
              <h1 className="type-hero text-[clamp(2.2rem,6vw,4rem)] text-white mt-2">
                {service.title}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[620px] mt-2">
                {service.desc}
              </p>
            </div>

            {/* Metrics highlight widget */}
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl lg:max-w-[340px] w-full ml-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Guaranteed Standard</span>
              <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none mt-2 block">
                {service.metricValue}
              </span>
              <span className="text-xs text-white/70 font-semibold mt-1 block">
                {service.metricLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Sub-Services Grid */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16">

            {/* Left side: Long description and key benefits */}
            <div className="flex flex-col items-start gap-6">
              <h2 className="text-[20px] sm:text-2xl type-card-title text-gray-900">
                Our approach to your business.
              </h2>
              <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
                {service.longDesc}
              </p>

              <div className="flex flex-col gap-4 mt-4 w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block border-b border-gray-100 pb-2">
                  Key Benefits & Outcomes
                </span>
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 size={15} className="text-[#F97432] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs sm:text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Complete Sub-Services Grid */}
            <div className="bg-[#FAF8F5] border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-5 border-b border-gray-200/60 pb-2">
                  Complete Scope of Services ({service.subServices.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {service.subServices.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-0.5 hover:translate-x-0.5 transition-transform duration-200">
                      <div className="w-4 h-4 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#F97432] shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97432]" />
                      </div>
                      <span className="text-gray-800 type-nav text-[13px]">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-250 pt-5 mt-8 text-xs text-gray-500 font-semibold italic text-center sm:text-left">
                All packages are backed by complete SLA compliance and liability insurance.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Process Timeline */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-gray-200 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="flex flex-col items-start gap-3 mb-10 sm:mb-12">
            <span className="text-[11px] font-bold border border-gray-300 rounded-full px-3.5 py-1 text-gray-500 uppercase tracking-wide">
              Onboarding Cycle
            </span>
            <h2 className="text-2xl sm:text-3xl type-card-title text-gray-900">
              Four steps to continuous operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 font-mono">PHASE</span>
                  <span className="text-[13px] font-mono font-bold text-[#F97432]">{step.step}</span>
                </div>
                <div className="mt-4">
                  <h4 className="type-card-title text-sm text-gray-900">{step.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Specific Quick Inquiry */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97432]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col items-start gap-4">
              <span className="bg-white/10 text-white text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Direct Contact
              </span>
              <h2 className="type-section text-2xl sm:text-3xl text-white">
                Request a quote for <br />
                <span className="text-[#F97432] font-semibold">{service.title}</span>.
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[420px]">
                Submit your project inquiries and compliance targets. A specialist will follow up within 2 business hours.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 relative z-10">
              <textarea
                required
                rows={3}
                placeholder="Describe your current business constraints, regulatory requirements, or platform metrics..."
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors resize-none"
              />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono">Direct secure transmission</span>
                <button
                  type="submit"
                  className="group flex items-center justify-between bg-[#F97432] hover:bg-[#F97432] text-white text-[12px] font-semibold rounded-full pl-5 pr-1.5 py-1.5 transition-colors duration-300 w-full sm:w-[190px] shrink-0"
                >
                  <span>Submit Inquiry</span>
                  <div className="w-5 h-5 bg-white text-gray-900 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 duration-300">
                    <Send size={10} className="stroke-[3]" />
                  </div>
                </button>
              </div>

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-3 text-xs text-center animate-fadeIn mt-2">
                  Thank you! Our {service.title} desk has received your request.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <SiteEnd />
    </main>
  );
}
