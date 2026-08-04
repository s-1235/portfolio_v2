import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { demos } from "@/content/playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive demos from my work with agents and orchestration.",
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function PlaygroundPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-20">
          <Reveal>
            <p className="mb-6 with-dot font-mono text-xs font-medium tracking-widest uppercase text-accent">
              Playground
            </p>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Small tools you can try in the browser.
            </h1>
          </Reveal>
          <div className="mt-14 space-y-10">
            {demos.map((demo, i) => (
              <Reveal key={demo.slug} delay={i * 0.04}>
                <article className="border-t border-line pt-8">
                  <p className="font-mono text-xs text-muted">{fmt(demo.date)}</p>
                  <h2 className="font-display mt-2 text-2xl">
                    <Link
                      href={`/playground/${demo.slug}`}
                      className="transition hover:text-accent"
                    >
                      {demo.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-xl text-muted">{demo.summary}</p>
                  <Link
                    href={`/playground/${demo.slug}`}
                    className="mt-4 inline-block text-sm font-medium transition hover:text-accent"
                  >
                    Open →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
