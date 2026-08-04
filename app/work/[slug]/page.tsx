import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-16">
          <Reveal>
            <p className="mb-6 font-mono text-xs font-medium tracking-widest uppercase text-accent">
              {project.tags}
            </p>
            <h1 className="font-display max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {project.tagline}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">Role</dt>
                <dd className="mt-1 font-medium">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">Period</dt>
                <dd className="mt-1 font-medium">{project.period}</dd>
              </div>
              {project.links.length > 0 && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">Links</dt>
                  <dd className="mt-1 space-x-4">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </Container>

        <section className="border-t border-line py-16">
          <Container>
            <Reveal>
              <h2 className="font-display mb-8 text-3xl">Outcomes</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {project.outcomes.map((o, i) => (
                <Reveal key={o} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6 text-sm leading-relaxed">
                    {o}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <Container className="py-16">
          <div className="grid gap-12 sm:grid-cols-2">
            <Reveal>
              <h2 className="font-display mb-4 text-2xl">The problem</h2>
              <p className="leading-relaxed text-muted">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mb-4 text-2xl">The approach</h2>
              <p className="leading-relaxed text-muted">{project.approach}</p>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <h2 className="font-display mb-4 text-2xl">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>

        <Container className="pb-16">
          {project.nda && (
            <Reveal>
              <p className="mb-8 rounded-2xl border border-line bg-accent-soft/40 p-6 text-sm leading-relaxed">
                <span className="font-medium">Under NDA.</span> The product
                interface is confidential. Shown here are public marketing
                materials and the platform login only. Outcomes above are
                publicly listed figures.
              </p>
            </Reveal>
          )}
          {project.visualsPending && (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
                Case-study visuals are being prepared.
              </div>
            </Reveal>
          )}
          <div className="space-y-10">
            {project.images.map((img) => (
              <Reveal key={img.src}>
                <figure>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 960px, 100vw"
                    className="rounded-2xl border border-line"
                  />
                  {img.caption && (
                    <figcaption className="mt-3 font-mono text-xs text-muted">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>

        <section className="border-t border-line py-12">
          <Container className="flex items-center justify-between">
            <Link href="/work" className="text-sm text-muted hover:text-ink">
              ← All work
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="text-sm font-medium hover:text-accent"
            >
              Next: {next.name} →
            </Link>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
