"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WordRevealHeading, FadeUp } from "./Motion";

const reviews = [
  {
    id: 1,
    author: "Ethan Parker",
    role: "CTO, NextGen SaaS",
    quote: "This AI completely transformed our lead strategy dead-end prospects disappeared, and we're closing deals faster than ever with incredible efficiency!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["SaaS", "L. Conversion", "Sales Boost"]
  },
  {
    id: 2,
    author: "Emily Nguyen",
    role: "Operations Manager, CloudSync Ltd.",
    quote: "Manual tasks vanished overnight. AI automation saved us countless hours and synced our CRM seamlessly, revolutionizing our entire workflow process!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["Cloud Dev", "Automation", "CRM Sync"]
  },
  {
    id: 3,
    author: "James Carter",
    role: "Marketing Director, Zenith Agency",
    quote: "Generic cold emails are dead. The AI email outreach and sequence generation doubled our campaign response rates, enabling us to deliver outstanding client success!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["AI", "Email Outreach", "Agency Success"]
  },
  {
    id: 4,
    author: "Sarah Jenkins",
    role: "Co-Founder, Velo Systems",
    quote: "We launched our Next.js dashboard ahead of schedule. Their engineering team is lightning-fast, and the frontend clean code they delivered exceeded our expectations!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["Next.js", "Product Design", "Agile Dev"]
  },
  {
    id: 5,
    author: "Marc Henderson",
    role: "CEO, Aether Platforms",
    quote: "Slatout provided us with massive scale. They set up our corporate entities, handled intellectual property, and structured our regulatory filings flawlessly.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["Legal Stack", "IP Protection", "Compliance"]
  },
  {
    id: 6,
    author: "Elena Rostova",
    role: "Growth Lead, Apex Retail",
    quote: "Our page load speeds went sub-second. Their headless dev implementation and search engine optimization drove a 42% spike in store checkout conversions.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    businessTypes: ["E-Commerce", "Headless", "SEO Audit"]
  }
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevIdx = (activeIdx - 1 + reviews.length) % reviews.length;
  const nextIdx = (activeIdx + 1) % reviews.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="bg-[#09080E] py-10 sm:py-12 border-b border-gray-900 overflow-hidden relative">
      {/* Background glow blobs */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#F97432]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#F97432]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 text-center">
          <FadeUp delay={0.05} className="flex flex-col items-center">
            <span className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white/75 border border-white/10 font-mono mb-2 inline-block">
              OUR CUSTOMERS
            </span>
            <WordRevealHeading
              text="Our success stories"
              className="text-white text-[clamp(2.2rem,6vw,3.5rem)] font-bold tracking-tight text-center leading-tight mb-2"
            />
            <p className="text-gray-400 text-xs sm:text-sm max-w-[540px] leading-relaxed">
              Real leaders share how they crushed dead-end leads and boosted sales with our game-changing AI solutions.
            </p>
          </FadeUp>
        </div>

        {/* Customer Avatars Selection Row */}
        <FadeUp delay={0.1} className="w-full flex justify-center mb-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap max-w-2xl">
            {reviews.map((rev, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={rev.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "w-14 h-14 sm:w-16 sm:h-16 ring-[3px] ring-white ring-offset-2 ring-offset-[#09080E] opacity-100 scale-105 z-10"
                      : "w-10 h-10 sm:w-11 sm:h-11 border border-white/10 opacity-30 hover:opacity-75 hover:scale-102 scale-95"
                  }`}
                >
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Carousel Cards Showcase */}
        <div className="relative flex items-center justify-center w-full">
          <div className="flex items-center gap-6 w-full max-w-[1200px] justify-center px-4 overflow-hidden">
            {/* Left Card (faded neighbor on desktop) */}
            <div className="hidden md:block w-[300px] shrink-0 opacity-15 scale-90 blur-[1px] transition-all duration-700 pointer-events-none select-none">
              <TestimonialCard item={reviews[prevIdx]} isActive={false} />
            </div>

            {/* Central Active Card */}
            <div className="w-full max-w-[650px] shrink-0 z-10 transition-all duration-700 scale-100 opacity-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TestimonialCard item={reviews[activeIdx]} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Card (faded neighbor on desktop) */}
            <div className="hidden md:block w-[300px] shrink-0 opacity-15 scale-90 blur-[1px] transition-all duration-700 pointer-events-none select-none">
              <TestimonialCard item={reviews[nextIdx]} isActive={false} />
            </div>
          </div>
        </div>

        {/* Navigation Arrow Controls */}
        <FadeUp delay={0.2} className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-[#18181B] border border-gray-800 text-white flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all cursor-pointer shadow-md"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-[#18181B] border border-gray-800 text-white flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all cursor-pointer shadow-md"
            aria-label="Next testimonial"
          >
            <ArrowRight size={16} />
          </button>
        </FadeUp>

      </div>
    </section>
  );
}

// Subcomponent for the cards
function TestimonialCard({ item, isActive }: { item: typeof reviews[0]; isActive: boolean }) {
  return (
    <div
      className={`bg-[#131217] rounded-[2rem] p-6 sm:p-8 transition-all duration-500 border flex flex-col md:grid md:grid-cols-[38%_62%] gap-6 md:gap-8 min-h-[280px] ${
        isActive
          ? "border-[#F97432]/80 shadow-[0_20px_50px_rgba(249,116,50,0.08)]"
          : "border-gray-800/80"
      }`}
    >
      {/* Left Column: Business Types */}
      <div className="flex flex-col justify-between pr-4 md:border-r md:border-gray-800/60">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 font-semibold text-[11px] uppercase tracking-wider mb-4 font-mono">
            <span className="text-gray-400 text-sm">*</span> Business Types
          </div>
          <div className="flex flex-wrap gap-2">
            {item.businessTypes.map((type, idx) => (
              <span
                key={idx}
                className="bg-[#212026] border border-gray-800 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300 font-mono"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Review Details */}
      <div className="flex flex-col justify-between md:pl-2">
        <div className="space-y-4">
          {/* Author Details */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-700 shadow-sm shrink-0">
              <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold text-white block leading-tight">{item.author}</span>
              <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{item.role}</span>
            </div>
          </div>

          {/* Stars Rating */}
          <div className="flex items-center gap-0.5 text-amber-500 pt-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-400 text-xs font-semibold ml-1.5">5.0</span>
          </div>

          {/* Testimonial Quote */}
          <p className="text-white text-xs sm:text-[13px] leading-relaxed font-light italic text-left">
            "{item.quote}"
          </p>
        </div>
      </div>
    </div>
  );
}
