"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { blogPosts } from "../data/blogs";
import { WordRevealHeading, FadeUp } from "./Motion";
import { ArrowUpRight, BookOpen, Clock, Tag, Sparkles, CheckCircle, ChevronRight } from "lucide-react";

const articles = Object.values(blogPosts);

const CATEGORIES = [
  "All",
  "Business Setup",
  "Digital Growth",
  "E-Commerce",
  "Technology"
];

export default function Journal() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articles;
    return articles.filter((a) => a.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(a.category.toLowerCase()));
  }, [selectedCategory]);

  const featured = filteredArticles[0] || articles[0];
  const secondaryArticles = filteredArticles.slice(1, 4).length > 0 
    ? filteredArticles.slice(1, 4) 
    : articles.filter((a) => a.slug !== featured.slug).slice(0, 3);

  return (
    <section id="insights" className="relative bg-[#FAF8F5] py-20 sm:py-28 select-none border-b border-stone-200/80 overflow-hidden">
      
      {/* Subtle background glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF5500]/[0.025] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <FadeUp delay={0.05} className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[2px] bg-[#FF5500]" />
              <span className="text-[11px] font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em]">
                FOUNDER INTELLIGENCE & INSIGHTS
              </span>
            </div>

            <WordRevealHeading
              text="Practical perspectives for founders building to last."
              className="text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold text-[#111] tracking-tight leading-[1.08] mb-3"
            />

            <p className="text-stone-600 text-[14px] sm:text-base leading-relaxed">
              Plain-English legal breakdowns, modern AI search protocols, and unit-economic formulas without the agency jargon.
            </p>
          </FadeUp>

          {/* Category Filter Chips */}
          <FadeUp delay={0.1} className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#111] text-white shadow-sm"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:text-[#111]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </FadeUp>
        </div>

        {/* 1. Featured Spotlight Article */}
        {featured && (
          <div className="mb-8 sm:mb-10">
            <FadeUp delay={0.15}>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group relative block w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-stone-900 border border-stone-800 shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[380px] sm:min-h-[420px]">
                  
                  {/* Left Column: Image with gradient */}
                  <div className="relative w-full h-[240px] sm:h-[300px] lg:h-full overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent pointer-events-none" />
                    
                    {/* Floating Pill on image */}
                    <div className="absolute top-5 left-5">
                      <span className="backdrop-blur-md bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-widest shadow-lg">
                        {featured.category}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Editorial Text & Meta */}
                  <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                          {featured.readTime}
                        </span>
                        <span>•</span>
                        <span>{featured.date}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                        {featured.title}
                      </h3>

                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                        {featured.desc}
                      </p>

                      {/* Content Preview points */}
                      {featured.content && featured.content.length > 0 && (
                        <div className="space-y-1.5 mb-6 hidden sm:block">
                          {featured.content.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-stone-400">
                              <CheckCircle className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                              <span className="truncate">{item.heading}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Author & Button Row */}
                    <div className="flex items-center justify-between gap-4 pt-6 border-t border-stone-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          className="w-9 h-9 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{featured.author.name}</div>
                          <div className="text-[11px] text-stone-400">{featured.author.role}</div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] group-hover:text-white transition-colors duration-300">
                        <span>Read Full Guide</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                  </div>

                </div>
              </Link>
            </FadeUp>
          </div>
        )}

        {/* 2. Secondary Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {secondaryArticles.map((post, idx) => (
            <FadeUp key={post.slug} delay={0.2 + idx * 0.05}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-stone-200/80 rounded-2xl overflow-hidden p-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-stone-300"
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 mb-5 border border-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 backdrop-blur-md bg-white/90 text-[#111] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                    {post.category}
                  </div>
                </div>

                {/* Post Metadata */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400 mb-2">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h4 className="text-[16px] sm:text-[17px] font-bold text-[#111] leading-snug mb-2.5 group-hover:text-[#FF5500] transition-colors duration-300">
                  {post.title}
                </h4>

                {/* Description */}
                <p className="text-[12.5px] text-stone-500 leading-relaxed mb-6 flex-1 line-clamp-2">
                  {post.desc}
                </p>

                {/* Footer: Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-[12px] font-semibold text-stone-600">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-[#FF5500] transition-colors">
                    Read
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* 3. Bottom Action Banner */}
        <FadeUp delay={0.35} className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#111] mb-1">
              Want actionable founder blueprints in your inbox?
            </h4>
            <p className="text-xs sm:text-sm text-stone-500">
              No sales pitches. Just tactical teardowns of regulatory updates, performance marketing math, and tech architecture.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#ff6614] text-white font-bold text-xs sm:text-[13px] px-6 py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(255,85,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore all articles</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
