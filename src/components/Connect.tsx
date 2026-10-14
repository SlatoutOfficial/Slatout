"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { WordRevealHeading, FadeUp } from "./Motion";

export default function Connect() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const services = ["Development", "Digital Marketing", "UI/UX Design", "AI Automation"];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reaching out! We will discuss your project shortly.\n\nDetails:\nName: ${formData.name}\nEmail: ${formData.email}\nServices: ${selectedServices.join(", ")}`);
    setFormData({ name: "", email: "", message: "" });
    setSelectedServices([]);
  };

  return (
    <section id="contact" className="bg-[#111111] text-white pt-20 sm:pt-28 pb-20 sm:pb-28">
      <div className="max-w-[1440px] mx-auto select-none">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-gray-900 text-[11px] sm:text-[12px] font-bold flex items-center justify-center">
                5
              </div>
              <span className="text-[12px] sm:type-nav text-[13px] border border-white/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-white/90">
                Contact
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Heading h2 */}
        <WordRevealHeading
          text="Ready to scale your digital presence?"
          className="px-5 sm:px-8 lg:px-12 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] type-section mb-12 sm:mb-16 lg:mb-20 max-w-[1100px]"
        />

        {/* Form and info area */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20 px-5 sm:px-8 lg:px-12">
          
          {/* Left Column: Info Block */}
          <FadeUp delay={0.15}>
            <div className="flex flex-col justify-between h-full gap-10">
              <div className="flex flex-col gap-6">
                <p className="type-body text-[15px] sm:text-[17px] text-gray-400 max-w-[420px]">
                  Let's discuss how we can partner to engineering high-performance platforms, run marketing engines, and design experience parameters that dominate your industry.
                </p>

                {/* Big Email Link */}
                <div className="flex flex-col gap-1.5 mt-4">
                  <span className="type-label text-[11px] text-gray-500">Email us</span>
                  <a
                    href="mailto:hello@slatout.com"
                    className="text-2xl sm:text-3xl font-medium text-white hover:text-[#F97432] transition-colors duration-300 w-fit"
                  >
                    hello@slatout.com
                  </a>
                </div>

                {/* Call Link */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="type-label text-[11px] text-gray-500">Call our studio</span>
                  <a
                    href="tel:+442079460958"
                    className="text-lg sm:text-xl font-medium text-gray-300 hover:text-white transition-colors duration-300 w-fit"
                  >
                    +44 (0) 20 7946 0958
                  </a>
                </div>
              </div>

              {/* Bottom details & social links */}
              <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm text-gray-500 border-t border-white/10 pt-8">
                <div>
                  <span className="block font-semibold text-gray-400 mb-2">Location</span>
                  <span>London, United Kingdom</span>
                </div>
                <div>
                  <span className="block font-semibold text-gray-400 mb-2">Socials</span>
                  <div className="flex gap-4">
                    {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((soc) => (
                      <a
                        key={soc}
                        href="#"
                        className="hover:text-white transition-colors duration-300"
                      >
                        {soc}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right Column: Contact Form */}
          <FadeUp delay={0.25}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Row inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="type-label text-[11px] text-gray-400">Your name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent border-b border-white/10 py-3.5 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="type-label text-[11px] text-gray-400">Your email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-b border-white/10 py-3.5 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Project scope multi-select */}
              <div className="flex flex-col gap-3">
                <label className="type-label text-[11px] text-gray-400">What are you looking for?</label>
                <div className="flex flex-wrap gap-2.5 mt-1.5">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                          isSelected
                            ? "bg-white text-gray-900 border-white"
                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message input */}
              <div className="flex flex-col gap-2">
                <label className="type-label text-[11px] text-gray-400">Tell us about your project</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Brief project details, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-b border-white/10 py-3.5 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors duration-300 resize-none text-sm"
                />
              </div>

              {/* Orange Submit Button */}
              <button
                type="submit"
                className="group flex items-center justify-between bg-[#F97432] hover:bg-[#F97432] text-white type-button text-[13px] sm:text-[14px] rounded-full pl-6 pr-2 py-2 mt-4 transition-colors duration-300 w-full sm:w-[220px]"
              >
                <span className="overflow-hidden h-[20px] relative block">
                  <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center leading-none">Submit inquiry</span>
                    <span className="h-[20px] flex items-center leading-none">Submit inquiry</span>
                  </span>
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F97432] transition-transform duration-500 ease-custom group-hover:-rotate-45">
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </div>
              </button>
            </form>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}
