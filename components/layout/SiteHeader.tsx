import Link from "next/link";
import Container from "@/components/ui/Container";

export default function SiteHeader() {
  return (
    <header className="py-8">
      <Container className="flex items-center justify-between">
        <Link href="/" className="font-display text-lg whitespace-nowrap sm:text-xl">
          Sadam Khan
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-8">
          <Link href="/work" className="text-muted transition hover:text-ink">
            Work
          </Link>
          <Link
            href="/writing"
            className="text-muted transition hover:text-ink"
          >
            Writing
          </Link>
          <Link href="/about" className="text-muted transition hover:text-ink">
            About
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-4 py-2 whitespace-nowrap text-bg transition hover:opacity-90"
          >
            Get in touch
          </Link>
        </nav>
      </Container>
    </header>
  );
}
