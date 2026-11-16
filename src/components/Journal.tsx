"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "../data/blogs";

export default function Journal() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : [])
      .then((posts: BlogPost[]) => setArticles(Array.isArray(posts) ? posts : []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...listItems] = articles;

  return (
    <section id="insights" className="relative bg-[#FAF8F5] py-20 sm:py-28 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center mb-3.5">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7E786F]">INSIGHTS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-12 sm:mb-16">
          <h2 className="text-[#0E0D0C] font-extrabold tracking-[-0.04em] leading-[0.96] text-[clamp(2.6rem,5.5vw,4.6rem)] font-['Inter_Tight',sans-serif]">
            Guides for<br />your <em className="italic font-normal font-['Instrument_Serif',Georgia,serif] text-[#FF6A13]">next</em> step
          </h2>
          <p className="lg:max-w-[440px] pt-1 text-[#45434A] text-[15px] sm:text-[16px] leading-[1.55]">
            Practical, plain-language guides on setting up, building and growing a business in India, written by the people who do the work.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[28px] border border-[#E6E2D8] bg-white px-6 py-16 text-center text-sm text-[#77736b]">Loading the latest insights…</div>
        ) : featured ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-14 items-stretch">
            <Link href={`/blogs/${featured.slug}`} className="group relative rounded-[28px] sm:rounded-[34px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[480px] border border-[#2E5B34]/15 transition-all duration-300 hover:shadow-[0_20px_45px_-20px_rgba(46,91,52,0.22)] hover:-translate-y-0.5 overflow-hidden bg-[#E4EFE0]">
              <div className="absolute inset-0 z-0 overflow-hidden">
                {featured.image && <img src={featured.image} alt="" className="w-full h-full object-cover opacity-25 mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />}
                <div className="absolute inset-0" style={{background:"radial-gradient(420px circle at 85% 20%, rgba(255,255,255,.7), transparent 70%), linear-gradient(180deg, rgba(228,239,224,.35) 0%, rgba(228,239,224,.82) 48%, #E4EFE0 90%)"}} />
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[11px] font-mono font-semibold text-[#2E5B34] uppercase tracking-[0.14em]"><span className="w-1.5 h-1.5 rounded-full bg-[#2E5B34]"/><span>{featured.category}</span></div>
              <div className="relative z-10 mt-20">
                <h3 className="text-[#0E0D0C] font-extrabold text-[clamp(1.85rem,2.8vw,2.5rem)] tracking-[-0.035em] leading-[1.12] mb-3.5 group-hover:text-[#2E5B34] transition-colors font-['Inter_Tight',sans-serif]">{featured.title}</h3>
                <p className="text-[#45434A] text-[15px] sm:text-[16px] leading-[1.5] mb-6 max-w-[480px]">{featured.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#C24E00] underline underline-offset-4">Read the story <span>→</span></span>
              </div>
            </Link>
            <div className="flex flex-col justify-between divide-y divide-[#E6E2D8]">
              {listItems.slice(0, 3).map((item, index) => (
                <Link key={item.slug} href={`/blogs/${item.slug}`} className={`group block transition-all duration-200 ${index === 0 ? "pb-6 lg:pb-7" : index === 1 ? "py-6 lg:py-7" : "pt-6 lg:pt-7"}`}>
                  <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] mb-2 text-[#7E786F]"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6A13]"/><span>{item.category}</span></div>
                  <h4 className="text-[#0E0D0C] font-extrabold text-[clamp(1.18rem,1.45vw,1.4rem)] tracking-[-0.025em] leading-[1.25] mb-2 group-hover:text-[#FF6A13] transition-colors font-['Inter_Tight',sans-serif]">{item.title}</h4>
                  <p className="text-[#6E685E] text-[14px] leading-[1.48] mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[14px] font-bold text-[#0E0D0C] underline underline-offset-4 group-hover:text-[#FF6A13]">Read <span>→</span></span>
                </Link>
              ))}
              {listItems.length === 0 && <div className="flex flex-col justify-center py-10 text-[#77736b]"><p className="text-lg font-semibold text-[#0E0D0C]">More stories are on the way.</p><p className="mt-2 text-sm">Visit the journal soon for new insights.</p></div>}
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#D9D5CC] bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold text-[#0E0D0C]">Fresh thinking is on its way.</p>
            <p className="mt-2 text-sm text-[#77736b]">Check back soon for the latest from our team.</p>
            <Link href="/blogs" className="mt-5 inline-flex text-sm font-semibold text-[#C24E00] underline underline-offset-4">Visit the journal</Link>
          </div>
        )}
      </div>
    </section>
  );
}
