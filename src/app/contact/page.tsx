"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { ArrowRight, Send, HelpCircle, Phone, Mail, MapPin } from "lucide-react";
import { WordRevealHeading, FadeUp } from "../../components/Motion";

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

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
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: "", email: "", message: "" });
      setSelectedServices([]);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[450px] sm:min-h-[500px] flex items-center bg-[#111] border-b border-white/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(17,17,17,0.96) 50%, rgba(17,17,17,0.7) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none relative z-10">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F26522] shadow-sm shrink-0">
                <Send size={18} className="stroke-[1.5]" />
              </div>
              <span className="type-label text-[12px] border border-white/20 rounded-full px-3.5 py-1 text-white/90">
                Get In Touch
              </span>
            </div>
            <h1 className="type-hero text-[clamp(2.2rem,6vw,4rem)] text-white mt-2 max-w-[900px]">
              Let's collaborate on your next growth phase.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[620px] mt-2">
              Ready to engineer your custom billing pipeline, accelerate SEO ingestion, or scale branding details? Speak with our team today.
            </p>
          </div>
        </div>
      </section>

      {/* Main Details and Form */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
            {/* Left side: Studio Details */}
            <div className="flex flex-col justify-between gap-12">
              <div className="flex flex-col gap-8">
                <h3 className="text-2xl type-card-title text-gray-900">
                  Connect Directly
                </h3>

                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F26522] shrink-0">
                      <Mail size={16} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Email us</span>
                      <a href="mailto:hello@slatout.com" className="font-bold text-gray-900 hover:text-[#F26522] transition-colors duration-300">
                        hello@slatout.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F26522] shrink-0">
                      <Phone size={16} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Call our studio</span>
                      <a href="tel:+442079460958" className="font-bold text-gray-900 hover:text-[#F26522] transition-colors duration-300">
                        +44 (0) 20 7946 0958
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F26522] shrink-0">
                      <MapPin size={16} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">HQ Location</span>
                      <span className="font-bold text-gray-900">
                        London, United Kingdom
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="border-t border-gray-100 pt-8">
                <span className="block font-semibold text-gray-400 text-xs uppercase tracking-wider mb-3">Our Social Networks</span>
                <div className="flex gap-4 text-sm font-bold text-gray-800">
                  {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((soc) => (
                    <a
                      key={soc}
                      href="#"
                      className="hover:text-[#F26522] transition-colors duration-300"
                    >
                      {soc}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Form Card */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              {success ? (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-25 flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <ArrowRight size={24} className="rotate-90" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Inquiry Received</h4>
                  <p className="text-gray-500 text-sm max-w-[340px] mt-1.5 leading-relaxed">
                    Thank you! An engineering strategic lead will follow up via your email shortly.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Text inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-[#F26522] focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-[#F26522] focus:outline-none transition-colors duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Service scope selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">What services are you looking for?</label>
                  <div className="flex flex-wrap gap-2.5 mt-1">
                    {services.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#F26522] text-white border-[#F26522]"
                              : "bg-white text-gray-500 border-gray-250/70 hover:border-gray-300 hover:text-gray-900"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message detail */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tell us about your project</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Brief scope details, timeline goals, etc..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-[#F26522] focus:outline-none transition-colors duration-300 resize-none text-sm"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group flex items-center justify-between bg-[#F26522] hover:bg-[#FE7004] text-white type-button text-[13px] sm:text-[14px] rounded-full pl-6 pr-2 py-2 mt-4 transition-all duration-300 w-full sm:w-[220px] active:scale-95"
                >
                  <span className="overflow-hidden h-[20px] relative block">
                    <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
                      <span className="h-[20px] flex items-center leading-none">Submit inquiry</span>
                      <span className="h-[20px] flex items-center leading-none">Submit inquiry</span>
                    </span>
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-custom group-hover:-rotate-45">
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
