// Temporary design-system demo route — remove in Phase 7 QA.
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function Preview() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-16">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase text-accent">
            Eyebrow / Accent
          </p>
          <h1 className="font-display text-6xl leading-[1.05] tracking-tight">
            Display heading one
          </h1>
          <h2 className="font-display mt-6 text-3xl">Heading two</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Body large — muted. I design and build SaaS products and LLM-powered
            applications end-to-end.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Body small — muted, for captions and metadata.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#">Primary</Button>
            <Button href="#" variant="secondary">
              Secondary
            </Button>
            <Button href="#" variant="inverse">
              Inverse
            </Button>
          </div>
        </Container>

        <section className="bg-block py-16 text-block-ink">
          <Container>
            <Reveal>
              <h2 className="font-display mb-8 text-3xl">Graphite block</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal>
                <article className="rounded-2xl bg-block-surface p-8">
                  <p className="mb-3 text-xs tracking-widest uppercase text-accent">
                    AI · SaaS
                  </p>
                  <h3 className="font-display text-2xl">Card on graphite</h3>
                  <p className="mt-3 text-sm leading-relaxed text-block-muted">
                    Card body text on the dark section uses block-muted.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <article className="rounded-2xl border border-line bg-surface p-8 text-ink">
                  <p className="mb-3 text-xs tracking-widest uppercase text-accent">
                    AI · Marketplace
                  </p>
                  <h3 className="font-display text-2xl">Card on surface</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Light surface card for contrast comparison.
                  </p>
                </article>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
