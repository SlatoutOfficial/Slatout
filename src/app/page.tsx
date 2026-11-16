import React from "react";
import SlatoutHero from "@/components/SlatoutHero";
import ClientReviews from "../components/ClientReviews";
import Services from "../components/Services";
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
        <SlatoutHero />
        <div className="home-section-frame"><ClientReviews /></div>
        <div className="home-section-frame"><Services /></div>
        <div className="home-section-frame"><RoutePlanner /></div>
        <div className="home-section-frame"><TeamComparison /></div>
        <div className="home-section-frame"><ProcessTrack /></div>
        <div className="home-section-frame"><Journal /></div>
        <SiteEnd />
      </SmoothScroll>
    </main>
  );
}
