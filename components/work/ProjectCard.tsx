import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const thumb = project.images[0];
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      {thumb ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={thumb.src}
            alt={thumb.alt}
            width={thumb.width}
            height={thumb.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[8/5] object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="flex aspect-[8/5] items-center justify-center rounded-2xl border border-line bg-accent-soft/40">
          <span className="font-display text-3xl">{project.name}</span>
        </div>
      )}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl transition group-hover:text-accent">
          {project.name}
        </h3>
        <p className="text-xs tracking-widest uppercase text-muted">
          {project.tags}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
    </Link>
  );
}
