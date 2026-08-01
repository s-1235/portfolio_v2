export type Demo = {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
};

/** Registry drives the /playground index and sitemap. */
export const demos: Demo[] = [
  {
    slug: "agent-pipeline",
    title: "Agent orchestrator",
    date: "2026-08-01",
    summary:
      "A working orchestration engine in the browser: dependency scheduling, parallel tool calls, seeded failure injection, retries with backoff, skip cascades, and token budget accounting.",
  },
];
