import Link from "next/link";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="py-8">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Link href="/" className="font-display text-base whitespace-nowrap sm:text-xl">
          Sadam Khan
        </Link>
        <nav className="flex items-center gap-2 text-xs sm:gap-8 sm:text-sm">
          <Link href="/work" className="text-muted transition hover:text-ink">
            Work
          </Link>
          <Link
            href="/writing"
            className="text-muted transition hover:text-ink"
          >
            Writing
          </Link>
          <Link
            href="/playground"
            className="hidden text-muted transition hover:text-ink sm:inline"
          >
            Playground
          </Link>
          <Link href="/about" className="text-muted transition hover:text-ink">
            About
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-2.5 py-1 whitespace-nowrap text-bg transition hover:opacity-90 sm:px-4 sm:py-2"
          >
            <span className="sm:hidden">Contact</span>
            <span className="hidden sm:inline">Get in touch</span>
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
