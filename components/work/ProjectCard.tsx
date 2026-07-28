import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl bg-block-surface p-8 transition hover:-translate-y-1"
    >
      <p className="mb-3 text-xs tracking-widest uppercase text-accent">
        {project.tags}
      </p>
      <h3 className="font-display text-2xl text-block-ink">{project.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-block-muted">
        {project.summary}
      </p>
      <p className="mt-6 text-xs text-block-muted">
        {project.stack.slice(0, 5).join(" · ")}
      </p>
      <p className="mt-4 text-sm font-medium text-block-ink transition group-hover:text-accent">
        Read case study →
      </p>
    </Link>
  );
}
