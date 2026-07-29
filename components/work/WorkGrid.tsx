"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import ProjectCard from "@/components/work/ProjectCard";

const labels: Record<ProjectCategory, string> = {
  ai: "AI",
  "full-stack": "Full-Stack",
  frontend: "Frontend",
};

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const present = (Object.keys(labels) as ProjectCategory[]).filter((c) =>
    projects.some((p) => p.category.includes(c)),
  );
  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3">
        {(["all", ...present] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === c
                ? "bg-ink text-bg"
                : "border border-line text-muted hover:text-ink"
            }`}
          >
            {c === "all" ? "All" : labels[c]}
          </button>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
