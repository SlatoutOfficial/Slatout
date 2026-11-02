import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Clients from "../components/Clients";
import Services from "../components/Services";
import TenWorlds from "../components/TenWorlds";
import RoutePlanner from "../components/RoutePlanner";
import TeamComparison from "../components/TeamComparison";
import ProcessTrack from "../components/ProcessTrack";
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
        <TeamComparison />
        <ProcessTrack />
        <Journal />
        <SiteEnd />
      </SmoothScroll>
    </main>
  );
}
