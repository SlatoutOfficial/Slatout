"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Phone, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#09080E] text-zinc-400 pt-16 sm:pt-20 pb-8 sm:pb-10 select-none border-t border-zinc-900">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Sitemap and Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
          
          {/* Brand Left Column */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/images/slatout-logo.jpeg"
                alt="Slatout Logo"
                className="h-8 w-auto object-contain rounded-md"
              />
              <span className="text-white font-bold text-xl tracking-tight">Slatout</span>
            </Link>
            <p className="text-zinc-400 text-[13px] sm:text-[14px] leading-relaxed max-w-[280px] font-light mb-2">
              Premium venture builder and technology agency partnering with bold founders to design, build, and scale exceptional digital products.
            </p>
            <div className="flex items-center gap-4 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={16} /></a>
              <a href="#" className="hover:text-white transition-colors"><Globe size={16} /></a>
            </div>
          </div>

          {/* Column Company */}
          <div>
            <span className="text-[14px] font-semibold text-white block mb-5">Company</span>
            <ul className="flex flex-col gap-3">
              {["About Us", "Services", "Community", "Testimonial"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-[13px] sm:text-[14px] text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Support */}
          <div>
            <span className="text-[14px] font-semibold text-white block mb-5">Support</span>
            <ul className="flex flex-col gap-3">
              {["Help Center", "Tweet @ Us", "Webians", "Feedback"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-[13px] sm:text-[14px] text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Links */}
          <div>
            <span className="text-[14px] font-semibold text-white block mb-5">Links</span>
            <ul className="flex flex-col gap-3">
              {["Courses", "Become Teacher", "Service", "All in One"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-[13px] sm:text-[14px] text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Contact Us */}
          <div className="flex flex-col items-start">
            <span className="text-[14px] font-semibold text-white block mb-5">Contact Us</span>
            <div className="flex flex-col gap-4 w-full">
              <a href="tel:+9198765432154" className="flex items-center gap-3 text-[13px] sm:text-[14px] text-zinc-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-800 transition-all shrink-0">
                  <Phone size={14} />
                </div>
                <span className="font-medium">(91) 98765 4321 54</span>
              </a>
              <a href="mailto:support@mail.com" className="flex items-center gap-3 text-[13px] sm:text-[14px] text-zinc-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-800 transition-all shrink-0">
                  <Mail size={14} />
                </div>
                <span className="font-medium">support@mail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="border-t border-zinc-800/80 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-zinc-500">
          <span>© {year} Slatout. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
            <Link href="#" className="hover:text-white transition-colors">Site Map</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
