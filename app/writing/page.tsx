import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { posts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on building AI products, LLM evaluation, and full stack engineering.",
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function WritingPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-20">
          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-widest uppercase text-accent">
              Writing
            </p>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Notes from my work.
            </h1>
          </Reveal>
          <div className="mt-14 space-y-10">
            {sorted.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.04}>
                <article className="border-t border-line pt-8">
                  <p className="text-sm text-muted">{fmt(post.date)}</p>
                  <h2 className="font-display mt-2 text-2xl">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="transition hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-xl text-muted">{post.summary}</p>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="mt-4 inline-block text-sm font-medium transition hover:text-accent"
                  >
                    Read →
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
