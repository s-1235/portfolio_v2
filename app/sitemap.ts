import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/work`, priority: 0.9 },
    ...projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/about`, priority: 0.7 },
  ];
}
