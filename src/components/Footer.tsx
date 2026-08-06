import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextCta } from "./CtaSystem";

const serviceLinks = [
  { label: "Business Setup & Legal", href: "/services/business-setup-legal" },
  { label: "Finance & Tax", href: "/services/finance-tax-compliance" },
  { label: "Business Consulting", href: "/services/business-consulting-strategy" },
  { label: "Technology Solutions", href: "/services/technology-solutions" },
  { label: "E-commerce", href: "/services/ecommerce-solutions" },
  { label: "Branding & Creative", href: "/services/branding-creative" },
  { label: "Marketing & Growth", href: "/services/marketing-growth" },
  { label: "Legal Compliance", href: "/services/legal-regulatory-compliance" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/#services" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-gray-500 select-none border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top: brand + columns */}
        <div className="pt-14 sm:pt-16 pb-12 sm:pb-14 grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-6 max-w-[360px]">
            <Link href="/" className="self-start">
              <img
                src="/images/logo.png"
                alt="Slatout"
                className="h-6 w-auto object-contain invert brightness-200"
              />
            </Link>
            <p className="type-body text-[14px] sm:text-[15px] text-gray-400 leading-relaxed">
              Strategy-led development, compliance, and growth systems for founders who build with intent.
            </p>
            <div className="flex flex-col gap-2">
              <span className="type-label text-[10px] text-gray-500">Studio</span>
              <span className="type-caption text-[13px] text-gray-400">
                London, United Kingdom · Remote Global
              </span>
            </div>
            <TextCta href="mailto:hello@slatout.com" tone="light" className="!text-[14px]">
              hello@slatout.com
            </TextCta>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8">
            <div>
              <span className="type-label text-[10px] text-gray-500 block mb-4">Services</span>
              <ul className="flex flex-col gap-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="type-nav text-[13px] text-gray-400 hover:text-white transition-colors duration-300 inline-flex"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="type-label text-[10px] text-gray-500 block mb-4">Company</span>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="type-nav text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <span className="type-label text-[10px] text-gray-500 block mb-4 mt-10">Social</span>
              <ul className="flex flex-col gap-2.5">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="type-nav text-[13px] text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="type-label text-[10px] text-gray-500 block mb-4">Next step</span>
              <p className="type-body text-[13px] text-gray-400 mb-5 max-w-[240px]">
                Tell us what you&apos;re building. We&apos;ll reply within one business day.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#F26522] text-white type-button text-[13px] rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[#FE7004] hover:-translate-y-0.5 transition-all duration-500 ease-out-expo shadow-[0_8px_24px_rgba(242,101,34,0.2)]"
              >
                <span>Book a strategy call</span>
                <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-custom group-hover:-rotate-45">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 sm:py-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="type-caption text-[12px] text-gray-500">
            © {year} Slatout. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 type-caption text-[12px]">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              Terms
            </a>
            <span className="text-gray-600">Crafted in London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
