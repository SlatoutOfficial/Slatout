"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "../../data/blogs";
import SiteEnd from "../../components/SiteEnd";

const categories = ["All", "Design", "Marketing", "Engineering"];
const articles = Object.values(blogPosts);

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  // Take the first article as the featured one
  const featured = articles[0];

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-12 bg-[#FAF8F5] border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F97432]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#F97432] shadow-sm shrink-0">
                <BookOpen size={16} />
              </div>
              <span className="type-label text-[12px] border border-gray-300 rounded-full px-3.5 py-1 text-gray-800">
                Company Journal
              </span>
            </div>
            <h1 className="type-hero text-[clamp(2.2rem,6vw,4rem)] text-gray-900 mt-2">
              Blogs & Insights
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[620px] mt-2">
              Writing on product architecture, legal frameworks, performance marketing, and conversion-focused design systems.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article & Listing Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Render Spotlight Card only when "All" category is selected */}
          {activeCategory === "All" && featured && (
            <div className="mb-14">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97432] block mb-4">
                Featured Spotlight
              </span>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 bg-gray-50 border border-gray-150 rounded-3xl overflow-hidden hover:border-[#F97432]/30 hover:shadow-[0_12px_40px_rgba(249,116,50,0.02)] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-video lg:aspect-auto min-h-[260px] lg:h-full overflow-hidden bg-gray-200">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-[1.02]"
                  />
                </div>
                
                {/* Info Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 type-label text-[10px] text-gray-400 mb-3">
                      <span>{featured.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{featured.date}</span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl type-card-title text-gray-900 mb-3 group-hover:text-[#F97432] transition-colors">
                      {featured.title}
                    </h2>
                    
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                      {featured.desc}
                    </p>
                  </div>

                  <div className="w-full border-t border-gray-200/80 pt-5 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                        <img src={featured.author.avatar} alt={featured.author.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block leading-none">{featured.author.name}</span>
                        <span className="text-[9px] text-gray-400 font-medium mt-0.5 block">{featured.author.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                      <span>Read Article</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Dynamic Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
              Latest Articles ({filteredArticles.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <Link
                  href={`/blogs/${article.slug}`}
                  key={idx}
                  className="group flex flex-col justify-between bg-white border border-gray-150 rounded-3xl p-5 hover:border-[#F97432]/30 hover:shadow-[0_12px_40px_rgba(249,116,50,0.02)] transition-all duration-500 cursor-pointer"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 mb-5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 type-label text-[10px] text-gray-400 mb-2.5">
                      <span>{article.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{article.date}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#F97432] transition-colors flex items-start justify-between gap-2">
                      <span>{article.title}</span>
                      <ArrowUpRight size={15} className="text-gray-300 group-hover:text-[#F97432] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />
                    </h4>

                    <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-6">
                      {article.desc}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                        <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-800">{article.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                      <Clock size={11} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
      <SiteEnd />
    </main>
  );
}
