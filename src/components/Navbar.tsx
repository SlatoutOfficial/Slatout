"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  Folder,
  Users,
  HelpCircle,
  FileText,
  Send,
  Sparkles,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { PrimaryCta } from "./CtaSystem";

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

// --- Actual Slatout Services Data (10 Worlds) ---
const servicesChildren: MegaLink[] = [
  {
    label: "01. Business Setup & Registration",
    href: "/services/business-setup-registration",
    description: "Structure, registrations, licences, IP and legal documents.",
    icon: <Scale size={18} className="stroke-[2]" />,
    gradientClass: "from-emerald-500 to-teal-400"
  },
  {
    label: "02. Technology & AI Solutions",
    href: "/services/technology-ai-solutions",
    description: "Websites, software, automation and AI built around business problems.",
    icon: <Code size={18} className="stroke-[2]" />,
    gradientClass: "from-blue-500 to-indigo-400"
  },
  {
    label: "03. Offline Business Launch",
    href: "/services/offline-business-launch",
    description: "Market research, location strategy and local launch planning.",
    icon: <Landmark size={18} className="stroke-[2]" />,
    gradientClass: "from-amber-500 to-orange-400"
  },
  {
    label: "04. Branding & Marketing",
    href: "/services/branding-marketing",
    description: "Brand strategy, visual identity and offline marketing.",
    icon: <Palette size={18} className="stroke-[2]" />,
    gradientClass: "from-rose-500 to-pink-400"
  },
  {
    label: "05. Content Strategy",
    href: "/services/content-strategy",
    description: "Pillars, voice, editorial calendar and content briefs.",
    icon: <FileText size={18} className="stroke-[2]" />,
    gradientClass: "from-yellow-500 to-amber-400"
  },
  {
    label: "06. Digital Marketing & Growth",
    href: "/services/digital-marketing",
    description: "SEO, AI-search visibility, paid ads, social and analytics.",
    icon: <Megaphone size={18} className="stroke-[2]" />,
    gradientClass: "from-teal-500 to-cyan-400"
  },
  {
    label: "07. E-Commerce & Marketplace Growth",
    href: "/services/ecommerce-marketplace-growth",
    description: "Seller onboarding, listings, marketplace SEO and advertising.",
    icon: <ShoppingBag size={18} className="stroke-[2]" />,
    gradientClass: "from-purple-500 to-indigo-400"
  },
  {
    label: "08. Programmatic Advertising",
    href: "/services/programmatic-advertising",
    description: "Real-time buying across display, video, connected TV and audio.",
    icon: <Sparkles size={18} className="stroke-[2]" />,
    gradientClass: "from-cyan-500 to-blue-400"
  },
  {
    label: "09. BD Outsourcing",
    href: "/services/business-development-outsourcing",
    description: "Market research, B2B lead generation, outreach and pipeline.",
    icon: <Users size={18} className="stroke-[2]" />,
    gradientClass: "from-orange-500 to-amber-400"
  },
  {
    label: "10. Finance, Tax & Compliance",
    href: "/services/finance-tax-compliance",
    description: "Accounting, GST, income tax, audit, payroll and virtual CFO.",
    icon: <CreditCard size={18} className="stroke-[2]" />,
    gradientClass: "from-emerald-600 to-teal-500"
  }
];

// --- Case Studies / Client Work Data ---
const caseStudiesChildren: MegaLink[] = [
  {
    label: "Narrativ Case Study",
    href: "/work",
    description: "Winner of Site of the Month 2025 - interactive 3D showcase driving engagement.",
    icon: <Sparkles size={18} className="stroke-[2]" />,
    gradientClass: "from-blue-500 to-teal-400"
  },
  {
    label: "Luminar Case Study",
    href: "/work",
    description: "Transforming a dated platform into a modern conversion-focused funnel experience.",
    icon: <Folder size={18} className="stroke-[2]" />,
    gradientClass: "from-indigo-500 to-purple-400"
  },
  {
    label: "All Client Work",
    href: "/work",
    description: "Browse our complete catalog of strategy-led digital setups and engineering.",
    icon: <Folder size={18} className="stroke-[2]" />,
    gradientClass: "from-orange-500 to-red-500"
  }
];

// --- Resources / Insights Data ---
const resourcesChildren: MegaLink[] = [
  {
    label: "Journal & Insights",
    href: "/blogs",
    description: "Engineering sprint logs, legal guides, and corporate stories.",
    icon: <BookOpen size={18} className="stroke-[2]" />,
    gradientClass: "from-orange-500 to-amber-400"
  },
  {
    label: "About Slatout",
    href: "/about",
    description: "Learn about our editorial design principles and startup advisory mission.",
    icon: <Users size={18} className="stroke-[2]" />,
    gradientClass: "from-rose-500 to-orange-400"
  },
  {
    label: "Get in Touch",
    href: "/contact",
    description: "Start a conversation directly with our design and legal partners.",
    icon: <Send size={18} className="stroke-[2]" />,
    gradientClass: "from-amber-500 to-orange-500"
  }
];

// --- Navbar Structure Mapping ---
const navItemsData: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", menuType: "services", children: servicesChildren },
  // { label: "Case Studies", menuType: "products", children: caseStudiesChildren },
  {
    label: "Insights",
    menuType: "products",
    children: resourcesChildren
  },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [activeRoute, setActiveRoute] = useState("Home");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeAccent, setThemeAccent] = useState("#ff6a13");

  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e.detail?.color) {
        setThemeAccent(e.detail.color);
      }
    };
    window.addEventListener("slatout-theme-change", handleThemeChange);
    return () => window.removeEventListener("slatout-theme-change", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active route depending on path changes
  useEffect(() => {
    if (pathname === "/") {
      setActiveRoute("Home");
    } else if (pathname.startsWith("/services")) {
      setActiveRoute("Services");
    } else if (pathname.startsWith("/work")) {
      setActiveRoute("Case Studies");
    } else if (pathname.startsWith("/blogs") || pathname.startsWith("/about")) {
      setActiveRoute("Insights");
    } else if (pathname === "/contact") {
      setActiveRoute("Contact");
    }
  }, [pathname]);

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
            src="/images/slatout-logo.jpeg"
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
                    style={{
                      color: activeRoute === item.label ? themeAccent : undefined,
                    }}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 flex items-center gap-1 rounded-full ${activeRoute === item.label ? "" : "text-gray-600 hover:text-[#1A1A24]"
                      }`}
                  >
                    {activeRoute === item.label && (
                      <motion.div
                        layoutId="active-nav-pill"
                        style={{
                          backgroundColor: `${themeAccent}26`,
                        }}
                        className="absolute inset-0 rounded-full -z-10 transition-colors duration-300"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    style={{
                      color: activeRoute === item.label || hoveredMenu === item.label ? themeAccent : undefined,
                    }}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 rounded-full ${activeRoute === item.label || hoveredMenu === item.label ? "" : "text-gray-600 hover:text-[#1A1A24]"
                      }`}
                  >
                    {activeRoute === item.label && (
                      <motion.div
                        layoutId="active-nav-pill"
                        style={{
                          backgroundColor: `${themeAccent}26`,
                        }}
                        className="absolute inset-0 rounded-full -z-10 transition-colors duration-300"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: activeRoute === item.label || hoveredMenu === item.label ? themeAccent : undefined,
                      }}
                      className={`transition-transform duration-300 ${activeRoute === item.label || hoveredMenu === item.label ? "rotate-180" : "text-gray-400"
                        }`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Dropdown Mega Menu Panels (Centered relative to the entire floating pill bar) */}
        <AnimatePresence>
          {hoveredMenu && (() => {
            const activeItem = navItemsData.find(item => item.label === hoveredMenu);
            if (!activeItem || !activeItem.children) return null;
            return (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={handleMouseEnterPanel}
                  onMouseLeave={handleMouseLeavePanel}
                  className={`bg-white border border-gray-150/70 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden ${activeItem.menuType === "services"
                    ? "w-[800px]"
                    : activeItem.menuType === "products"
                      ? "w-[840px]"
                      : "w-[720px]"
                    }`}
                >
                  {/* Services-style: 3-column card grid (Caps services at max 3 rows) */}
                  {activeItem.menuType === "services" && (
                    <div className="grid grid-cols-3 gap-3 p-5 bg-white">
                      {activeItem.children.map((child) => (
                        <MegaMenuCard key={child.label} child={child} onClick={() => {
                          setActiveRoute(activeItem.label);
                          setHoveredMenu(null);
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Products/Case Studies-style: 3-column card grid */}
                  {activeItem.menuType === "products" && (
                    <div className="grid grid-cols-3 gap-3 p-5 bg-white">
                      {activeItem.children.map((child) => (
                        <MegaMenuCard key={child.label} child={child} onClick={() => {
                          setActiveRoute(activeItem.label);
                          setHoveredMenu(null);
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Resources-style: split layout */}
                  {activeItem.menuType === "resources" && (
                    <div className="grid grid-cols-[45%_55%] bg-white divide-x divide-gray-100">
                      {/* Left: link cards list */}
                      <div className="flex flex-col gap-2.5 p-5">
                        {activeItem.children.map((child) => (
                          <MegaMenuCard key={child.label} child={child} onClick={() => {
                            setActiveRoute(activeItem.label);
                            setHoveredMenu(null);
                          }} />
                        ))}
                      </div>

                      {/* Right: muted panel titled secondary group */}
                      {activeItem.secondaryGroup && (
                        <div className="p-5 bg-gray-50/50 flex flex-col h-full text-left">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4 border-b border-gray-100 pb-2">
                            {activeItem.secondaryGroup.title}
                          </span>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {activeItem.secondaryGroup.links.map((link) => (
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
              </div>
            );
          })()}
        </AnimatePresence>

        {/* Right Side: Primary CTA */}
        <div className="hidden md:flex items-center">
          <PrimaryCta
            href="/contact"
            style={{
              backgroundColor: themeAccent,
              color: ["#c9f032", "#ebe4d6"].includes(themeAccent) ? "#0b0b0b" : "#ffffff",
              transition: "background-color 0.4s ease, color 0.4s ease",
            }}
            className="!text-[13px] !py-1.5 !pl-5 !pr-1.5 shadow-sm"
          >
            Book a strategy call
          </PrimaryCta>
        </div>

        {/* Hamburger Control (Mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-9 h-9 rounded-full border border-gray-250 bg-white flex items-center justify-center text-[#1A1A24] hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X size={16} strokeWidth={1.75} /> : <Menu size={16} strokeWidth={1.75} />}
          </button>
        </div>

        {/* Thin scroll-progress bar directly under the floating pill wrapper */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-[2.5px] origin-left rounded-full transition-colors duration-300"
          style={{
            scaleX: scrollYProgress,
            backgroundColor: "var(--theme-accent, #F97432)",
          }}
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
            className="md:hidden absolute top-20 left-4 right-4 bg-white border border-gray-150/70 rounded-3xl shadow-xl overflow-hidden z-45 max-h-[80vh] flex flex-col justify-between"
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
                          className="w-full flex items-center justify-between text-base font-bold py-2 text-gray-800 text-left"
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
                                  <div className="flex-1 min-w-0 text-left">
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
                                <div className="mt-3 pl-3 border-l-2 border-gray-100 flex flex-col gap-2 text-left">
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
              <PrimaryCta
                href="/contact"
                fullWidth
                style={{
                  backgroundColor: themeAccent,
                  color: ["#c9f032", "#ebe4d6"].includes(themeAccent) ? "#0b0b0b" : "#ffffff",
                  transition: "background-color 0.4s ease, color 0.4s ease",
                }}
                onClick={() => setIsMobileOpen(false)}
                className="w-full justify-between"
              >
                Book a strategy call
              </PrimaryCta>
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
