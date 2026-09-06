"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "edh-consult-banner-dismissed";

export function AnnouncementBanner({ message }: { message: string }) {
  // Rendered only after mount so a dismissal isn't briefly undone by hydration.
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(window.localStorage.getItem(KEY) !== "1");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* private browsing — dismissal just won't persist */
    }
  };

  return (
    <div className="bg-emerald-deep text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-3 md:py-3.5 flex items-center justify-center gap-3 md:gap-5 text-center">
        <span className="hidden sm:inline-flex items-center shrink-0 rounded-full bg-cream/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
          New
        </span>

        <p className="font-medium text-sm md:text-base leading-snug">
          {message}
        </p>

        <Link
          href="/consultations"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-emerald-deep hover:bg-white transition-colors whitespace-nowrap"
        >
          Book now
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-cream/60 hover:text-cream text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
