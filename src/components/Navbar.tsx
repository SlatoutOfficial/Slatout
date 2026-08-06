"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
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
} from "lucide-react";
import { PrimaryCta } from "./CtaSystem";

const nestedServices = [
  { slug: "business-setup-legal", title: "Business Setup & Legal", icon: Scale },
  { slug: "finance-tax-compliance", title: "Finance, Tax & Compliance", icon: CreditCard },
  { slug: "business-consulting-strategy", title: "Business Consulting & Strategy", icon: Landmark },
  { slug: "technology-solutions", title: "Technology Solutions", icon: Code },
  { slug: "ecommerce-solutions", title: "E-commerce Solutions", icon: ShoppingBag },
  { slug: "branding-creative", title: "Branding & Creative", icon: Palette },
  { slug: "marketing-growth", title: "Marketing & Growth", icon: Megaphone },
  { slug: "legal-regulatory-compliance", title: "Legal & Regulatory Compliance", icon: ShieldCheck },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Home hero: float transparent over the video. Elsewhere / on scroll: frosted bar matching site #EFEFEF.
  const solidBar = !isHome || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out-expo ${
        solidBar
          ? "bg-[#EFEFEF]/90 backdrop-blur-xl border-b border-black/[0.07]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-[72px]">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 select-none shrink-0">
          <img
            src="/images/logo.png"
            alt=""
            className="h-7 sm:h-8 w-auto object-contain"
          />
          <span className="type-card-title text-[20px] sm:text-[22px] text-gray-900 tracking-tight">
            Slatout
          </span>
        </a>

        {/* Desktop links — centered editorial row */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <div className="relative group">
            <button className="type-nav flex items-center gap-1.5 text-[15px] sm:text-base text-gray-900/80 hover:text-[#F26522] transition-colors duration-300 px-3.5 py-2">
              <span>Services</span>
              <ChevronDown
                size={15}
                className="text-gray-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#F26522]"
              />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="w-[440px] bg-white border border-gray-200/80 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] grid grid-cols-2 gap-1">
                {nestedServices.map((svc) => {
                  const SvcIcon = svc.icon;
                  return (
                    <a
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#EFEFEF] transition-colors duration-200 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#EFEFEF] text-gray-500 group-hover/item:bg-[#F26522]/10 group-hover/item:text-[#F26522] flex items-center justify-center shrink-0 transition-colors">
                        <SvcIcon size={14} className="stroke-[1.5]" />
                      </div>
                      <span className="type-card-title text-gray-800 text-[13px] group-hover/item:text-[#F26522] transition-colors">
                        {svc.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="type-nav text-[15px] sm:text-base text-gray-900/80 hover:text-[#F26522] transition-colors duration-300 px-3.5 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center shrink-0">
          <PrimaryCta href="/contact" className="!text-[13px] !py-1.5 !pl-5 !pr-1.5">
            Book a strategy call
          </PrimaryCta>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden w-9 h-9 rounded-full border border-gray-900/15 bg-white/60 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:border-gray-900/30 transition-colors duration-300"
          aria-label="Open menu"
        >
          <Menu size={16} strokeWidth={1.75} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ease-custom ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0D0D0D]/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-[380px] bg-[#EFEFEF] flex flex-col transition-transform duration-500 ease-out-sheet ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 h-16 sm:h-[72px] border-b border-black/[0.06] shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt=""
                className="h-7 w-auto object-contain"
              />
              <span className="type-card-title text-[20px] text-gray-900 tracking-tight">
                Slatout
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full border border-gray-900/15 bg-white flex items-center justify-center text-gray-900 hover:border-gray-900/30 transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-8 flex flex-col gap-1">
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full text-left type-nav text-gray-900 text-[1.75rem] tracking-[-0.02em] leading-none py-3 flex items-center justify-between"
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-300 ${
                    isMobileServicesOpen ? "rotate-180 text-[#F26522]" : ""
                  }`}
                />
              </button>

              <div
                className={`flex flex-col gap-0.5 overflow-hidden transition-all duration-300 ${
                  isMobileServicesOpen ? "max-h-[400px] mb-2" : "max-h-0"
                }`}
              >
                {nestedServices.map((svc) => (
                  <a
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileServicesOpen(false);
                    }}
                    className="text-gray-600 hover:text-[#F26522] text-[14px] font-medium py-2.5 pl-1 border-b border-black/[0.04] last:border-0 transition-colors"
                  >
                    {svc.title}
                  </a>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="type-nav text-gray-900 text-[1.75rem] tracking-[-0.02em] leading-none py-3 hover:text-[#F26522] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="px-5 sm:px-6 pb-8 pt-4 border-t border-black/[0.06] shrink-0">
            <PrimaryCta
              href="/contact"
              fullWidth
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full justify-between"
            >
              Book a strategy call
            </PrimaryCta>
          </div>
        </div>
      </div>
    </header>
  );
}
