/** Canonical production URL. Vercel injects VERCEL_PROJECT_PRODUCTION_URL at build. */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const site = {
  name: "Sadam Khan",
  title: "Sadam Khan · Full-Stack Engineer · AI Systems",
  positioning: "Full Stack Engineer · AI Systems",
  description:
    "Full stack engineer building SaaS products and LLM systems. Currently working on LLM evals and benchmarks.",
  location: "Lahore, Pakistan",
  email: "sadamkhan505880@gmail.com",
  heroHeading: "I build AI products end to end.",
  heroSub:
    "Full stack engineer based in Lahore. For the last six years I have been building SaaS products and LLM systems, and these days most of my time goes into LLM evals and benchmarks.",
  bio: [
    "I work across the whole stack: React and Next.js on the front end, Django and Node on the back end, and LLM systems in between. Right now most of my work is in LLM evaluation and benchmark design for frontier models.",
    "Over the last six years I have shipped products in podcasting, recruitment, healthcare, and developer tooling, as a founder, an employee, and a consultant.",
  ],
  toptalBadge:
    "https://www.toptal.com/developers/resume/saddam-hussain",
};

export const socials: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/s-1235" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sadam-khan-9aba2b213/" },
  { label: "X", href: "https://x.com/SadamKh88866704" },
  {
    label: "Toptal",
    href: "https://www.toptal.com/developers/resume/saddam-hussain",
  },
];
