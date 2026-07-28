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
    "Selected projects: AI products, SaaS platforms, and full-stack systems built and scaled by Sadam Khan.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-16">
          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-widest uppercase text-accent">
              Work
            </p>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Products built end-to-end, from architecture to launch.
            </h1>
          </Reveal>
        </Container>
        <section className="bg-block py-16 text-block-ink">
          <Container>
            <WorkGrid projects={projects} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
