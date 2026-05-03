import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-warm/40">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug max-w-md">
            {site.shortTagline}
          </p>
          <p className="mt-4 text-sm text-muted">
            Hospitality, by design.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-xs uppercase tracking-widest text-muted">Site</p>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 hover:text-emerald transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink/80 hover:text-emerald transition-colors"
          >
            Portal Login
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink/80 hover:text-emerald transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-6 text-xs text-muted flex flex-col md:flex-row gap-2 md:justify-between">
          <p>© {year} {site.name}. Built with care.</p>
          <p>Founded by {site.founder}.</p>
        </div>
      </div>
    </footer>
  );
}
