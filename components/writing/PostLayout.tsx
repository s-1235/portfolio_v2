import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Container from "@/components/ui/Container";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function PostLayout({
  title,
  date,
  children,
}: {
  title: string;
  date: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="pt-12 pb-20">
          <p className="text-sm text-muted">{fmt(date)}</p>
          <h1 className="font-display mt-2 mb-10 max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="prose">{children}</div>
          <p className="mt-14 border-t border-line pt-8">
            <Link
              href="/writing"
              className="text-sm text-muted transition hover:text-ink"
            >
              ← All writing
            </Link>
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
