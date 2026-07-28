import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

const projects = [
  {
    name: "Podding",
    tags: "AI · SaaS",
    description:
      "AI-driven podcast guest booking platform automating end-to-end workflows with semantic matching. Cut workflow time by 85–88% with a 95% podcast acceptance rate.",
    stack: "Next.js · Django · LangGraph · RAG · PostgreSQL",
  },
  {
    name: "Kayana",
    tags: "AI · Marketplace",
    description:
      "AI-driven hiring marketplace where recruitment runs with minimal manual involvement. Multi-agent automation reduced hiring time by 90%.",
    stack: "Next.js · Django · LangGraph · Pinecone · Stripe",
  },
  {
    name: "Medical Imaging AI",
    tags: "AI · Healthcare",
    description:
      "Diagnostic platform on fine-tuned medical models — 87% accuracy on X-ray fracture detection, trained on a 30K+ image dataset. HIPAA & FHIR compliant.",
    stack: "FastAPI · PyTorch · MedGemma · React Native",
  },
  {
    name: "SiteScripter AI",
    tags: "AI · Chrome Extension",
    description:
      "Commercial AI browser extension for web productivity — content capture, FAISS-backed RAG, summarization. Built and shipped solo, founder to launch.",
    stack: "Next.js · Django · FAISS · Chrome APIs",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-20 pb-24">
          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-widest uppercase text-accent">
              Full-Stack Engineer · AI Systems
            </p>
            <h1 className="font-display max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Building AI products that ship, scale, and stick.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m Sadam Khan — a full-stack engineer specializing in SaaS
              products and LLM-powered applications, from architecture to the
              last interaction detail.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#work">View my work</Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>

        <section id="work" className="bg-block py-20 text-block-ink">
          <Container>
            <Reveal>
              <h2 className="font-display mb-4 text-3xl sm:text-4xl">
                Selected work
              </h2>
              <p className="mb-10 max-w-xl text-block-muted">
                A few of the products I&apos;ve built and scaled. Full case
                studies are on the way.
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05}>
                  <article className="flex h-full flex-col rounded-2xl bg-block-surface p-8">
                    <p className="mb-3 text-xs tracking-widest uppercase text-accent">
                      {p.tags}
                    </p>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-block-muted">
                      {p.description}
                    </p>
                    <p className="mt-6 text-xs text-block-muted">{p.stack}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="about" className="py-20">
          <Container>
            <Reveal>
              <h2 className="font-display mb-6 text-3xl sm:text-4xl">About</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                I diagnose and resolve performance, architectural, and
                behavioral issues in production systems, and currently focus on
                LLM evaluation and benchmark design. Over the last six years
                I&apos;ve shipped products across podcasting, recruitment,
                healthcare, and developer tooling — as a founder, senior
                engineer, and consultant.
              </p>
            </Reveal>
          </Container>
        </section>

        <section id="contact" className="border-t border-line py-20">
          <Container>
            <Reveal>
              <h2 className="font-display mb-6 text-3xl sm:text-4xl">
                Let&apos;s build something.
              </h2>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
                Have a product to ship or a system to scale? I&apos;m open to
                select engagements.
              </p>
              <Button href="mailto:sadamkhan505880@gmail.com">Email me</Button>
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
