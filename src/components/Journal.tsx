"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "../data/blogs";

import { WordRevealHeading, FadeUp, StaggerContainer, StaggerChild } from "./Motion";
import { TextCta } from "./CtaSystem";

const articles = Object.values(blogPosts);

export default function Journal() {
  return (
    <section id="blogs" className="bg-[#F5F5F5] py-14 sm:py-20 border-b border-gray-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col items-start gap-3">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[11px] font-semibold flex items-center justify-center">
                  7
                </div>
                <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                  Blogs & Insights
                </span>
              </div>
            </FadeUp>
            <WordRevealHeading
              text="Stories, strategies, and engineering logs from our build cycles."
              className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 max-w-[900px]"
            />
          </div>
          <FadeUp delay={0.15}>
            <TextCta href="/blogs" className="sm:mb-1">
              Explore more articles
            </TextCta>
          </FadeUp>
        </div>

        {/* Articles Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <StaggerChild key={index}>
              <Link href={`/blogs/${article.slug}`} className="flex flex-col group cursor-pointer h-full">
                
                {/* Image Thumbnail Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Date & Category */}
                <div className="flex items-center gap-2 mt-5 mb-2 type-label text-[11px] text-gray-500">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="type-card-title text-[17px] sm:text-[19px] text-gray-900 group-hover:text-[#F26522] transition-colors duration-300 flex items-start justify-between gap-2">
                  <span>{article.title}</span>
                  <ArrowUpRight size={16} className="text-gray-400 group-hover:text-[#F26522] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-1" />
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[14px] text-gray-600 mt-2.5 leading-relaxed">
                  {article.desc}
                </p>

              </Link>
            </StaggerChild>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
