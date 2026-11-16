import React from "react";
import { notFound, redirect } from "next/navigation";
import ServicePageClient from "@/components/ServicePageClient";
import servicePagesData from "@/data/servicePagesData.json";

// Map old slugs to the 10 official service slugs
const legacySlugMap: Record<string, string> = {
  "business-setup-legal": "business-setup-registration",
  "technology-solutions": "technology-ai-solutions",
  "technology-ai": "technology-ai-solutions",
  "business-consulting-strategy": "business-development-outsourcing",
  "b2b-sales-bd": "business-development-outsourcing",
  "ecommerce-solutions": "ecommerce-marketplace-growth",
  "ecommerce-marketplace": "ecommerce-marketplace-growth",
  "branding-creative": "branding-marketing",
  "marketing-growth": "digital-marketing",
  "digital-marketing-growth": "digital-marketing",
  "legal-regulatory-compliance": "finance-tax-compliance",
  "programmatic-ads": "programmatic-advertising",
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { slug: "business-setup-registration" },
    { slug: "technology-ai-solutions" },
    { slug: "offline-business-launch" },
    { slug: "branding-marketing" },
    { slug: "content-strategy" },
    { slug: "digital-marketing" },
    { slug: "ecommerce-marketplace-growth" },
    { slug: "programmatic-advertising" },
    { slug: "business-development-outsourcing" },
    { slug: "finance-tax-compliance" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  let slug = resolvedParams.slug;
  if (legacySlugMap[slug]) {
    slug = legacySlugMap[slug];
  }

  const pagesMap = servicePagesData as Record<string, any>;
  const service = pagesMap[slug];

  if (!service) {
    return {
      title: "Service Not Found | SLATOUT",
    };
  }

  return {
    title: service.title.replace(/&amp;/g, "&"),
    description: `SLATOUT: ${service.title.replace(/&amp;/g, "&")}. One partner for business setup, compliance, technology, branding, marketing and finance.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  let slug = resolvedParams.slug;

  if (legacySlugMap[slug]) {
    redirect(`/services/${legacySlugMap[slug]}/`);
  }

  const pagesMap = servicePagesData as Record<string, any>;
  const service = pagesMap[slug];

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
