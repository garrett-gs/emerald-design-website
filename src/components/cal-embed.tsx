"use client";

import { useEffect, useId, useState } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

// Cal.com's documented embed loader, transcribed rather than reimplemented —
// the queue protocol it sets up is what embed.js drains on load, and getting it
// subtly wrong renders an empty container with no error.
function installCalLoader(embedJsUrl: string, initKey: string) {
  const C = window;
  const d = C.document;
  const p = (a: { q?: unknown[] }, ar: IArguments | unknown[]) => {
    (a.q = a.q || []).push(ar);
  };

  C.Cal =
    C.Cal ||
    function (this: unknown, ...args: unknown[]) {
      const cal = C.Cal as CalApi;
      const ar = args;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).setAttribute("src", embedJsUrl);
        cal.loaded = true;
      }
      if (ar[0] === initKey) {
        const api = function (...inner: unknown[]) {
          p(api as unknown as { q?: unknown[] }, inner);
        } as CalApi;
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns![namespace] = (cal.ns![namespace] || api) as CalApi;
          p(cal.ns![namespace] as { q?: unknown[] }, ar);
          p(cal as { q?: unknown[] }, ["initNamespace", namespace]);
        } else {
          p(cal as { q?: unknown[] }, ar);
        }
        return;
      }
      p(cal as { q?: unknown[] }, ar);
    };
}

export function CalEmbed({
  calLink,
  className = "",
}: {
  calLink: string;
  className?: string;
}) {
  const reactId = useId();
  const elementId = `cal-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    installCalLoader("https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    if (!Cal) {
      setFailed(true);
      return;
    }

    Cal("init", { origin: "https://cal.com" });
    Cal("inline", {
      elementOrSelector: `#${elementId}`,
      calLink,
      layout: "month_view",
    });
    Cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      styles: { branding: { brandColor: "#0f4c3a" } },
    });

    // If nothing has painted, the script was blocked or the event type is
    // missing — show a working link rather than an empty box.
    const timer = window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el && el.clientHeight < 120) setFailed(true);
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [calLink, elementId]);

  if (failed) {
    return (
      <div className={`border border-border rounded-sm p-10 text-center ${className}`}>
        <p className="text-base text-ink/80 leading-relaxed">
          The scheduler didn&apos;t load here.{" "}
          <a
            href={`https://cal.com/${calLink}`}
            target="_blank"
            rel="noreferrer"
            className="text-emerald hover:text-emerald-deep underline underline-offset-4"
          >
            Book on Cal.com instead
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      id={elementId}
      className={`min-h-[620px] w-full overflow-x-auto ${className}`}
      style={{ colorScheme: "light" }}
    />
  );
}
