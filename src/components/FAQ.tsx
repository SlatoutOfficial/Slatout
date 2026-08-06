"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WordRevealHeading, FadeUp } from "./Motion";
import { TextCta } from "./CtaSystem";

const faqItems = [
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
    <section id="faq" className="bg-[#FFFFFF] py-12 sm:py-16 border-b border-gray-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Layout Grid: Left (Title), Right (Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col items-start gap-4">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  9
                </div>
                <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                  FAQ
                </span>
              </div>
            </FadeUp>
            <WordRevealHeading
              text="Frequently asked questions."
              className="text-[clamp(1.8rem,5vw,3.5rem)] type-section text-gray-900 max-w-[340px]"
            />
            <FadeUp delay={0.15}>
              <p className="type-body text-gray-500 text-[14px] max-w-[280px] mt-2 mb-5">
                Still weighing options? We typically reply within one business day.
              </p>
              <TextCta href="#contact" tone="brand">
                Still have questions?
              </TextCta>
            </FadeUp>
          </div>

          {/* Right Column Accordion */}
          <div className="flex flex-col border-t border-gray-200">
            {faqItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              
              return (
                <div
                  key={idx}
                  className="border-b border-gray-200 py-6 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <h3 className="type-card-title text-lg sm:text-xl text-gray-900 group-hover:text-[#F26522] transition-colors duration-300 pr-4">
                      {item.question}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#F26522] group-hover:border-transparent transition-all duration-500 shrink-0">
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {isOpen ? (
                          <Minus size={14} className="stroke-[2.5]" />
                        ) : (
                          <Plus size={14} className="stroke-[2.5]" />
                        )}
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable answers block */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="type-body text-gray-600 text-[14px] sm:text-[15px] max-w-[680px] pt-4">
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
