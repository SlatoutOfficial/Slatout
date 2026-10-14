"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function About() {
  const smallImg = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85";
  const largeImg = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85";

  return (
    <section id="about" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto select-none">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
            1
          </div>
          <span className="text-[12px] sm:type-nav text-[13px] border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800">
            Introducing Slatout
          </span>
        </div>

        {/* Heading h2 */}
        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] type-section text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-[1200px]">
          Strategy-led builders, delivering<br className="hidden sm:block" /> results in digital and beyond.
        </h2>

        {/* Content area: MOBILE/TABLET (lg:hidden) */}
        <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-8">
          <div className="flex flex-col items-start gap-5">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900">
              Through research, engineering and digital growth we help growing brands realize their digital full potential.
            </p>
            {/* Orange Button */}
            <a
              href="#about"
              className="group flex items-center gap-2 bg-[#F97432] hover:bg-[#F97432] text-white type-button text-[13px] sm:text-[14px] rounded-full pl-5 pr-2 py-2 transition-colors duration-300"
            >
              <span className="overflow-hidden h-[20px] relative block">
                <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center leading-none">About our studio</span>
                  <span className="h-[20px] flex items-center leading-none">About our studio</span>
                </span>
              </span>
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#F97432] transition-transform duration-500 ease-custom group-hover:-rotate-45">
                <ArrowRight size={13} className="stroke-[2.5]" />
              </div>
            </a>
          </div>

          {/* Two images */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="sm:w-[45%] aspect-[438/346] relative rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={smallImg}
                alt="Slatout Studio Detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-[55%] aspect-[900/600] relative rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={largeImg}
                alt="Slatout Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content area: DESKTOP (hidden lg:grid) */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
          {/* Left Column: Small image (self-end) */}
          <div className="w-full aspect-[438/346] rounded-2xl overflow-hidden self-end">
            <img
              src={smallImg}
              alt="Slatout Studio Detail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Column: Paragraph + CTA (self-start, flex justify-end) */}
          <div className="self-start flex flex-col justify-end items-start h-full pb-1 pl-4 xl:pl-8">
            <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap">
              Through research, engineering<br />
              and digital growth we help growing brands<br />
              realize their digital full potential.
            </p>
            {/* Orange Button */}
            <a
              href="#about"
              className="group flex items-center gap-2 bg-[#F97432] hover:bg-[#F97432] text-white text-[13px] xl:text-[14px] font-medium rounded-full pl-5 pr-2 py-2 mt-8 transition-colors duration-300"
            >
              <span className="overflow-hidden h-[20px] relative block">
                <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center leading-none">About our studio</span>
                  <span className="h-[20px] flex items-center leading-none">About our studio</span>
                </span>
              </span>
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#F97432] transition-transform duration-500 ease-custom group-hover:-rotate-45">
                <ArrowRight size={13} className="stroke-[2.5]" />
              </div>
            </a>
          </div>

          {/* Right Column: Large image (self-end) */}
          <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden self-end">
            <img
              src={largeImg}
              alt="Slatout Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
