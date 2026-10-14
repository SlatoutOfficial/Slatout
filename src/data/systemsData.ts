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
    slug: "business-setup-registration",
    number: "01",
    category: "LEGAL FOUNDATION",
    name: "Business Setup & Registration",
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
    slug: "technology-ai-solutions",
    number: "02",
    category: "DIGITAL INFRASTRUCTURE",
    name: "Technology & AI Solutions",
    oneLiner: "Modern web platforms, custom internal systems, and pragmatic AI automation.",
    artSvg: '<rect class="a" x="76" y="76" width="48" height="48" rx="9"/><circle cx="46" cy="56" r="9"/><circle cx="156" cy="48" r="9"/><circle cx="40" cy="146" r="9"/><circle cx="160" cy="154" r="9"/><path d="M54 62l24 18M148 54l-26 24M47 141l31-16M153 149l-31-22M100 76V50M100 124v28"/>',
    deliverables: [
      "High-Performance Web & Mobile Apps",
      "Custom CRM, ERP & Operational Portals",
      "Conversational AI Bots & Lead Qualifiers",
      "Cloud Architecture & 24/7 Security"
    ]
  },
  {
    id: 2,
    slug: "offline-business-launch",
    number: "03",
    category: "PHYSICAL EXPANSION",
    name: "Offline Business Launch & Market Setup",
    oneLiner: "Footfall-backed location intelligence, retail layouts, and local market entry.",
    artSvg: '<path d="M26 66h148M26 134h148M66 26v148M134 26v148"/><path class="a" d="M100 52c-15 0-26 11-26 26 0 20 26 46 26 46s26-26 26-46c0-15-11-26-26-26z"/><circle class="a" cx="100" cy="78" r="9"/><circle cx="100" cy="150" r="30"/>',
    deliverables: [
      "Catchment Mapping & Demand Analysis",
      "Side-by-Side Location Matrix Comparison",
      "Storefront Architecture & Signage",
      "Grand Launch & First-Week Customer Capture"
    ]
  },
  {
    id: 3,
    slug: "branding-marketing",
    number: "04",
    category: "BRAND ARCHITECTURE",
    name: "Branding & Marketing",
    oneLiner: "Distinctive brand positioning, iconic visual systems, and sales collateral.",
    artSvg: '<circle cx="76" cy="84" r="40"/><circle class="a" cx="124" cy="84" r="40"/><circle cx="100" cy="126" r="40"/>',
    deliverables: [
      "Core Positioning & Value Proposition",
      "Visual Identity, Logo, Color & Type",
      "Comprehensive Brand Guidelines",
      "Decks, Collateral & Packaging Design"
    ]
  },
  {
    id: 4,
    slug: "content-strategy",
    number: "05",
    category: "EDITORIAL & VOICE",
    name: "Content Strategy",
    oneLiner: "Editorial pillars, founder personal branding, and high-converting creative briefs.",
    artSvg: '<rect x="26" y="40" width="148" height="132" rx="9"/><path d="M26 72h148M64 24v26M136 24v26"/><rect x="42" y="88" width="26" height="20" rx="3"/><rect class="a" x="86" y="88" width="26" height="20" rx="3"/><rect x="130" y="88" width="26" height="20" rx="3"/><rect x="42" y="128" width="26" height="20" rx="3"/><rect x="86" y="128" width="26" height="20" rx="3"/><rect class="a" x="130" y="128" width="26" height="20" rx="3"/>',
    deliverables: [
      "Strategic Content Pillar Matrix",
      "Publishing Calendar & Cadence",
      "Executive Ghostwriting & Thought Leadership",
      "Multi-Channel Creative Distribution Briefs"
    ]
  },
  {
    id: 5,
    slug: "digital-marketing",
    number: "06",
    category: "GROWTH & ACQUISITION",
    name: "Digital Marketing & Growth",
    oneLiner: "Full-funnel customer acquisition across organic search, paid ads, and analytics.",
    artSvg: '<path d="M24 36h152l-56 62v52l-40 22V98z"/><circle class="a" cx="100" cy="176" r="8"/><circle cx="52" cy="20" r="3"/><circle cx="100" cy="16" r="3"/><circle cx="148" cy="20" r="3"/>',
    deliverables: [
      "Technical SEO & AI Answer Optimization",
      "Targeted Google, Meta & LinkedIn Media",
      "Conversion Rate Optimization (CRO)",
      "Multi-Touch Attribution Tracking"
    ]
  },
  {
    id: 6,
    slug: "ecommerce-marketplace-growth",
    number: "07",
    category: "OMNICHANNEL COMMERCE",
    name: "E-Commerce & Marketplace Growth",
    oneLiner: "Dominating Amazon, Flipkart, and DTC storefronts with optimized catalogs.",
    artSvg: '<path d="M46 72h108l10 102H36z"/><path d="M74 72V56a26 26 0 0152 0v16"/><path class="a" d="M76 124l16 16 32-34"/>',
    deliverables: [
      "Seller Onboarding & Brand Registry",
      "A+ Content, Imagery & Listing SEO",
      "Marketplace Ads (ROAS Optimization)",
      "Buy-Box Protection & Inventory Control"
    ]
  },
  {
    id: 7,
    slug: "programmatic-advertising",
    number: "08",
    category: "PERFORMANCE MEDIA",
    name: "Programmatic Advertising",
    oneLiner: "Algorithmic ad buying across Connected TV, digital audio, and premium networks.",
    artSvg: '<circle cx="100" cy="100" r="26"/><circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="78"/><path class="a" d="M100 100V34M100 100l56 34"/><circle class="a" cx="138" cy="66" r="5"/><circle class="a" cx="60" cy="132" r="5"/>',
    deliverables: [
      "Real-Time Bidding (RTB) Network Buying",
      "Connected TV (CTV) & Digital Audio Ads",
      "Hyper-Targeted Geofencing & Cohorts",
      "Enterprise Fraud Filters & Safe Media"
    ]
  },
  {
    id: 8,
    slug: "business-development-outsourcing",
    number: "09",
    category: "B2B PIPELINE",
    name: "Business Development Outsourcing",
    oneLiner: "Dedicated outbound sales machines delivering qualified enterprise meetings.",
    artSvg: '<rect x="26" y="40" width="40" height="120" rx="6"/><rect x="80" y="62" width="40" height="98" rx="6"/><rect class="a" x="134" y="86" width="40" height="74" rx="6"/><path d="M30 24h132"/>',
    deliverables: [
      "Target Account Research & Lead Scraping",
      "Cold Email & LinkedIn Outreach Engines",
      "Qualified Sales Meetings Booked",
      "Objection Playbooks & Pipeline Closing"
    ]
  },
  {
    id: 9,
    slug: "finance-tax-compliance",
    number: "10",
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
  { label: "Just an idea", serviceIndices: [0, 9] },
  { label: "Registered, not launched", serviceIndices: [1, 3] },
  { label: "Running, ready to grow", serviceIndices: [5, 4] },
  { label: "Established, ready to scale", serviceIndices: [7, 8] }
];

export interface GoalOption {
  label: string;
  serviceIndices: number[];
}

export const GOAL_OPTIONS: GoalOption[] = [
  { label: "Get legally set up", serviceIndices: [0] },
  { label: "Stay compliant & manage money", serviceIndices: [9] },
  { label: "Build a website, app or AI", serviceIndices: [1] },
  { label: "Open a physical outlet", serviceIndices: [2] },
  { label: "Build brand & creative content", serviceIndices: [3, 4] },
  { label: "Get customers online", serviceIndices: [5] },
  { label: "Sell on marketplaces", serviceIndices: [6] },
  { label: "Reach big audiences with ads", serviceIndices: [7] },
  { label: "Build a B2B sales pipeline", serviceIndices: [8] }
];
