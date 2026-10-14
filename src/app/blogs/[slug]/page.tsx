"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { ArrowLeft, BookOpen, Clock, HelpCircle, Send, Share2 } from "lucide-react";
import { blogPosts } from "../../../data/blogs";
import SiteEnd from "../../../components/SiteEnd";

export default function SingleBlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // If blog slug is invalid, redirect or show safe fallback
  if (!post) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 select-none">
          <HelpCircle size={48} className="text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Article Not Found</h1>
          <p className="text-gray-500 text-sm mt-1 mb-6">The requested blog post does not exist or has moved.</p>
          <Link href="/blogs" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">
            Back to Journal
          </Link>
        </div>
        <SiteEnd />
      </main>
    );
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Header Info Block */}
      <section className="relative pt-24 pb-10 bg-[#FAF8F5] border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F97432]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 select-none">
          
          {/* Breadcrumbs & Share */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
            <Link
              href="/blogs"
              className="group flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Back to Journal
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#F97432] transition-colors"
            >
              <Share2 size={13} />
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>
          </div>

          <div className="max-w-[800px]">
            {/* Metadata Tags */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#F97432] uppercase tracking-widest mb-3">
              <span>{post.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <span className="text-gray-400">{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={11} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-[clamp(1.8rem,5vw,3.2rem)] type-section text-gray-900 mt-2">
              {post.title}
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
              {post.desc}
            </p>

            {/* Author Profile */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200/60">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block leading-none">{post.author.name}</span>
                <span className="text-[10px] text-gray-400 font-semibold mt-1 block">{post.author.role}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Blog Post Content */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-[68%_32%] gap-12 lg:gap-16">
            
            {/* Left: Article Copy */}
            <article className="max-w-[760px] text-left">
              {/* Banner Image */}
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-150 mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              {/* Loop body sections */}
              <div className="flex flex-col gap-8">
                {post.content.map((sec, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <h2 className="text-lg sm:text-xl type-card-title text-gray-900">
                      {sec.heading}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-[14px] sm:text-base leading-relaxed">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags block */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                  Categorized Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Right Sidebar: Quick newsletter or contact widget */}
            <aside className="flex flex-col gap-6 lg:max-w-[340px] w-full">
              <div className="bg-[#FAF8F5] border border-gray-200/80 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block border-b border-gray-200/60 pb-2 mb-4">
                    Subscribe to Insights
                  </span>
                  <p className="text-gray-500 text-xs leading-relaxed mb-5">
                    Get monthly engineering reports, legal revisions, and strategy frameworks delivered directly to your inbox.
                  </p>

                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                    <input
                      required
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:border-[#F97432] focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="group flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white text-[12px] font-semibold rounded-full pl-5 pr-1.5 py-1.5 transition-colors duration-300 w-full"
                    >
                      <span>Join Newsletter</span>
                      <div className="w-5 h-5 bg-white text-gray-900 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 duration-300">
                        <Send size={10} className="stroke-[3]" />
                      </div>
                    </button>
                  </form>

                  {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl p-3 text-xs text-center mt-3 animate-fadeIn">
                      Successfully subscribed!
                    </div>
                  )}
                </div>
              </div>

              {/* CTA card to main contact */}
              <div className="bg-[#111111] text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97432]/10 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Have a scaling hurdle?</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Speak with our engineering & legal specialists directly to establish corporate stability.
                  </p>
                </div>
                
                <Link
                  href="/#contact"
                  className="group flex items-center gap-1.5 text-xs font-bold text-[#F97432] mt-4"
                >
                  Inquire Now
                  <ArrowLeft size={14} className="rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <SiteEnd />
    </main>
  );
}
