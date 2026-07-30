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
    title: "Agent pipeline visualizer",
    date: "2026-07-30",
    summary:
      "A step-through simulation of a multi-agent orchestration pattern: a planner decomposing work, parallel workers with retries, and a judge merging results.",
  },
];
