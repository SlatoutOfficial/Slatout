"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Scale,
  CreditCard,
  Landmark,
  Code,
  ShoppingBag,
  Palette,
  Megaphone,
  ShieldCheck,
  HelpCircle,
  FileText,
  Settings,
  Compass,
  Sparkles,
  Terminal,
  Activity,
  ChevronRight
} from "lucide-react";

// --- Types ---
export type MegaLink = {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  external?: boolean;
  gradientClass?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  external?: boolean;
  menuType?: "services" | "products" | "resources";
  children?: MegaLink[];
  secondaryGroup?: {
    title: string;
    links: { label: string; href: string; external?: boolean }[];
  };
};

// --- Mock Data Options ---
const servicesChildren: MegaLink[] = [
  {
    label: "Business Setup & Legal",
    href: "/services/business-setup-legal",
    description: "Incorporate companies and register LLPs in 3-5 days.",
    icon: <Scale size={18} className="stroke-[2]" />,
    gradientClass: "from-orange-500 to-amber-400"
  },
  {
    label: "Finance, Tax & Compliance",
    href: "/services/finance-tax-compliance",
    description: "Manage GST filings, bookkeeping, and annual audits.",
    icon: <CreditCard size={18} className="stroke-[2]" />,
    gradientClass: "from-rose-500 to-orange-400"
  },
  {
    label: "Technology Solutions",
    href: "/services/technology-solutions",
    description: "Handcrafted Next.js frontend builds and API backends.",
    icon: <Code size={18} className="stroke-[2]" />,
    gradientClass: "from-amber-500 to-yellow-400"
  },
  {
    label: "Branding & Creative",
    href: "/services/branding-creative",
    description: "Formulate premium visual guidelines and UI systems.",
    icon: <Palette size={18} className="stroke-[2]" />,
    gradientClass: "from-coral-500 to-red-400"
  }
];

const productsChildren: MegaLink[] = [
  {
    label: "Slatout Billing",
    href: "https://billing.slatout.com",
    description: "Automate custom SaaS subscription cycles.",
    icon: <CreditCard size={18} className="stroke-[2]" />,
    gradientClass: "from-orange-500 to-pink-500",
    external: true
  },
  {
    label: "Edge Ingestion Nodes",
    href: "/products/edge-ingestion",
    description: "Scale parallel worker threads to 50M+ requests.",
    icon: <Terminal size={18} className="stroke-[2]" />,
    gradientClass: "from-blue-500 to-teal-400"
  },
  {
    label: "Compliance Shield",
    href: "/products/compliance-shield",
    description: "Real-time verification of company secretarial tasks.",
    icon: <ShieldCheck size={18} className="stroke-[2]" />,
    gradientClass: "from-emerald-500 to-teal-400"
  },
  {
    label: "Design Tokens kit",
    href: "/products/design-tokens",
    description: "Unified Tailwind styling tokens for Figma assets.",
    icon: <Sparkles size={18} className="stroke-[2]" />,
    gradientClass: "from-purple-500 to-indigo-400"
  },
  {
    label: "Slatout Analytics",
    href: "/products/analytics",
    description: "Sub-second client telemetry & reporting graphs.",
    icon: <Activity size={18} className="stroke-[2]" />,
    gradientClass: "from-indigo-500 to-cyan-400"
  },
  {
    label: "AI Ingestion Engine",
    href: "/products/ai-ingestion",
    description: "Extract PDF schema data into vector embeddings.",
    icon: <Compass size={18} className="stroke-[2]" />,
    gradientClass: "from-violet-500 to-purple-400"
  }
];

const resourcesChildren: MegaLink[] = [
  {
    label: "Knowledge Center",
    href: "/blogs",
    description: "Engineering sprint logs, guides, and corporate stories.",
    icon: <BookOpenIcon size={18} />,
    gradientClass: "from-orange-500 to-red-400"
  },
  {
    label: "Resource Library",
    href: "/resources/library",
    description: "Free startup contract templates and legal guides.",
    icon: <FileText size={18} className="stroke-[2]" />,
    gradientClass: "from-amber-500 to-orange-400"
  },
  {
    label: "Support Center",
    href: "/contact",
    description: "24/7 SLA escalation support pipelines.",
    icon: <HelpCircle size={18} className="stroke-[2]" />,
    gradientClass: "from-red-500 to-rose-400"
  }
];

const resourcesSecondary = {
  title: "Free Tools",
  links: [
    { label: "Company Name Generator", href: "/tools/name-generator" },
    { label: "GST Calculator Tool", href: "/tools/gst-calculator" },
    { label: "SaaS Runway Calculator", href: "/tools/runway-calculator" },
    { label: "UI Design Checker", href: "/tools/design-checker" }
  ]
};

const navItemsData: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Group A", menuType: "services", children: servicesChildren },
  { label: "Group B", menuType: "products", children: productsChildren },
  {
    label: "Group C",
    menuType: "resources",
    children: resourcesChildren,
    secondaryGroup: resourcesSecondary
  },
  { label: "Contact", href: "/contact" }
];

// Helper icon component
function BookOpenIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 18}
      height={props.size || 18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function MegaNavbar() {
  const { scrollYProgress } = useScroll();
  const [activeRoute, setActiveRoute] = useState("Home");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  const closeTimeoutRef = useRef<number | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnterTrigger = (label: string, hasChildren: boolean) => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    if (hasChildren) {
      setHoveredMenu(label);
    } else {
      setHoveredMenu(null);
    }
  };

  const handleMouseLeaveTrigger = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 180); // Invisible hover bridge delay
  };

  const handleMouseEnterPanel = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeavePanel = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 180);
  };

  const toggleAccordion = (label: string) => {
    setExpandedAccordion(expandedAccordion === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8">
      {/* Floating Light Frosted "Pill" Nav Bar */}
      <div className="mx-auto mt-4 max-w-[1280px] w-full bg-white/75 backdrop-blur-lg border border-gray-150/70 rounded-full px-6 py-2 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex items-center justify-between relative overflow-visible select-none">

        {/* Left Side: Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setActiveRoute("Home")}>
          <img
            src="/images/slatout-logo.png"
            alt="Slatout Logo"
            className="h-7 w-auto object-contain"
          />
          <span className="type-card-title text-[20px] font-bold tracking-tight text-[#1A1A24]">
            Slatout
          </span>
        </a>

        {/* Center Side: Desktop Primary Navigation Items */}
        <div className="hidden md:flex items-center gap-1.5 relative">
          {navItemsData.map((item) => {
            const hasChildren = !!item.children;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnterTrigger(item.label, hasChildren)}
                onMouseLeave={handleMouseLeaveTrigger}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => setActiveRoute(item.label)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-250 flex items-center gap-1 rounded-full ${activeRoute === item.label ? "text-[#F97432]" : "text-gray-600 hover:text-[#1A1A24]"
                      }`}
                  >
                    {activeRoute === item.label && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-[#F97432]/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-250 flex items-center gap-1.5 rounded-full ${activeRoute === item.label || hoveredMenu === item.label ? "text-[#F97432]" : "text-gray-600 hover:text-[#1A1A24]"
                      }`}
                  >
                    {activeRoute === item.label && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-[#F97432]/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${activeRoute === item.label || hoveredMenu === item.label ? "rotate-180 text-[#F97432]" : "text-gray-400"
                        }`}
                    />
                  </button>
                )}

                {/* Desktop Dropdown Mega Menu Panels */}
                <AnimatePresence>
                  {hoveredMenu === item.label && item.children && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={handleMouseEnterPanel}
                      onMouseLeave={handleMouseLeavePanel}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-150/70 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden z-50 ${item.menuType === "services"
                        ? "w-[600px]"
                        : item.menuType === "products"
                          ? "w-[840px]"
                          : "w-[720px]"
                        }`}
                    >
                      {/* Services-style: 2-column card grid */}
                      {item.menuType === "services" && (
                        <div className="grid grid-cols-2 gap-3 p-5 bg-white">
                          {item.children.map((child) => (
                            <MegaMenuCard key={child.label} child={child} onClick={() => {
                              setActiveRoute(item.label);
                              setHoveredMenu(null);
                            }} />
                          ))}
                        </div>
                      )}

                      {/* Products-style: 3-column card grid */}
                      {item.menuType === "products" && (
                        <div className="grid grid-cols-3 gap-3 p-5 bg-white">
                          {item.children.map((child) => (
                            <MegaMenuCard key={child.label} child={child} onClick={() => {
                              setActiveRoute(item.label);
                              setHoveredMenu(null);
                            }} />
                          ))}
                        </div>
                      )}

                      {/* Resources-style: split layout */}
                      {item.menuType === "resources" && (
                        <div className="grid grid-cols-[45%_55%] bg-white divide-x divide-gray-100">
                          {/* Left: link cards list */}
                          <div className="flex flex-col gap-2.5 p-5">
                            {item.children.map((child) => (
                              <MegaMenuCard key={child.label} child={child} onClick={() => {
                                setActiveRoute(item.label);
                                setHoveredMenu(null);
                              }} />
                            ))}
                          </div>

                          {/* Right: muted panel titled secondary group */}
                          {item.secondaryGroup && (
                            <div className="p-5 bg-gray-50/50 flex flex-col h-full">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4 border-b border-gray-100 pb-2">
                                {item.secondaryGroup.title}
                              </span>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {item.secondaryGroup.links.map((link) => (
                                  <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    onClick={() => setHoveredMenu(null)}
                                    className="group/compact flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-[#F97432] transition-colors"
                                  >
                                    <span className="truncate">{link.label}</span>
                                    <ChevronRight size={10} className="text-gray-300 opacity-0 group-hover/compact:opacity-100 transition-all duration-200" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Primary CTA */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-gradient-to-r from-[#F97432] to-[#F97432] text-white text-[13px] font-bold tracking-wide rounded-full px-5 py-2.5 shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-shadow select-none cursor-pointer"
          >
            Book strategy call
          </motion.a>
        </div>

        {/* Hamburger Control (Mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Thin scroll-progress bar directly under the floating pill wrapper */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-[2.5px] bg-[#F97432] origin-left rounded-full"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Mobile Slide-down Sheet Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-20 left-4 right-4 bg-white border border-gray-150/70 rounded-3xl shadow-xl overflow-hidden z-40 max-h-[80vh] flex flex-col justify-between"
          >
            <div className="overflow-y-auto px-5 py-6 flex-1 flex flex-col gap-4">
              {navItemsData.map((item) => {
                const hasChildren = !!item.children;
                const isExpanded = expandedAccordion === item.label;

                return (
                  <div key={item.label} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={() => {
                          setActiveRoute(item.label);
                          setIsMobileOpen(false);
                        }}
                        className={`text-base font-bold flex items-center py-2 ${activeRoute === item.label ? "text-[#F97432]" : "text-gray-800"
                          }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleAccordion(item.label)}
                          className="w-full flex items-center justify-between text-base font-bold py-2 text-gray-800"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-250 ${isExpanded ? "rotate-180 text-[#F97432]" : ""
                              }`}
                          />
                        </button>

                        {/* Accordion children list */}
                        <AnimatePresence initial={false}>
                          {isExpanded && item.children && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden pl-3 flex flex-col gap-2 mt-1.5 pb-2"
                            >
                              {item.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  target={child.external ? "_blank" : undefined}
                                  rel={child.external ? "noopener noreferrer" : undefined}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${child.gradientClass || "from-orange-500 to-amber-400"} text-white flex items-center justify-center shrink-0`}>
                                    {child.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                                      {child.label}
                                      {child.external && <ArrowUpRight size={10} className="text-gray-400" />}
                                    </span>
                                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{child.description}</p>
                                  </div>
                                </a>
                              ))}

                              {/* Secondary Group nested one level deeper */}
                              {item.secondaryGroup && (
                                <div className="mt-3 pl-3 border-l-2 border-gray-100 flex flex-col gap-2">
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                                    {item.secondaryGroup.title}
                                  </span>
                                  <div className="flex flex-col gap-2.5">
                                    {item.secondaryGroup.links.map((link) => (
                                      <a
                                        key={link.label}
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-xs font-semibold text-gray-500 hover:text-[#F97432]"
                                      >
                                        {link.label}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pinned CTA bottom section */}
            <div className="p-5 bg-gray-50 border-t border-gray-100 shrink-0">
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="w-full block text-center bg-[#F97432] hover:bg-[#F97432] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-2xl transition-colors shadow-sm cursor-pointer"
              >
                Book strategy call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Mega Menu Horizontal Link Card Sub-component
function MegaMenuCard({ child, onClick }: { child: MegaLink; onClick: () => void }) {
  return (
    <a
      href={child.href}
      target={child.external ? "_blank" : undefined}
      rel={child.external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group/card flex items-start gap-4 p-3 rounded-xl hover:bg-orange-50/40 border border-transparent hover:border-orange-100/30 transition-all duration-200"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${child.gradientClass || "from-orange-500 to-amber-400"} text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/card:scale-105`}>
        {child.icon}
      </div>
      <div className="flex flex-col gap-0.5 text-left">
        <span className="text-sm font-bold text-gray-800 group-hover/card:text-[#F97432] transition-colors flex items-center gap-1">
          {child.label}
          {child.external && (
            <ArrowUpRight size={12} className="text-gray-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
          )}
        </span>
        <p className="text-xs text-gray-500 font-light leading-snug">
          {child.description}
        </p>
      </div>
    </a>
  );
}
