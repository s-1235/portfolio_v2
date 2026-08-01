import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import OrchestratorDemo from "@/components/playground/OrchestratorDemo";

export const metadata: Metadata = {
  title: "Agent orchestrator",
  description:
    "A real agent orchestration engine running in the browser: dependency scheduling, parallel tool calls, seeded failure injection, retries with backoff, and budget accounting.",
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
              Agent orchestrator
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              A working orchestration engine, running entirely in your browser.
              It resolves a dependency graph, fans tool calls out under a
              concurrency cap, injects seeded failures, retries with
              exponential backoff, cascades skips past dead branches, and
              charges every attempt against a token budget.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <OrchestratorDemo />
          </Reveal>
          <Reveal className="mt-8">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              This is a real engine, not an animation. The scheduler, retry
              policy, budget accounting, and skip cascade all run live in the
              page as you press Run. Turn failure up with zero retries
              and watch branches die; give it a tight budget and watch the
              expensive drafter starve. These are the same shapes I build in
              production with LangGraph: planners fanning out to tools, critics
              gating merges, and budgets that stop runaway spend. Runs are
              reproducible, the same seed gives the same run.
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
