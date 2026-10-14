"use client";

import React from "react";
import Link from "next/link";
import { blogPosts } from "../data/blogs";
import { WordRevealHeading, FadeUp } from "./Motion";
import { ArrowUpRight } from "lucide-react";

const articles = Object.values(blogPosts);

export default function Journal() {
  const featured = articles[0];
  const gridPosts = articles.slice(1, 4); // Posts 2, 3, and 4

  return (
    <section id="blogs" className="relative bg-[#FAF8F5] py-16 sm:py-20 select-none border-b border-gray-200/80 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <FadeUp delay={0.05} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-7 h-[2px] bg-[#FF5500]" />
              <span className="text-[11px] font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em]">
                OUR JOURNAL
              </span>
            </div>
            <WordRevealHeading
              text="Latest Insights"
              className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-gray-900 tracking-tight text-center leading-[1.1] mb-3"
            />
            <p className="text-gray-500 text-[14px] sm:text-base max-w-[540px] leading-relaxed text-center mx-auto">
              Explore professional perspectives, technical guides, and business design frameworks compiled by the Slatout team.
            </p>
          </FadeUp>
        </div>

        {/* 2. Featured Post (Immersive Full-Bleed Card) */}
        {featured && (
          <div className="mb-6 sm:mb-8">
            <FadeUp delay={0.15}>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group relative block w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gray-900 shadow-2xl h-[320px] sm:h-[400px] lg:h-[440px] transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
                
                {/* Heavy Gradient Overlays for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-10">
                  {/* Top: Category Pill */}
                  <div className="flex justify-start">
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-widest shadow-lg">
                      {featured.category}
                    </span>
                  </div>

                  {/* Bottom: Text and Author */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 w-full">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-3 group-hover:text-[#FF5500] transition-colors duration-300">
                        {featured.title}
                      </h3>
                      <p className="text-gray-300 text-[13px] sm:text-[14px] leading-relaxed font-normal mb-5 max-w-lg hidden sm:block">
                        {featured.desc}
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                          <img
                            src={featured.author.avatar}
                            alt={featured.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">
                            {featured.author.name}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {featured.author.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Read Article Button (Hidden on small screens) */}
                    <div className="hidden md:flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-[13px] px-5 py-3 rounded-xl shadow-lg transition-all duration-300">
                      <span>Read Article</span>
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          </div>
        )}

        {/* 3. Grid Posts (Bottom Row - 3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {gridPosts.map((post, idx) => (
            <FadeUp key={post.slug} delay={0.2 + idx * 0.05}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex flex-col w-full h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-gray-100 mb-4 border border-gray-200/50 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Floating Category Badge */}
                  <span className="absolute top-3 right-3 backdrop-blur-md bg-white/90 text-gray-900 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="flex flex-col px-2">
                  <h4 className="text-gray-900 font-extrabold text-[17px] leading-snug mb-2 group-hover:text-[#FF5500] transition-colors duration-300">
                    {post.title}
                  </h4>
                  
                  {/* Author Mini */}
                  <div className="flex items-center gap-2 mt-auto">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-[12px] font-semibold text-gray-600">
                      {post.author.name}
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* 4. Center Bottom Explorer Button */}
        <FadeUp delay={0.35} className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#ff6614] text-white font-bold text-[13px] px-7 py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(255,85,0,0.39)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,85,0,0.23)] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>Explore all articles</span>
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
}
