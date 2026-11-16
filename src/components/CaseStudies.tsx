"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <section id="projects" className="bg-white py-12 sm:py-16 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto select-none">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
            3
          </div>
          <span className="text-[12px] sm:type-nav text-[13px] border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800">
            Featured client work
          </span>
        </div>

        {/* Heading h2 */}
        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] type-section text-gray-900 mb-8 sm:mb-10">
          Our projects
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          
          {/* Card 1: Narrativ */}
          <div className="flex flex-col">
            {/* Video Container */}
            <div className="relative aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-105"
              />
              
              {/* Expandable White Button */}
              <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[148px] bg-white rounded-full flex items-center justify-start overflow-hidden transition-all duration-300 ease-in-out px-2.5 shadow-md">
                {/* Custom Link SVG icon (2 arcs) */}
                <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-900 transition-transform duration-300 -rotate-45 group-hover:rotate-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                
                {/* Learn More Text */}
                <span className="type-nav text-[13px] text-gray-900 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">
                  Learn more
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="mt-4">
              <span className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed block">
                Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement
              </span>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                Narrativ
              </h3>
            </div>
          </div>

          {/* Card 2: Luminar */}
          <div className="flex flex-col">
            {/* Video Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-105"
              />

              {/* Expandable Dark Button */}
              <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[168px] bg-gray-900 rounded-full flex items-center justify-start overflow-hidden transition-all duration-300 ease-in-out px-2.5 shadow-md">
                {/* ArrowRight Icon */}
                <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-white transition-transform duration-300 -rotate-45 group-hover:rotate-0">
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </div>
                
                {/* View Case Study Text */}
                <span className="type-nav text-[13px] text-white ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">
                  View case study
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="mt-4">
              <span className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed block">
                Transforming a dated platform into a conversion-focused brand experience
              </span>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                Luminar
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
