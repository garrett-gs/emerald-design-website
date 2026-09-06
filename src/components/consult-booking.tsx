"use client";

import { useEffect, useState } from "react";
import { CalEmbed } from "@/components/cal-embed";
import { formatPrice } from "@/lib/consults";
import type { Consult } from "@/lib/site";

// The card CTAs link to #book-virtual / #book-onsite so a visitor who picked a
// format lands on that format's calendar rather than the default one.
function slugFromHash(consults: Consult[]) {
  if (typeof window === "undefined") return consults[0].slug;
  const match = window.location.hash.match(/^#book-(.+)$/);
  const found = consults.find((c) => c.slug === match?.[1]);
  return found ? found.slug : consults[0].slug;
}

export function ConsultBooking({ consults }: { consults: Consult[] }) {
  const [slug, setSlug] = useState(consults[0].slug);

  useEffect(() => {
    setSlug(slugFromHash(consults));
    const onHash = () => setSlug(slugFromHash(consults));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [consults]);

  const active = consults.find((c) => c.slug === slug) ?? consults[0];

  return (
    <div>
      <div role="tablist" aria-label="Consultation format" className="flex gap-2">
        {consults.map((consult) => {
          const selected = consult.slug === active.slug;
          return (
            <button
              key={consult.slug}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setSlug(consult.slug)}
              className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-colors border ${
                selected
                  ? "bg-emerald text-cream border-emerald"
                  : "bg-transparent text-ink/75 border-border hover:border-emerald/40 hover:text-emerald"
              }`}
            >
              {consult.label}
              {consult.priceCents > 0 && (
                <span className="ml-2 opacity-70">{formatPrice(consult.priceCents)}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 bg-cream border border-border/70 rounded-sm p-2 md:p-4">
        <CalEmbed key={active.slug} calLink={active.calLink} />
      </div>
    </div>
  );
}
