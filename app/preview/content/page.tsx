// Temporary content-proofread dump — remove in Phase 7 QA.
import Container from "@/components/ui/Container";
import { projects } from "@/content/projects";
import { experience, education } from "@/content/experience";
import { site, socials } from "@/content/site";

export default function ContentDump() {
  return (
    <Container className="space-y-12 py-16">
      <section>
        <h1 className="font-display mb-4 text-3xl">Site</h1>
        <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-6 text-xs leading-relaxed">
          {JSON.stringify({ site, socials }, null, 2)}
        </pre>
      </section>
      {projects.map((p) => (
        <section key={p.slug}>
          <h2 className="font-display mb-1 text-2xl">
            {p.name}{" "}
            {p.nda && <span className="text-sm text-accent">[NDA]</span>}{" "}
            {p.visualsPending && (
              <span className="text-sm text-accent">[visuals pending]</span>
            )}
          </h2>
          <p className="mb-3 text-sm text-muted">
            {p.tags} · {p.period} · {p.role} · featured: {p.featured ?? "no"}
          </p>
          <p className="mb-2 italic">{p.tagline}</p>
          <p className="mb-2">
            <strong>Summary:</strong> {p.summary}
          </p>
          <p className="mb-2">
            <strong>Problem:</strong> {p.problem}
          </p>
          <p className="mb-2">
            <strong>Approach:</strong> {p.approach}
          </p>
          <ul className="mb-2 list-disc pl-6">
            {p.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="mb-2 text-sm text-muted">{p.stack.join(" · ")}</p>
          <p className="text-sm">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="mr-4 text-accent">
                {l.label}
              </a>
            ))}
          </p>
        </section>
      ))}
      <section>
        <h1 className="font-display mb-4 text-3xl">Experience</h1>
        {experience.map((e) => (
          <div key={e.company} className="mb-6">
            <h3 className="font-medium">
              {e.role} — {e.company}{" "}
              <span className="text-muted">({e.period})</span>
            </h3>
            <ul className="list-disc pl-6 text-sm text-muted">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-sm text-muted">
          {education.degree} — {education.school} ({education.period})
        </p>
      </section>
    </Container>
  );
}
