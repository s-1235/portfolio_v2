import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import AgentPipelineDemo from "@/components/playground/AgentPipelineDemo";

export const metadata: Metadata = {
  title: "Agent pipeline visualizer",
  description:
    "A step-through simulation of a multi-agent orchestration pattern: planner, parallel workers with retries, and a judge.",
};

export default function AgentPipelinePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-20">
          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-widest uppercase text-accent">
              Playground
            </p>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Agent pipeline visualizer
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              The orchestration shape behind systems like Podding and Kayana: a
              planner decomposes the request, workers run in parallel and
              sometimes retry, and a judge scores and merges the results.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <AgentPipelineDemo />
          </Reveal>
          <Reveal className="mt-8">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              This is a simulation: timings are scripted and no model calls are
              made. The pattern is real. In production I build it with
              LangGraph, where each node is an agent with tools and the judge
              step is what keeps parallel work coherent.
            </p>
            <p className="mt-6">
              <Link
                href="/playground"
                className="text-sm text-muted transition hover:text-ink"
              >
                ← All demos
              </Link>
            </p>
          </Reveal>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
