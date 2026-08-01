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
    slug: "vetto",
    name: "Vetto AI",
    tagline: "Benchmark platform for frontier AI labs.",
    tags: "AI · Evals",
    category: ["ai", "full-stack"],
    period: "2026",
    role: "Full-Stack Engineer",
    summary:
      "Coding Arena, the platform where Vetto's global talent pool authors frontier coding benchmarks: guided task creation, auto-generated oracles and test cases, sandboxed multi-model runs, and VS Code integration with live pass rates and budget tracking.",
    problem:
      "Frontier labs need benchmarks that make top models genuinely struggle on reasoning and agentic tasks: work that demands reading the full context, exploring the environment, and never assuming or hallucinating what is not there. Authoring such tasks is a craft. Each one must be provably solvable, must leak no part of the solution in its instructions, and must be calibrated so that even the strongest models pass only partially. Contributors need serious tooling to do that at scale.",
    approach:
      "Built Coding Arena as a full-stack engineer on a Next.js and Django platform with an agentic pipeline architecture. A contributor picks a task category (software engineering, machine learning, computer vision, networking, and more), describes the task and its environment in plain language, and the system generates the task files, the oracle, and test cases, then runs frontier models against it inside a sandboxed environment the agent cannot bypass. Every task is executed across repeated runs per model, with log analysis to confirm the model follows the criteria and the instructions expose nothing. Tasks that models pass fully are sent back for refinement with harder reasoning challenges until they land in the target difficulty band. The VS Code integration gives contributors a sidebar with live logs, per-model pass rates, refinement history, and per-task budget tracking. I also authored eval tasks and the AI benchmark engineering handbook used across the talent pool.",
    outcomes: [
      "Benchmark tasks calibrated so top frontier models pass only 30 to 40 percent",
      "Guided pipeline from plain-language description to runnable, verified task",
      "300+ contributors supported on frontier model evaluation",
    ],
    stack: [
      "Next.js",
      "Django",
      "TypeScript",
      "Agentic Pipelines",
      "VS Code Integration",
      "Sandboxed Execution",
      "LLM Evals",
      "Benchmark Design",
    ],
    links: [{ label: "vetto.ai", href: "https://vetto.ai/" }],
    assetsDir: "content-assets/vetto",
    images: [
      {
        src: "/projects/vetto/home-hero.png",
        alt: "Vetto AI homepage: We shape how models learn",
        caption: "vetto.ai",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/vetto/careers.png",
        alt: "Vetto careers page",
        caption: "Hiring for the research product",
        width: 1920,
        height: 1200,
      },
    ],
    featured: 1,
  },
  {
    slug: "podding",
    name: "Podding",
    tagline: "AI platform for booking podcast guests.",
    tags: "AI · SaaS",
    category: ["ai", "full-stack"],
    period: "2024 to 2025",
    role: "Senior Full-Stack AI Developer",
    summary:
      "AI-driven podcast guest booking platform automating end-to-end workflows with semantic matching. Cut workflow time by 85 to 88% with a 95% podcast acceptance rate.",
    problem:
      "Booking podcast guests is a manual grind: researching shows, matching topics, outreach, and follow-ups consume hours per placement and most pitches go unanswered.",
    approach:
      "Built the platform solo: LangGraph-orchestrated agents over a RAG pipeline with vector-database semantic matching between guests and shows, Rephonic API for podcast data, automated email outreach with response tracking, and real-time updates over Socket.IO. Django/Celery backend, Next.js + Shadcn UI frontend, deployed across Vercel and AWS Lambda.",
    outcomes: [
      "Reduced end-to-end workflow time by 85 to 88%",
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
        caption: "podding.co",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/podding/pod-system.png",
        alt: "The Pod System section of the Podding site",
        caption: "The Pod System",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/podding/our-approach.png",
        alt: "Our Approach section of the Podding site",
        caption: "Our Approach",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/podding/app-login.png",
        alt: "Podding platform login screen",
        caption: "Platform login",
        width: 1440,
        height: 900,
      },
    ],
    featured: 2,
  },
  {
    slug: "kayana",
    name: "Kayana",
    tagline: "AI hiring marketplace for virtual assistants.",
    tags: "AI · Marketplace",
    category: ["ai", "full-stack"],
    period: "2022 to 2023",
    role: "Full-Stack AI Developer",
    summary:
      "AI-driven VA hiring marketplace where recruitment runs with minimal manual involvement. Multi-agent automation reduced hiring time by 90%.",
    problem:
      "Matching virtual assistants with employers required manual screening, skill assessment, and pairing: slow, inconsistent, and impossible to scale.",
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
        label: "Original marketplace site",
        href: "https://web.archive.org/web/20240524015222/https://hirekayana.com/",
      },
    ],
    assetsDir: "content-assets/kayana",
    images: [
      {
        src: "/projects/kayana/marketplace-hero.png",
        alt: "Kayana VA marketplace homepage, 2024",
        caption: "Marketplace homepage, 2024",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/kayana/how-it-works.png",
        alt: "How Kayana works page with the sign up flow",
        caption: "How it works, with the product sign up flow",
        width: 1920,
        height: 1200,
      },
    ],
    featured: 3,
  },
  {
    slug: "medical-imaging-ai",
    name: "Medical Imaging AI",
    tagline: "Diagnostics with fine-tuned medical models.",
    tags: "AI · Healthcare",
    category: ["ai", "full-stack"],
    period: "2025",
    role: "Full-Stack AI Developer",
    summary:
      "Diagnostic platform on fine-tuned medical models with 87% accuracy on X-ray fracture detection, trained on a 30K+ image dataset. HIPAA & FHIR compliant.",
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
    featured: 4,
  },
  {
    slug: "sitescripter",
    name: "SiteScripter AI",
    tagline: "AI Chrome extension for everyday web work.",
    tags: "AI · Chrome Extension",
    category: ["ai", "full-stack"],
    period: "2023 to 2024",
    role: "Founder & Full-Stack AI Developer",
    summary:
      "Commercial AI browser extension for web productivity: content capture, FAISS-backed RAG, summarization. Built and shipped solo, founder to launch.",
    problem:
      "Everyday web work like writing LinkedIn content, filling forms, and digesting long pages meant constant context-switching to external AI tools that know nothing about the page you're on.",
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
        caption: "Product site, sitescripter.co",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/sitescripter/features.png",
        alt: "SiteScripter features and setup steps",
        caption: "Features and setup",
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
    featured: 5,
  },
  {
    slug: "mya",
    name: "Mya Team",
    tagline: "Bookings, staff, and client data in one place.",
    tags: "SaaS · Scheduling",
    category: ["ai", "full-stack"],
    period: "2021 to 2022",
    role: "Full-Stack Developer",
    summary:
      "Platform for service businesses that manage bookings, staff, and client data in one place, with centralized scheduling logic that stays consistent even under simultaneous bookings.",
    problem:
      "Service businesses were relying on separate tools for scheduling, availability, and client tracking. That fragmentation led to double bookings, inconsistent data, and constant manual coordination.",
    approach:
      "Centralized the scheduling logic and enforced consistency in the back end instead of relying on manual fixes. Built the APIs and data models for appointments, staff roles, and availability updates so the system stays consistent when multiple actions happen at once, including the edge cases around booking conflicts, with real-time updates over Socket.IO and background jobs on Celery with Redis as the broker. Semantic matching runs on OpenAI embeddings with LangGraph agents for the AI integrations. On the front end, built clear views for managing schedules and client data, keeping the interface simple while the system handles the complexity underneath.",
    outcomes: [
      "One system replacing fragmented scheduling and client tools",
      "Consistent booking state under simultaneous actions, with conflict handling",
      "Real-time schedule and availability updates",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn UI",
      "LangGraph",
      "OpenAI Embeddings",
      "Celery",
      "Redis",
      "Socket.IO",
      "Stripe",
      "AWS",
      "Microservices",
    ],
    links: [
      { label: "Website", href: "https://joinmya.com/pricing-mya-team/" },
    ],
    assetsDir: "content-assets/mya",
    featured: 6,
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
      {
        src: "/projects/mya/pricing-hero.png",
        alt: "Mya pricing page",
        caption: "Pricing",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/mya/integrations-hero.png",
        alt: "Mya integrations page",
        caption: "Integrations",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/mya/testimonials-hero.png",
        alt: "Mya testimonials page",
        caption: "Testimonials",
        width: 1920,
        height: 1200,
      },
    ],
  },
  {
    slug: "revinate",
    name: "Revinate",
    tagline: "Hotel platform serving 5,000+ properties.",
    tags: "SaaS · Hospitality",
    category: ["full-stack"],
    period: "2021 to 2022",
    role: "Full-Stack Developer",
    summary:
      "Enterprise hotel management platform serving 5,000+ properties. Work across React, Node.js, Python, and Java services with real-time Kafka data pipelines.",
    problem:
      "Hotel groups run marketing and revenue on guest data scattered across property systems. At enterprise scale that demands reliable, real-time pipelines across distributed services.",
    approach:
      "Contributed across a distributed microservices platform: React frontends, Node.js, Python, and Java services, and real-time data pipelines built on Kafka with Protobuf schemas.",
    outcomes: [
      "Platform served 5,000+ hotel properties",
      "Real-time data pipelines with Kafka and Protobuf",
      "Contributions spanning four service stacks",
    ],
    stack: [
      "React",
      "Node.js",
      "Python",
      "Java",
      "Kafka",
      "Protobuf",
      "Microservices",
    ],
    links: [{ label: "Website", href: "https://www.revinate.com/" }],
    assetsDir: "content-assets/revinate",
    featured: 7,
    images: [
      {
        src: "/projects/revinate/home-hero.png",
        alt: "Revinate marketing site homepage",
        caption: "revinate.com",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/revinate/products.png",
        alt: "Revinate product suite overview",
        caption: "The product suite",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/revinate/marketing.png",
        alt: "Revinate Marketing product page",
        caption: "Revinate Marketing",
        width: 1920,
        height: 1200,
      },
    ],
  },
  {
    slug: "kallidus",
    name: "Kallidus",
    tagline: "APIs and reporting for an HR learning platform.",
    tags: "SaaS · HR Tech",
    category: ["full-stack"],
    period: "2020 to 2021",
    role: "Software Engineer",
    summary:
      "HR and learning software: Ruby on Rails REST APIs with background processing, report generation cut from 60 minutes to 3, and a Vue-to-React migration.",
    problem:
      "Learning platforms carry heavy reporting workloads. A key CSV report took 60 minutes to generate, and aging frontend code slowed feature work.",
    approach:
      "Built Rails REST APIs with background processing, restructured the database schema with strategic indexing to speed up reporting, built a custom npm state-management library, and executed a Vue-to-React migration.",
    outcomes: [
      "Report generation cut from 60 minutes to 3 minutes",
      "Custom npm state library adopted by 50+ components",
      "Completed a Vue-to-React migration",
    ],
    stack: ["Ruby on Rails", "REST APIs", "Vue", "React", "npm", "SQL"],
    links: [{ label: "Website", href: "https://www.kallidus.com/" }],
    assetsDir: "content-assets/kallidus",
    featured: 8,
    images: [
      {
        src: "/projects/kallidus/home-hero.png",
        alt: "Kallidus marketing site homepage",
        caption: "kallidus.com",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/kallidus/outcomes.png",
        alt: "Kallidus customer outcome stories",
        caption: "Customer outcomes",
        width: 1920,
        height: 1200,
      },
      {
        src: "/projects/kallidus/product-ui.png",
        alt: "Kallidus learning platform interface",
        caption: "The learning platform",
        width: 1920,
        height: 1200,
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
