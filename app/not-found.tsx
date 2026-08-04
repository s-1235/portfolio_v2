import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-32 text-center">
          <p className="mb-4 with-dot font-mono text-xs font-medium tracking-widest uppercase text-accent">
            404
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-4 text-muted">
            The link may be old, or the page moved during the rebuild.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
          >
            Back home
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
