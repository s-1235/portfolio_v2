export type Post = {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
};

/** Registry drives the /writing index and sitemap. Post content lives in
 *  app/writing/<slug>/page.mdx. */
export const posts: Post[] = [
  {
    slug: "how-frontier-ai-benchmarks-get-built",
    title: "How frontier AI benchmarks actually get built",
    date: "2026-08-01",
    summary:
      "What I have learned building benchmark tasks and eval tooling, and how the same craft shows up in the public record from OpenAI, METR, and Epoch AI.",
  },
];
