import React from "react";
import ServicePageClient from "@/components/ServicePageClient";
import servicePagesData from "@/data/servicePagesData.json";

export const metadata = {
  title: "Business Services in India: Ten Services, One Team | SLATOUT",
  description:
    "Explore SLATOUT's 10 service worlds: Business Setup, Technology & AI, Offline Launch, Branding, Content Strategy, Digital Marketing, E-commerce, Programmatic Ads, BD Outsourcing, and Finance & Tax.",
};

export default function AllServicesPage() {
  const pagesMap = servicePagesData as Record<string, any>;
  const overview = pagesMap["overview"];

  if (!overview) {
    return null;
  }

  return <ServicePageClient service={overview} />;
}
