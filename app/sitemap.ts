import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { posts } from "@/content/writing";
import { demos } from "@/content/playground";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/work`, priority: 0.9 },
    ...projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/writing`, priority: 0.7 },
    ...posts.map((p) => ({
      url: `${siteUrl}/writing/${p.slug}`,
      priority: 0.6,
    })),
    { url: `${siteUrl}/playground`, priority: 0.6 },
    ...demos.map((d) => ({
      url: `${siteUrl}/playground/${d.slug}`,
      priority: 0.5,
    })),
    { url: `${siteUrl}/about`, priority: 0.7 },
  ];
}
