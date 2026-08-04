import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { experience, education } from "@/content/experience";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-20">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <Reveal>
              <Image
                src="/brand/sadamAva.png"
                alt="Sadam Khan"
                width={160}
                height={160}
                className="rounded-2xl"
              />
            </Reveal>
            <Reveal delay={0.05} className="max-w-2xl">
              <p className="mb-4 font-mono text-xs font-medium tracking-widest uppercase text-accent">
                About
              </p>
              <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                {site.name}
              </h1>
              <p className="mt-2 text-muted">
                {site.positioning} · {site.location}
              </p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {site.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`mailto:${site.email}`}>Get in touch</Button>
                <Button href={site.toptalBadge} variant="secondary">
                  Verified on Toptal ↗
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>

        <section className="border-t border-line py-16">
          <Container>
            <Reveal>
              <h2 className="font-display mb-10 text-3xl">Experience</h2>
            </Reveal>
            <ol className="space-y-10 border-l border-line pl-8">
              {experience.map((e, i) => (
                <Reveal key={e.company} delay={i * 0.03}>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-2 h-2 w-2 rounded-full bg-accent" />
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                    <h3 className="font-display mt-1 text-xl">
                      {e.role}, {e.company}
                    </h3>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                      {e.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-12">
              <p className="text-sm text-muted">
                {education.degree}, {education.school} ({education.period})
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
