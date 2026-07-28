export type ProjectCategory = "ai" | "full-stack" | "frontend";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Short label shown on cards, e.g. "AI · SaaS" */
  tags: string;
  category: ProjectCategory[];
  period: string;
  role: string;
  /** Card-length summary */
  summary: string;
  problem: string;
  approach: string;
  outcomes: string[];
  stack: string[];
  links: { label: string; href: string }[];
  /** Under NDA: only login screen, public marketing site and public metrics may be shown */
  nda?: boolean;
  /** No public visuals available yet */
  visualsPending?: boolean;
  /** Screenshot source folder (repo-relative, not served) */
  assetsDir: string;
  /** Order on the home page; omit to exclude from Selected Work */
  featured?: number;
  /** Served from /public. width/height are intrinsic pixels. */
  images: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }[];
};

export const projects: Project[] = [
  {
    slug: "podding",
    name: "Podding",
    tagline: "AI-driven podcast guest booking, end to end.",
    tags: "AI · SaaS",
    category: ["ai", "full-stack"],
    period: "2024 – 2025",
    role: "Senior Full-Stack AI Developer (solo build)",
    summary:
      "AI-driven podcast guest booking platform automating end-to-end workflows with semantic matching. Cut workflow time by 85–88% with a 95% podcast acceptance rate.",
    problem:
      "Booking podcast guests is a manual grind: researching shows, matching topics, outreach, and follow-ups consume hours per placement and most pitches go unanswered.",
    approach:
      "Built the platform solo: LangGraph-orchestrated agents over a RAG pipeline with vector-database semantic matching between guests and shows, Rephonic API for podcast data, automated email outreach with response tracking, and real-time updates over Socket.IO. Django/Celery backend, Next.js + Shadcn UI frontend, deployed across Vercel and AWS Lambda.",
    outcomes: [
      "Reduced end-to-end workflow time by 85–88%",
      "95% podcast acceptance rate via semantic matching",
      "Fully automated outreach and response tracking",
    ],
    stack: [
      "Next.js",
      "Shadcn UI",
      "Django",
      "Celery",
      "Socket.IO",
      "LangGraph",
      "PostgreSQL",
      "RAG",
      "Vector DBs",
      "Vercel",
      "AWS Lambda",
    ],
    links: [{ label: "Client site", href: "https://www.podding.co/" }],
    nda: true,
    assetsDir: "content-assets/podding",
    images: [
      {
        src: "/projects/podding/marketing-hero.png",
        alt: "Podding marketing site hero",
        caption: "Client marketing site — podding.co",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/podding/pod-system.png",
        alt: "The Pod System section of the Podding site",
        caption: "The Pod System — public marketing material",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/podding/app-login.png",
        alt: "Podding platform login screen",
        caption: "Platform login — product interface under NDA",
        width: 1440,
        height: 900,
      },
    ],
    featured: 1,
  },
  {
    slug: "kayana",
    name: "Kayana",
    tagline: "A hiring marketplace that runs itself.",
    tags: "AI · Marketplace",
    category: ["ai", "full-stack"],
    period: "2022 – 2023",
    role: "Full-Stack AI Developer",
    summary:
      "AI-driven VA hiring marketplace where recruitment runs with minimal manual involvement. Multi-agent automation reduced hiring time by 90%.",
    problem:
      "Matching virtual assistants with employers required manual screening, skill assessment, and pairing — slow, inconsistent, and impossible to scale.",
    approach:
      "Built the marketplace SaaS from scratch and designed a LangGraph multi-agent system that automates the recruitment flow: semantic skill matching over Pinecone embeddings, automated screening, and Stripe-powered payments on a Django + Next.js stack.",
    outcomes: [
      "Reduced hiring time by 90%",
      "Improved matching speed by 85% via semantic skill matching",
      "Recruitment flow runs with minimal manual involvement",
    ],
    stack: [
      "Next.js",
      "Django",
      "LangGraph",
      "AI Agents",
      "Pinecone",
      "Celery",
      "Stripe",
      "PostgreSQL",
      "AWS",
    ],
    links: [
      {
        label: "Marketplace era (archive)",
        href: "https://web.archive.org/web/20240524015222/https://hirekayana.com/",
      },
    ],
    assetsDir: "content-assets/kayana",
    images: [
      {
        src: "/projects/kayana/marketplace-hero.png",
        alt: "Kayana VA marketplace homepage, 2024",
        caption: "Marketplace-era homepage (via Internet Archive, 2024)",
        width: 1920,
        height: 1200,
      },
    ],
    featured: 2,
  },
  {
    slug: "medical-imaging-ai",
    name: "Medical Imaging AI",
    tagline: "Fine-tuned medical models for real diagnostics.",
    tags: "AI · Healthcare",
    category: ["ai", "full-stack"],
    period: "2025",
    role: "Full-Stack AI Developer",
    summary:
      "Diagnostic platform on fine-tuned medical models — 87% accuracy on X-ray fracture detection, trained on a 30K+ image dataset. HIPAA & FHIR compliant.",
    problem:
      "Clinics needed faster preliminary reads across radiology, ophthalmology, and dermatology without shipping patient data to opaque third-party services.",
    approach:
      "Fine-tuned MedGemma 4B for X-ray fracture detection, ophthalmology, and 23 dermatology conditions; curated a 30K+ medical image dataset; built an automated imaging report pipeline (15K+ images processed) and deployed distributed GPU inference behind FastAPI, with web and React Native clients under HIPAA/FHIR standards.",
    outcomes: [
      "87% accuracy on X-ray fracture detection",
      "84% accuracy in ophthalmology; 23 dermatology conditions classified",
      "Automated report pipeline processing 15K+ images",
    ],
    stack: [
      "Next.js",
      "FastAPI",
      "Django",
      "PyTorch",
      "MedGemma",
      "GPU Computing",
      "React Native",
      "PostgreSQL",
      "AWS Lambda",
    ],
    links: [],
    visualsPending: true,
    assetsDir: "",
    images: [],
    featured: 3,
  },
  {
    slug: "sitescripter",
    name: "SiteScripter AI",
    tagline: "An AI copilot for the browser, shipped solo.",
    tags: "AI · Chrome Extension",
    category: ["ai", "full-stack"],
    period: "2023 – 2024",
    role: "Founder & Full-Stack AI Developer",
    summary:
      "Commercial AI browser extension for web productivity — content capture, FAISS-backed RAG, summarization. Built and shipped solo, founder to launch.",
    problem:
      "Everyday web work — writing LinkedIn content, filling forms, digesting long pages — meant constant context-switching to external AI tools that know nothing about the page you're on.",
    approach:
      "Founded and shipped the product solo: a Chrome extension with real-time content capture feeding a FAISS-backed RAG pipeline for context-aware Q&A, LinkedIn content generation, smart form auto-fill, and summarization. Django backend on AWS EC2 with Lemonsqueezy payments and CI/CD.",
    outcomes: [
      "Shipped commercial product from zero as solo founder",
      "Live on the Chrome Web Store with paid plans",
      "Context-aware AI grounded in the active page",
    ],
    stack: [
      "JavaScript",
      "Chrome Extensions",
      "Next.js",
      "Django",
      "LangGraph",
      "FAISS",
      "AWS EC2",
      "PostgreSQL",
      "Lemonsqueezy",
    ],
    links: [
      { label: "Website", href: "https://www.sitescripter.co/" },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/sitescripter-ai/dedcnapabgmhmdkpoogpddnplljhidhl",
      },
    ],
    assetsDir: "content-assets/sitescripter",
    images: [
      {
        src: "/projects/sitescripter/site-hero.png",
        alt: "SiteScripter AI website hero",
        caption: "Product site — sitescripter.co",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/sitescripter/webstore.png",
        alt: "SiteScripter AI Chrome Web Store listing",
        caption: "Chrome Web Store listing",
        width: 1920,
        height: 3929,
      },
    ],
    featured: 4,
  },
  {
    slug: "mya",
    name: "Mya Team",
    tagline: "Scheduling that never double-books.",
    tags: "SaaS · Scheduling",
    category: ["full-stack"],
    period: "2021 – 2022",
    role: "Full-Stack Developer",
    summary:
      "Service-business management platform handling bookings, staff coordination, and client data — centralized scheduling with real-time consistency enforcement.",
    problem:
      "Salons and spas juggle staff calendars, client bookings, and walk-ins across tools that drift out of sync, causing double-bookings and lost revenue.",
    approach:
      "Built centralized scheduling logic with real-time consistency enforcement and conflict resolution, coordinating bookings, staff, and client data in one system.",
    outcomes: [
      "Single source of truth for bookings and staff coordination",
      "Real-time conflict resolution across concurrent bookings",
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
    links: [
      { label: "Website", href: "https://joinmya.com/pricing-mya-team/" },
    ],
    assetsDir: "content-assets/mya",
    images: [
      {
        src: "/projects/mya/home-hero.png",
        alt: "Mya marketing site homepage",
        caption: "joinmya.com",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/mya/features-hero.png",
        alt: "Mya features page",
        caption: "Feature overview",
        width: 1920,
        height: 1200,
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
