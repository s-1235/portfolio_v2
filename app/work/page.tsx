import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Sadam Khan: AI products, SaaS platforms, and full stack systems.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-16">
          <Reveal>
            <p className="mb-6 with-dot font-mono text-xs font-medium tracking-widest uppercase text-accent">
              Work
            </p>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Everything I have built, in one place.
            </h1>
          </Reveal>
        </Container>
        <section className="pb-20">
          <Container>
            <WorkGrid projects={projects} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
