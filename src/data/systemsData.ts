export interface SystemService {
  id: number;
  slug: string;
  number: string;
  category: string;
  name: string;
  oneLiner: string;
  artSvg: string;
  deliverables: string[];
}

export const SYSTEM_SERVICES: SystemService[] = [
  {
    id: 0,
    slug: "business-setup-legal",
    number: "01",
    category: "LEGAL FOUNDATION",
    name: "Business Setup & Legal",
    oneLiner: "Structure, registrations, licences, and founder agreements built for scale.",
    artSvg: '<rect x="46" y="26" width="108" height="148" rx="8"/><path d="M66 62h68M66 84h68M66 106h42"/><circle class="a" cx="128" cy="142" r="22"/><path class="a" d="M118 142l7 8 14-17"/>',
    deliverables: [
      "Company, LLP & OPC Incorporation",
      "GST, MSME & Industry Statutory Licences",
      "Founder Agreements & Bylaws",
      "Trademark & Intellectual Property Filing"
    ]
  },
  {
    id: 1,
    slug: "technology-solutions",
    number: "02",
    category: "DIGITAL INFRASTRUCTURE",
    name: "Technology Solutions",
    oneLiner: "Modern web platforms, custom internal systems, and pragmatic AI automation.",
    artSvg: '<rect class="a" x="76" y="76" width="48" height="48" rx="9"/><circle cx="46" cy="56" r="9"/><circle cx="156" cy="48" r="9"/><circle cx="40" cy="146" r="9"/><circle cx="160" cy="154" r="9"/><path d="M54 62l24 18M148 54l-26 24M47 141l31-16M153 149l-31-22M100 76V50M100 124v28"/>',
    deliverables: [
      "High-Performance Web & Mobile Apps",
      "Custom CRM, ERP & Operational Portals",
      "Conversational AI Bots & Automation",
      "Cloud Architecture & 24/7 Reliability"
    ]
  },
  {
    id: 2,
    slug: "business-consulting-strategy",
    number: "03",
    category: "COMMERCIAL STRATEGY",
    name: "Business Consulting & Strategy",
    oneLiner: "Market intelligence, location analysis, commercial roadmaps, and growth scaling.",
    artSvg: '<path d="M26 66h148M26 134h148M66 26v148M134 26v148"/><path class="a" d="M100 52c-15 0-26 11-26 26 0 20 26 46 26 46s26-26 26-46c0-15-11-26-26-26z"/><circle class="a" cx="100" cy="78" r="9"/><circle cx="100" cy="150" r="30"/>',
    deliverables: [
      "Market Feasibility & Competitor Benchmarking",
      "Commercial Expansion & Location Intelligence",
      "Corporate Structuring & Valuation Scaling",
      "Strategic Operating Models & Advisory"
    ]
  },
  {
    id: 3,
    slug: "branding-creative",
    number: "04",
    category: "BRAND ARCHITECTURE",
    name: "Branding & Creative",
    oneLiner: "Distinctive brand positioning, iconic visual systems, and high-impact sales collateral.",
    artSvg: '<circle cx="76" cy="84" r="40"/><circle class="a" cx="124" cy="84" r="40"/><circle cx="100" cy="126" r="40"/>',
    deliverables: [
      "Core Positioning & Value Proposition",
      "Visual Identity, Logo, Color & Type",
      "Comprehensive Brand Guidelines",
      "Pitch Decks, Collateral & Packaging Design"
    ]
  },
  {
    id: 4,
    slug: "marketing-growth",
    number: "05",
    category: "GROWTH & ACQUISITION",
    name: "Marketing & Growth",
    oneLiner: "Full-funnel customer acquisition across organic search, performance ads, and analytics.",
    artSvg: '<path d="M24 36h152l-56 62v52l-40 22V98z"/><circle class="a" cx="100" cy="176" r="8"/><circle cx="52" cy="20" r="3"/><circle cx="100" cy="16" r="3"/><circle cx="148" cy="20" r="3"/>',
    deliverables: [
      "Technical SEO & AI Answer Optimization",
      "Targeted Google, Meta & LinkedIn Media",
      "Conversion Rate Optimization (CRO)",
      "Multi-Touch Attribution Tracking"
    ]
  },
  {
    id: 5,
    slug: "ecommerce-solutions",
    number: "06",
    category: "OMNICHANNEL COMMERCE",
    name: "E-Commerce Solutions",
    oneLiner: "Dominating Amazon, Flipkart, quick-commerce, and bespoke DTC storefronts.",
    artSvg: '<path d="M46 72h108l10 102H36z"/><path d="M74 72V56a26 26 0 0152 0v16"/><path class="a" d="M76 124l16 16 32-34"/>',
    deliverables: [
      "Shopify & Custom Storefront Architecture",
      "Amazon & Flipkart Listing Optimization",
      "Marketplace Performance Advertising",
      "Catalog, Inventory & Logistics Integration"
    ]
  },
  {
    id: 6,
    slug: "legal-regulatory-compliance",
    number: "07",
    category: "REGULATORY GOVERNANCE",
    name: "Legal & Regulatory Compliance",
    oneLiner: "Statutory governance, corporate secretarial audits, risk mitigation, and IP defense.",
    artSvg: '<rect x="26" y="40" width="40" height="120" rx="6"/><rect x="80" y="62" width="40" height="98" rx="6"/><rect class="a" x="134" y="86" width="40" height="74" rx="6"/><path d="M30 24h132"/>',
    deliverables: [
      "Annual Statutory Filings & MCA Compliance",
      "Commercial Contracts & NDAs",
      "Data Protection & Privacy Frameworks",
      "Intellectual Property Registration & Defense"
    ]
  },
  {
    id: 7,
    slug: "finance-tax-compliance",
    number: "08",
    category: "GOVERNANCE & CAPITAL",
    name: "Finance, Tax & Compliance",
    oneLiner: "Institutional bookkeeping, GST/TDS filings, audits, and Virtual CFO stewardship.",
    artSvg: '<rect x="34" y="124" width="26" height="46" rx="4"/><rect x="70" y="98" width="26" height="72" rx="4"/><rect x="106" y="72" width="26" height="98" rx="4"/><rect x="142" y="46" width="26" height="124" rx="4"/><path d="M30 100l40-26 38-24 62-26"/>',
    deliverables: [
      "Automated Monthly Accounting & Books",
      "GST, TDS & Advance Tax Filings",
      "Annual Statutory Audits & MCA Returns",
      "Virtual CFO Runway & Cash Planning"
    ]
  }
];

export interface StageOption {
  label: string;
  serviceIndices: number[];
}

export const STAGE_OPTIONS: StageOption[] = [
  { label: "Just an idea", serviceIndices: [0, 7] },
  { label: "Registered, not launched", serviceIndices: [1, 3] },
  { label: "Running, ready to grow", serviceIndices: [4, 5] },
  { label: "Established, ready to scale", serviceIndices: [2, 6] }
];

export interface GoalOption {
  label: string;
  serviceIndices: number[];
}

export const GOAL_OPTIONS: GoalOption[] = [
  { label: "Get legally set up", serviceIndices: [0] },
  { label: "Stay compliant & manage money", serviceIndices: [7] },
  { label: "Build a website, app or AI", serviceIndices: [1] },
  { label: "Commercial strategy & roadmap", serviceIndices: [2] },
  { label: "Build brand & creative content", serviceIndices: [3] },
  { label: "Get customers & digital growth", serviceIndices: [4] },
  { label: "Sell on e-commerce & marketplaces", serviceIndices: [5] },
  { label: "Corporate legal compliance & governance", serviceIndices: [6] }
];
