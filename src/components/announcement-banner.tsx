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
    <div className="bg-emerald text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-2.5 flex items-center justify-center gap-4 text-center">
        <p className="text-sm leading-snug">
          {message}{" "}
          <Link
            href="/consultations"
            className="underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
          >
            Book a consultation →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-cream/70 hover:text-cream text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
