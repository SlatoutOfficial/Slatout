export interface RouteOption {
  value: string;
  label: string;
  targets: string[];
}

export const ROUTE_STAGES: RouteOption[] = [
  { value: "idea", label: "Just an idea", targets: ["business-setup-registration", "finance-tax-compliance"] },
  { value: "registered-not-launched", label: "Registered, not launched", targets: ["technology-ai-solutions", "branding-marketing"] },
  { value: "running-ready-to-grow", label: "Running, ready to grow", targets: ["digital-marketing", "content-strategy"] },
  { value: "established-ready-to-scale", label: "Established, ready to scale", targets: ["programmatic-advertising", "business-development-outsourcing"] },
];

export const ROUTE_NEEDS: RouteOption[] = [
  { value: "legal-setup", label: "Get legally set up", targets: ["business-setup-registration"] },
  { value: "compliance-finance", label: "Stay compliant and manage money", targets: ["finance-tax-compliance"] },
  { value: "technology-ai", label: "Build a website, app or AI", targets: ["technology-ai-solutions"] },
  { value: "physical-outlet", label: "Open a physical outlet", targets: ["offline-business-launch"] },
  { value: "brand-content", label: "Build my brand and content", targets: ["branding-marketing", "content-strategy"] },
  { value: "online-customers", label: "Get customers online", targets: ["digital-marketing"] },
  { value: "marketplaces", label: "Sell on marketplaces", targets: ["ecommerce-marketplace-growth"] },
  { value: "programmatic-ads", label: "Reach big audiences with ads", targets: ["programmatic-advertising"] },
  { value: "b2b-sales", label: "Build a B2B sales pipeline", targets: ["business-development-outsourcing"] },
];
