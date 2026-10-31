export interface BlogPost {
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    heading: string;
    text: string;
  }[];
  tags: string[];
}

export const blogPosts: Record<string, BlogPost> = {
  "private-limited-vs-llp-vs-opc": {
    slug: "private-limited-vs-llp-vs-opc",
    title: "Private Limited vs LLP vs OPC: Choosing Your Legal Structure in India",
    desc: "A pragmatic comparison of liability protection, compliance loads, equity fundraising feasibility, and tax impacts for early-stage Indian founders.",
    category: "Business Setup",
    date: "October 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80",
    author: {
      name: "Adv. Rajesh Kothari",
      role: "Head of Corporate Governance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    tags: ["Incorporation", "MCA", "Pvt Ltd", "LLP", "Founders"],
    content: [
      {
        heading: "1. The Funding Paradox: Pvt Ltd vs LLP",
        text: "If you plan to raise institutional angel or VC capital, issue ESOPs, or bring in co-founders with vesting schedules, a Private Limited Company remains the only universally accepted vehicle. LLPs offer tremendous flexibility and avoid dividend distribution complexities, but equity instruments cannot be issued in an LLP format."
      },
      {
        heading: "2. Compliance Burden & Annual Costs",
        text: "An OPC (One Person Company) offers limited liability for a solo founder but still incurs statutory audit and annual ROC filing obligations. LLPs have significantly relaxed audit thresholds (only when turnover exceeds ₹40 Lakhs or contribution exceeds ₹25 Lakhs), drastically lowering early-stage compliance overhead."
      },
      {
        heading: "3. The Slatout Recommendation Framework",
        text: "Bootstrap service agencies and lifestyle ventures should almost always start as an LLP or OPC to preserve capital. Venture-scale tech or direct-to-consumer product startups targeting venture funding should incorporate as a Private Limited right from Day One."
      }
    ]
  },
  "seo-aeo-geo-explained": {
    slug: "seo-aeo-geo-explained",
    title: "SEO, AEO and GEO Explained: Visibility in the Era of AI Search Engines",
    desc: "How Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) alter traditional search rankings for modern brands.",
    category: "Digital Growth",
    date: "September 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    author: {
      name: "Elena Rostova",
      role: "Director of Growth",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    tags: ["AEO", "GEO", "Search Marketing", "AI Citations"],
    content: [
      {
        heading: "1. From Ten Blue Links to Synthesized AI Answers",
        text: "With Perplexity, ChatGPT Search, and Google AI Overviews consuming the top half of search real estate, founders must stop optimizing purely for keyword densities. Generative engines look for structured entity knowledge, direct answers, and cited authority."
      },
      {
        heading: "2. Optimizing for Answer Engines (AEO)",
        text: "AEO demands schema markup, FAQ formats with authoritative clarity, and verified primary data. When an LLM crawls your documentation, it extracts semantic tuples rather than keyword matches."
      },
      {
        heading: "3. Establishing Citation Moats",
        text: "Being cited by conversational AI agents requires external digital mentions, press releases, public founder profiles, and transparent case study benchmarks. This creates an interconnected citation network that models treat as reliable ground truth."
      }
    ]
  },
  "acos-roas-tacos-explained": {
    slug: "acos-roas-tacos-explained",
    title: "ACoS vs ROAS vs TACoS: The Marketplace Unit Economics Every Founder Must Track",
    desc: "Why scaling Amazon, Flipkart, and Blinkit ad spends without auditing Total Advertising Cost of Sales leads to cash flow erosion.",
    category: "E-Commerce",
    date: "September 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&q=80",
    author: {
      name: "Karan Mehta",
      role: "E-Commerce & Performance Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    tags: ["Marketplaces", "TACoS", "Amazon Ads", "Unit Economics"],
    content: [
      {
        heading: "1. The Trap of Isolated ROAS",
        text: "Looking only at Return On Ad Spend (ROAS) creates false security. High ad-attributed revenue might just be cannibalizing organic brand sales that you would have gotten anyway."
      },
      {
        heading: "2. Understanding TACoS (Total Advertising Cost of Sales)",
        text: "TACoS measures total ad spend divided by overall business revenue (organic + paid). A healthy early brand should see TACoS between 12% and 18%, decreasing as organic flywheel momentum accelerates."
      },
      {
        heading: "3. The Break-Even Calculation",
        text: "If your gross margin is 45%, your combined logistics, commissions, and TACoS must stay under 40% to allow for cash reinvestment into inventory and product development."
      }
    ]
  },
  "future-webgl-2026": {
    slug: "future-webgl-2026",
    title: "The Future of Interactive WebGL & 3D Interfaces in 2026",
    desc: "A deep dive into how high-performance GPU shaders and browser interfaces are redefining online storytelling and brand positioning.",
    category: "Technology",
    date: "August 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
    author: {
      name: "Marc Henderson",
      role: "Lead Interactive Designer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    tags: ["WebGL", "GPU Shaders", "3D Web", "UX Design"],
    content: [
      {
        heading: "1. The Shift to Real-Time Browser Rendering",
        text: "Modern web design moves beyond static grids. High-performance GPU shaders execute directly inside modern browsers, delivering tactile 60-120 FPS visual simulations that keep users deeply engaged."
      },
      {
        heading: "2. Reducing Overhead with Custom Fragment Shaders",
        text: "By offloading matrix calculations directly to the GPU instead of running bloated JS libraries on the main thread, page transitions and interaction loops stay buttery smooth."
      }
    ]
  },
  "ai-agents-workflow-2026": {
    slug: "ai-agents-workflow-2026",
    title: "Autonomous AI Agents: Orchestrating Enterprise Business Workflows",
    desc: "Analyzing how integrating multi-agent LLM systems eliminates repetitive administrative backlogs, syncs CRMs, and optimizes operational pipelines.",
    category: "Technology",
    date: "July 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    author: {
      name: "Dr. Sarah Chen",
      role: "Principal AI Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    tags: ["AI Agents", "Automation", "LLMs", "Workflows"],
    content: [
      {
        heading: "1. From Static Dashboards to Agentic Orchestration",
        text: "Enterprise tools are evolving from manual spreadsheets to event-driven AI agents that proactively reconcile invoices, trigger vendor reminders, and draft client communications autonomously."
      }
    ]
  }
};
