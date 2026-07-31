import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import ProjectCard from "@/components/work/ProjectCard";
import ContactForm from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-20 pb-24">
          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-widest uppercase text-accent">
              {site.positioning}
            </p>
            <h1 className="font-display max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              {site.heroHeading}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {site.heroSub}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#work">View my work</Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>

        <section id="work" className="border-t border-line py-20">
          <Container>
            <Reveal>
              <h2 className="font-display mb-4 text-3xl sm:text-4xl">
                Selected work
              </h2>
              <p className="mb-12 max-w-xl text-muted">
                Products I&apos;ve built and scaled, end to end.
              </p>
            </Reveal>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {featuredProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05} className="min-w-0">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12">
              <Link
                href="/work"
                className="text-sm font-medium transition hover:text-accent"
              >
                View all work →
              </Link>
            </Reveal>
          </Container>
        </section>

        <section id="about" className="py-20">
          <Container>
            <Reveal>
              <h2 className="font-display mb-6 text-3xl sm:text-4xl">About</h2>
              <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                {site.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
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
                select engagements. Use the form, or{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-accent hover:underline"
                >
                  email me directly
                </a>
                .
              </p>
              <ContactForm />
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
