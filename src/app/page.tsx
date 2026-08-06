import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trust from "../components/Trust";
import Services from "../components/Services";
import Industries from "../components/Industries";
import WhyChooseUs from "../components/WhyChooseUs";
import Process from "../components/Process";
import ProductShowcase from "../components/ProductShowcase";
import Journal from "../components/Journal";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EFEFEF]">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Industries />
      <WhyChooseUs />
      <Process />
      <ProductShowcase />
      <Journal />
      <Testimonials />
      <FAQ />
    </main>
  );
}
