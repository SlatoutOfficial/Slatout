import React from "react";
import Hero from "@/components/Hero";
import ClientReviews from "../components/ClientReviews";
import Services from "../components/Services";
import TenWorlds from "../components/TenWorlds";
import RoutePlanner from "../components/RoutePlanner";
import TeamComparison from "../components/TeamComparisonScene";
import ProcessTrack from "../components/ProcessTrack";
import Journal from "../components/Journal";
import SiteEnd from "../components/SiteEnd";
import SmoothScroll from "../components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] relative">
      <SmoothScroll>
        <Hero />
        <ClientReviews />
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
