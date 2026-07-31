export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Expert Crowd / Vetto Inc",
    role: "Tech Support Specialist, LLM Enhancements",
    period: "2026",
    points: [
      "Created an AI benchmark engineering handbook",
      "Managed 300+ contributors on frontier model evaluation",
      "Identified critical platform bugs and infrastructure issues; proposed improvements that were adopted",
    ],
  },
  {
    company: "Medical Imaging AI Platform",
    role: "Full-Stack AI Developer",
    period: "2025",
    points: [
      "Developed diagnostic mobile and web applications on fine-tuned medical models",
      "Built an automated medical imaging report pipeline processing 15K+ images",
      "Deployed distributed GPU inference infrastructure",
    ],
  },
  {
    company: "Podding",
    role: "Senior Full-Stack AI Developer",
    period: "2024 to 2025",
    points: [
      "Built the AI podcast booking platform solo",
      "Implemented semantic matching over vector databases; integrated Rephonic podcast data",
      "Built automated email outreach and response tracking",
    ],
  },
  {
    company: "SiteScripter AI",
    role: "Founder & Full-Stack AI Developer",
    period: "2023 to 2024",
    points: [
      "Founded and shipped a commercial Chrome extension as a solo founder",
      "Implemented a RAG pipeline for context-aware Q&A and LLM content features",
      "Deployed on AWS with payment integration",
    ],
  },
  {
    company: "Kayana",
    role: "Full-Stack AI Developer",
    period: "2022 to 2023",
    points: [
      "Built a VA hiring marketplace SaaS from scratch",
      "Designed a LangGraph multi-agent system for recruitment automation",
      "Semantic skill matching cut pairing time by 85% and hiring time by 90%",
    ],
  },
  {
    company: "Revinate",
    role: "Full-Stack Developer",
    period: "2021 to 2022",
    points: [
      "Contributed to an enterprise hotel platform serving 5,000+ properties",
      "Worked across React, Node.js, Python, and Java services",
      "Implemented real-time data pipelines with Kafka and Protobuf on distributed microservices",
    ],
  },
  {
    company: "Kallidus",
    role: "Software Engineer",
    period: "2020 to 2021",
    points: [
      "Built Ruby on Rails REST APIs with background processing",
      "Optimized CSV report generation from 60 minutes to 3 minutes",
      "Built a custom npm state-management library used by 50+ components; executed a Vue-to-React migration",
    ],
  },
];

export const education = {
  degree: "BSc Computer Science",
  school: "COMSATS University Islamabad, Lahore Campus",
  period: "2017 to 2021",
};
