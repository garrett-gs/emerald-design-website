import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/70 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 sm:h-20 md:h-28 flex items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center text-ink hover:opacity-80 transition-opacity shrink-0"
        >
          <Image
            src="/edh-header-logo.png"
            alt={site.name}
            width={3281}
            height={698}
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 300px, 200px"
            className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 hover:text-emerald transition-colors hidden sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald/30 text-emerald hover:bg-emerald hover:text-cream transition-colors text-xs md:text-sm"
          >
            Portal Login
          </a>
        </nav>
      </div>
    </header>
  );
}
