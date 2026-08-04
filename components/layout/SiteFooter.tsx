import Container from "@/components/ui/Container";
import { socials } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Sadam Khan</span>
        <nav className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep transition hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
