"use client";

import { useCallback, useEffect, useState } from "react";
import { BookingFlow } from "@/components/booking-flow";
import type { Consult } from "@/lib/site";

// Opened by the #book-<slug> links on the cards, so the trigger buttons stay
// plain server-rendered anchors and still work without JS as a scroll target.
export function BookingModal({ consults }: { consults: Consult[] }) {
  const [slug, setSlug] = useState<string | null>(null);

  const close = useCallback(() => {
    setSlug(null);
    if (window.location.hash.startsWith("#book")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#book-(.+)$/);
      const found = consults.find((c) => c.slug === m?.[1]);
      if (found) setSlug(found.slug);
      else if (window.location.hash === "#book") setSlug(consults[0]?.slug ?? null);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [consults]);

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [slug, close]);

  if (!slug) return null;

  const ordered = [
    ...consults.filter((c) => c.slug === slug),
    ...consults.filter((c) => c.slug !== slug),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Book a consultation"
    >
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-3xl my-8 mx-4 bg-cream border border-border rounded-sm shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 md:px-10 py-5 border-b border-border/70 bg-cream">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">Pick a time</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-ink leading-tight">
              Book a consultation
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center text-ink/60 hover:text-emerald hover:bg-warm/60 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 md:px-10 py-8">
          <p className="text-base text-ink/75 leading-relaxed mb-6">
            Nothing is charged here — your slot is held while payment comes
            through, and confirmed as soon as it lands.
          </p>
          <BookingFlow consults={ordered} />
        </div>
      </div>
    </div>
  );
}
