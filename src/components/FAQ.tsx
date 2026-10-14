"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { WordRevealHeading, FadeUp } from "./Motion";

const faqItems = [
  {
    question: "What services does your agency specialize in?",
    answer: "We specialize in company setup, legal incorporation, bookkeeping, statutory compliance (GST/TDS), high-performance tech development (Next.js, custom software), and conversion-focused performance marketing."
  },
  {
    question: "How fast can you set up and register a new company?",
    answer: "We complete company incorporation (Pvt Ltd, LLP, OPC, etc.) in 3 to 5 business days, including GST registrations, PAN/TAN allocations, and Startup India recognition management, handling all government filings end-to-end."
  },
  {
    question: "Do you handle monthly GST filing, tax returns, and bookkeeping compliance?",
    answer: "Yes. Our Finance, Tax & Compliance team handles accounting, monthly/quarterly GST filings, Income Tax returns, TDS submissions, payroll, and annual ROC filing compliance, guaranteeing penalty-free operation."
  },
  {
    question: "What digital technology and e-commerce platforms do you build?",
    answer: "We design and engineer high-performance corporate websites, bespoke headless Shopify storefronts, mobile apps, CRM/ERP integrations, and AI workflow automations using Next.js, GraphQL, and serverless architectures."
  },
  {
    question: "Do you assist with brand design, creative assets, and performance marketing?",
    answer: "Absolutely. We build custom visual identities (logos, design guides, packaging, UI/UX) and execute customer acquisition campaigns through performance marketing (Google & Meta Ads), local SEO, and automated lead generation."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FAF8F5] py-12 sm:py-16 border-b border-gray-200 overflow-hidden relative">
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F97432]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
        
        {/* Layout Grid: Left (Title & Call Card), Right (Accordion Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-[33%_67%] gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column */}
          <div className="flex flex-col items-start gap-6 h-full">
            <FadeUp delay={0.05} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97432] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 font-mono">
                  FAQs
                </span>
              </div>
              <WordRevealHeading
                text="Frequently Asked Questions"
                className="text-[clamp(2rem,5vw,3rem)] type-section text-gray-900 font-bold leading-tight"
              />
            </FadeUp>

            {/* Book a Call Card (Stretched to match right accordion height) */}
            <FadeUp delay={0.15} className="w-full flex-1 h-full flex flex-col">
              <div 
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 20, 0.85), rgba(15, 15, 20, 0.95)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                className="bg-zinc-950 rounded-[2rem] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-zinc-800 flex flex-col items-start justify-between w-full flex-1 h-full min-h-[300px]"
              >
                {/* Top content group */}
                <div className="flex flex-col gap-6 items-start w-full">
                  {/* Avatar with soft orange glow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#F97432]/30 rounded-full blur-md" />
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-800 relative z-10 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                        alt="Expert Consultant" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-semibold text-lg sm:text-xl leading-tight">
                      Book a 15 min call
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-[13.5px] leading-relaxed">
                      If you have any questions, just book a 15-minute call with us to discuss your project.
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <a 
                  href="#contact" 
                  className="w-full py-3.5 mt-6 bg-[#F97432] hover:bg-[#F97432] text-white rounded-full text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 shadow-md shadow-orange-500/10 active:scale-95"
                >
                  Book a Free Call!
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Accordion of cards */}
          <div className="flex flex-col gap-4">
            {faqItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-5 sm:p-6 transition-all duration-500 border ${
                    isOpen 
                      ? "border-gray-300 shadow-[0_12px_36px_rgba(0,0,0,0.03)]" 
                      : "border-gray-200/75 shadow-sm hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <h3 className={`text-base sm:text-[17px] leading-snug transition-colors duration-300 pr-4 ${
                      isOpen ? "text-gray-900 font-semibold" : "text-gray-800 font-medium group-hover:text-[#F97432]"
                    }`}>
                      {item.question}
                    </h3>
                    <div className="text-gray-400 group-hover:text-gray-700 transition-colors shrink-0">
                      {isOpen ? (
                        <X size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 text-xs sm:text-[13.5px] leading-relaxed pt-3 border-t border-gray-100 mt-3.5">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
