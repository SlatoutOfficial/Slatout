"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { WordRevealHeading, FadeUp } from "./Motion";
import { TextCta } from "./CtaSystem";

const reviews = [
  {
    id: 1,
    type: "text",
    quote: "The team at Slatout has provided our startup with significant leverage. Their work is exceptionally professional, and their engineers are always attentive to our needs, taking the time to understand our briefs and offer valuable direction. Additionally, their turnaround times are impressively fast!",
    author: "Marc Henderson",
    role: "Founder & CEO at Aether Platforms",
    avatar: "/images/ceo.png"
  },
  {
    id: 2,
    type: "video",
    quote: "The load speeds are now sub-second, and our conversion rate increased by 42% in month one.",
    author: "Elena Rostova",
    role: "Growth Director at Apex Retail",
    avatar: "/images/director.png",
    bgImage: "/images/director.png"
  },
  {
    id: 3,
    type: "text",
    quote: "The brand strategy and performance marketing campaigns Slatout executed doubled our lead pipeline in 90 days. They are a rare partner that masterfully combines creative branding, analytics, and custom tech automation.",
    author: "Dr. Aris Vance",
    role: "Managing Partner at Luminar Digital",
    avatar: "/images/founder.png"
  },
  {
    id: 4,
    type: "text",
    quote: "Slatout has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the development builds are clean, modern, and absolutely spot on!",
    author: "Rob West",
    role: "CEO of Kingdom Advisors",
    avatar: "/images/ceo.png"
  },
  {
    id: 5,
    type: "text",
    quote: "Working with them was the best decision we made this year. They took over our entire product design system and engineering sprint pipeline, delivering the core modules ahead of schedule.",
    author: "Sarah Jenkins",
    role: "Co-Founder at Velo Systems",
    avatar: "/images/director.png"
  }
];

// Triple the list to create the infinite scroll list
const clonedReviews = [...reviews, ...reviews, ...reviews];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set initial scroll position to the middle clone group
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Wait slightly to ensure rendering completes
    const timeoutId = setTimeout(() => {
      const oneThird = container.scrollWidth / 3;
      container.scrollLeft = oneThird;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Autoscroll timer
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth } = container;
    const oneThird = scrollWidth / 3;

    // Reset scroll positions at boundaries to create infinite loop effect
    if (scrollLeft < 10) {
      container.scrollLeft = oneThird + scrollLeft;
    } else if (scrollLeft >= oneThird * 2 - 10) {
      container.scrollLeft = scrollLeft - oneThird;
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const cardWidth = 374; // Estimated card width (350px) + gap (24px)
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-[#F5F5F5] py-14 sm:py-20 border-b border-gray-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Top Header Row with Navigation Arrows & Number Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  8
                </div>
                <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                  Testimonials
                </span>
              </div>
            </FadeUp>
            <WordRevealHeading
              text="Don't take our word for it! Hear it from our partners."
              className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 mt-1 max-w-[800px]"
            />
          </div>
          
          {/* Arrow Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              aria-label="Previous testimonials"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              aria-label="Next testimonials"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Track with Infinite loop event hooks */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {clonedReviews.map((rev, index) => {
            if (rev.type === "video") {
              return (
                /* Card 2: Featured Video/Image Card */
                <div
                  key={`rev-video-${index}`}
                  className="w-[280px] sm:w-[350px] shrink-0 snap-start rounded-[2rem] relative min-h-[440px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] group"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${rev.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  {/* Top-left Avatar Badge */}
                  <div className="absolute top-6 left-6 w-9 h-9 rounded-full overflow-hidden border border-white/20">
                    <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-350 hover:bg-white/30">
                      <Play size={16} className="fill-white translate-x-[1px]" />
                    </button>
                  </div>

                  {/* White bottom text info */}
                  <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                    <h3 className="font-signature text-4xl leading-none text-white tracking-wide">
                      {rev.author}
                    </h3>
                    <p className="type-caption text-[10px] text-white/80 uppercase tracking-[0.06em] mt-1.5">
                      {rev.role}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              /* Card: Standard Text Testimonial Card */
              <div
                key={`rev-text-${index}`}
                className="w-[280px] sm:w-[350px] shrink-0 snap-start bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between min-h-[440px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] group"
              >
                {/* Top Avatar Row */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>

                {/* Quote Block */}
                <div className="flex-1 flex flex-col justify-center my-6">
                  <p className="type-body text-gray-700 text-xs sm:text-[13px] text-left">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info Block */}
                <div className="text-left">
                  <h3 className="font-signature text-4xl leading-none text-gray-900 tracking-wide">
                    {rev.author}
                  </h3>
                  <p className="type-caption text-[9px] text-gray-400 uppercase tracking-[0.06em] mt-1.5">
                    {rev.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <FadeUp delay={0.1} className="mt-8 flex justify-start sm:justify-end">
          <TextCta href="#faq" tone="muted">
            Common questions answered
          </TextCta>
        </FadeUp>

      </div>
    </section>
  );
}
