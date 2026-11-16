export const REVIEW_SERVICE_OPTIONS = [
  { key: "setup", slug: "business-setup-registration", label: "Business Setup", tint: "#E3EEDC", deep: "#2E5B34" },
  { key: "tech", slug: "technology-ai-solutions", label: "Technology & AI", tint: "#E2E6FF", deep: "#3140A3" },
  { key: "offline", slug: "offline-business-launch", label: "Offline Launch", tint: "#F4EAD8", deep: "#6E5320" },
  { key: "brand", slug: "branding-marketing", label: "Branding", tint: "#FBE1E6", deep: "#A1324C" },
  { key: "content", slug: "content-strategy", label: "Content Strategy", tint: "#FFF3CC", deep: "#7A5900" },
  { key: "digital", slug: "digital-marketing", label: "Digital Marketing", tint: "#D8F2EA", deep: "#126B5A" },
  { key: "market", slug: "ecommerce-marketplace-growth", label: "Marketplaces", tint: "#EDE3FB", deep: "#5C3C9F" },
  { key: "prog", slug: "programmatic-advertising", label: "Programmatic Ads", tint: "#DDEFFB", deep: "#175C88" },
  { key: "bd", slug: "business-development-outsourcing", label: "BD Outsourcing", tint: "#FFE6D1", deep: "#A2470F" },
  { key: "fin", slug: "finance-tax-compliance", label: "Finance & Tax", tint: "#DDEDEC", deep: "#24555A" },
] as const;

export type ReviewServiceKey = (typeof REVIEW_SERVICE_OPTIONS)[number]["key"];

export type ClientReview = {
  id: string;
  name: string;
  role: string;
  business: string;
  industry: string;
  services: ReviewServiceKey[];
  rating: number;
  quote: string;
  highlight: string;
  cameWith: string;
  leftWith: string;
  permissionConfirmed: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
