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
    slug: "rebuilding-my-portfolio-for-the-ai-era",
    title: "Rebuilding my portfolio for the AI era",
    date: "2026-07-29",
    summary:
      "Why I rebuilt my portfolio from scratch and the two production bugs I hit on the way.",
  },
];
