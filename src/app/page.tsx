import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Clients from "../components/Clients";
import Services from "../components/Services";
import BuildSection from "../components/3d/BuildSection";
import PlanBuilder from "../components/3d/PlanBuilder";
import Journal from "../components/Journal";
import SiteEnd from "../components/SiteEnd";
import SmoothScroll from "../components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] relative">
      <Navbar />
      <SmoothScroll>
        <Hero />
        <Clients />
        <Services />
        <Journal />
        <SiteEnd />
      </SmoothScroll>
    </main>
  );
}

