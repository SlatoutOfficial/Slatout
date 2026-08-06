"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, CreditCard, Landmark, Code, ShoppingBag, Palette, Megaphone, ShieldCheck } from "lucide-react";

const serviceCategories = [
  {
    id: 1,
    slug: "business-setup-legal",
    title: "Business Setup & Legal",
    desc: "Helping entrepreneurs legally establish and protect their businesses.",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Company Registration (Pvt Ltd, OPC)",
      "LLP Registration",
      "Partnership Firm Registration",
      "Proprietorship Registration",
      "GST Registration",
      "MSME Registration",
      "Startup India Registration",
      "Trademark Registration"
    ],
    metric: "Incorporation"
  },
  {
    id: 2,
    slug: "finance-tax-compliance",
    title: "Finance, Tax & Compliance",
    desc: "Managing the financial backbone of businesses.",
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Accounting & Bookkeeping",
      "GST Filing & Compliance",
      "Income Tax Filing",
      "TDS Filing",
      "ROC Compliance",
      "Payroll Processing",
      "Audit & Assurance"
    ],
    metric: "Tax Filing"
  },
  {
    id: 3,
    slug: "business-consulting-strategy",
    title: "Business Consulting & Strategy",
    desc: "Helping founders make better business decisions.",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Startup Consulting",
      "Business Consulting",
      "Business Strategy",
      "Business Planning",
      "Market Research",
      "Competitor Analysis",
      "Industry Research"
    ],
    metric: "Strategy"
  },
  {
    id: 4,
    slug: "technology-solutions",
    title: "Technology Solutions",
    desc: "Building digital infrastructure for businesses.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Corporate Websites",
      "Business Websites",
      "E-commerce Websites",
      "Shopify Development",
      "WooCommerce Development",
      "Custom Software Development",
      "Mobile App Development"
    ],
    metric: "Next.js & API"
  },
  {
    id: 5,
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    desc: "Helping brands launch and scale online.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Shopify Store Setup",
      "WooCommerce Store Setup",
      "Amazon Seller Setup",
      "Flipkart Seller Setup",
      "Meesho Seller Setup",
      "Product Listing",
      "Product Catalog Management"
    ],
    metric: "Omnichannel"
  },
  {
    id: 6,
    slug: "branding-creative",
    title: "Branding & Creative",
    desc: "Building memorable brands.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Brand Strategy",
      "Brand Positioning",
      "Brand Naming",
      "Logo Design",
      "Visual Identity Design",
      "Brand Guidelines",
      "Packaging Design"
    ],
    metric: "Visual Systems"
  },
  {
    id: 7,
    slug: "marketing-growth",
    title: "Marketing & Growth",
    desc: "Helping businesses acquire customers and increase revenue.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "Digital Marketing",
      "Performance Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Local SEO",
      "Social Media Marketing"
    ],
    metric: "Paid Acquisition"
  },
  {
    id: 8,
    slug: "legal-regulatory-compliance",
    title: "Legal & Regulatory Compliance",
    desc: "Helping businesses stay legally compliant throughout their lifecycle.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
    subServices: [
      "ROC Compliance",
      "Annual Compliance",
      "Board Resolutions & Minutes",
      "Shareholding & Company Secretarial Support",
      "Legal Documentation",
      "Business Agreements"
    ],
    metric: "Compliance Audit"
  }
];

import { WordRevealHeading, FadeUp, StaggerContainer, StaggerChild } from "./Motion";
import { TextCta } from "./CtaSystem";

export default function Services() {
  return (
    <section id="services" className="bg-[#F5F5F5] py-14 sm:py-20 border-b border-gray-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div className="flex flex-col items-start gap-4">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  2
                </div>
                <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                  Services
                </span>
              </div>
            </FadeUp>
            <WordRevealHeading
              text="Solutions built for business scalability."
              className="text-[clamp(1.75rem,7vw,3.2rem)] sm:text-[clamp(2.2rem,5vw,3.2rem)] type-section text-gray-900 max-w-[800px]"
            />
          </div>
          <FadeUp delay={0.15}>
            <TextCta href="#industries" className="sm:mb-1" tone="muted">
              See industry expertise
            </TextCta>
          </FadeUp>
        </div>

        {/* 8 Services Grid with Stagger Container */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;

            return (
              <StaggerChild key={cat.id}>
                <Link
                  href={`/services/${cat.slug}`}
                  className="group relative bg-white border border-gray-200/60 rounded-[2rem] flex flex-col justify-between min-h-[380px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(242,101,34,0.03)] hover:border-[#F26522]/30 hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="flex flex-col w-full">
                    {/* Card Cover Image (Flush 100% Width) */}
                    <div className="relative aspect-[16/10] bg-gray-100 w-full overflow-hidden shrink-0">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Card Content Details (With padding) */}
                    <div className="px-5 pt-5">
                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#F26522] group-hover:bg-[#F26522]/10 transition-colors duration-300 shrink-0">
                          <Icon size={14} className="stroke-[1.5]" />
                        </div>
                        <h3 className="type-card-title text-[14px] text-gray-900 group-hover:text-[#F26522] transition-colors duration-300">
                          {cat.title}
                        </h3>
                      </div>

                      {/* Short Description */}
                      <p className="type-body text-gray-500 text-[11px] mt-2.5">
                        {cat.desc}
                      </p>

                      {/* Top 3 Sub-services Preview List */}
                      <div className="flex flex-col gap-1.5 mt-4">
                        {cat.subServices.slice(0, 3).map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#F26522] opacity-60" />
                            <span className="text-[11px] font-medium text-gray-600 truncate">{sub}</span>
                          </div>
                        ))}
                        {cat.subServices.length > 3 && (
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1 block">
                            + {cat.subServices.length - 3} services
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Metric and explore CTA (With padding) */}
                  <div className="border-t border-gray-100 px-5 pb-5 pt-3.5 flex justify-between items-center w-full mt-auto">
                    <span className="text-[9px] text-[#F26522] bg-orange-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {cat.metric}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-900 group-hover:text-[#F26522] transition-colors duration-300">
                      <span className="relative">
                        View solution
                        <span className="absolute left-0 -bottom-px h-[1px] w-full origin-left scale-x-0 bg-[#F26522] transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                      </span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerChild>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
