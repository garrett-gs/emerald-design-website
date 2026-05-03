import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function CtaButton({ href, children, variant = "primary", className }: Props) {
  const styles =
    variant === "primary"
      ? "bg-emerald text-cream hover:bg-emerald-deep"
      : "border border-emerald/40 text-emerald hover:bg-emerald hover:text-cream";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm tracking-wide transition-colors",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
