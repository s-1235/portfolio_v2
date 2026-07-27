import Link from "next/link";

const variants = {
  primary: "bg-accent text-white hover:opacity-90",
  secondary: "border border-line text-ink hover:border-ink",
  inverse: "bg-ink text-bg hover:opacity-90",
} as const;

export default function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
