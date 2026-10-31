import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Clients from "../components/Clients";
import Services from "../components/Services";
import TenWorlds from "../components/TenWorlds";
import RoutePlanner from "../components/RoutePlanner";
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
        <TenWorlds />
        <RoutePlanner />
        <Journal />
        <SiteEnd />
      </SmoothScroll>
    </main>
  );
}
