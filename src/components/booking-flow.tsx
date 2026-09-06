"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/consults";
import type { Consult } from "@/lib/site";

type Slots = Record<string, { start: string }[]>;
type CustomField = {
  slug: string;
  type: string;
  required: boolean;
  label: string;
};

const TZ = "America/Chicago";

const dayLabel = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  });

function slugFromHash(consults: Consult[], fallback: string) {
  if (typeof window === "undefined") return fallback;
  const m = window.location.hash.match(/^#book-(.+)$/);
  return consults.some((c) => c.slug === m?.[1]) ? (m![1] as string) : fallback;
}

export function BookingFlow({ consults }: { consults: Consult[] }) {
  const [slugState, setSlug] = useState(consults[0]?.slug ?? "");
  const consult = useMemo(
    () => consults.find((c) => c.slug === slugState) ?? consults[0],
    [consults, slugState]
  );

  const [slots, setSlots] = useState<Slots>({});
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [chosen, setChosen] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ when: string; price: string; venmoHandle: string | null } | null>(null);

  const load = useCallback(async () => {
    if (!consult?.calEventTypeId) return;
    setLoading(true);
    setLoadError("");
    setChosen(null);
    try {
      const from = new Date();
      const to = new Date();
      to.setDate(to.getDate() + 28);
      const iso = (d: Date) => d.toISOString().slice(0, 10);
      const res = await fetch(
        `/api/slots?eventTypeId=${consult.calEventTypeId}&start=${iso(from)}&end=${iso(to)}`
      );
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setSlots(data.slots ?? {});
    } catch {
      setLoadError("Couldn't load available times just now.");
    } finally {
      setLoading(false);
    }
  }, [consult?.calEventTypeId]);

  useEffect(() => {
    load();
  }, [load]);

  // A card CTA links to #book-<slug>; honour it on arrival and on later clicks.
  useEffect(() => {
    const apply = () => setSlug((cur) => slugFromHash(consults, cur));
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [consults]);

  // Misty's own intake questions, as configured on the event type in Cal.com.
  useEffect(() => {
    if (!consult?.calEventTypeId) return;
    let cancelled = false;
    fetch(`/api/booking-fields?eventTypeId=${consult.calEventTypeId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setFields(Array.isArray(d.fields) ? d.fields : []);
      })
      .catch(() => {
        if (!cancelled) setFields([]);
      });
    return () => {
      cancelled = true;
    };
  }, [consult?.calEventTypeId]);

  const days = useMemo(
    () => Object.entries(slots).filter(([, v]) => v.length > 0).slice(0, 14),
    [slots]
  );

  if (done) {
    return (
      <div className="border border-emerald/30 bg-warm/30 rounded-sm p-8 md:p-10">
        <p className="font-display italic text-2xl md:text-3xl text-emerald leading-snug">
          Your time is held.
        </p>
        <p className="mt-4 text-base text-ink/85 leading-relaxed">
          {done.when} Central. To confirm it, send{" "}
          <strong>{done.price}</strong>
          {done.venmoHandle ? (
            <>
              {" "}
              by Venmo to <strong>{done.venmoHandle}</strong>, with your name in the note.
            </>
          ) : (
            <> — payment details are on their way by email.</>
          )}
        </p>
        <p className="mt-4 text-base text-ink/80 leading-relaxed">
          I&apos;ll confirm as soon as it arrives and send a calendar invite. Your slot
          is held for 24 hours. Check your email for a copy of these details.
        </p>
      </div>
    );
  }

  return (
    <div>
      {consults.length > 1 && (
        <div role="tablist" aria-label="Session type" className="flex flex-wrap gap-2">
          {consults.map((c) => {
            const on = c.slug === consult?.slug;
            return (
              <button
                key={c.slug}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setSlug(c.slug)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-colors border ${
                  on
                    ? "bg-emerald text-cream border-emerald"
                    : "bg-transparent text-ink/75 border-border hover:border-emerald/40 hover:text-emerald"
                }`}
              >
                {c.label}
                {c.price > 0 && (
                  <span className="ml-2 opacity-70">{formatPrice(c.price, c.currency)}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <p className="text-sm text-ink/60">All times shown in Central.</p>

        {loading && <p className="mt-6 text-base text-ink/70">Loading available times…</p>}
        {loadError && (
          <p className="mt-6 text-base text-ink/80">
            {loadError}{" "}
            <button type="button" onClick={load} className="text-emerald underline underline-offset-4">
              Try again
            </button>
          </p>
        )}

        {!loading && !loadError && days.length === 0 && (
          <p className="mt-6 text-base text-ink/80">
            No open times in the next few weeks. Get in touch and we&apos;ll find one.
          </p>
        )}

        <div className="mt-6 space-y-6">
          {days.map(([day, times]) => (
            <div key={day}>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                {dayLabel(day)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {times.map((t) => {
                  const on = chosen === t.start;
                  return (
                    <button
                      key={t.start}
                      type="button"
                      onClick={() => setChosen(t.start)}
                      className={`px-4 py-2 rounded-sm border text-sm transition-colors ${
                        on
                          ? "bg-emerald text-cream border-emerald"
                          : "bg-cream text-ink/80 border-border hover:border-emerald/50 hover:text-emerald"
                      }`}
                    >
                      {timeLabel(t.start)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {chosen && consult && (
        <form
          className="mt-10 border-t border-border/70 pt-8 space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            if (submitting) return;
            const fd = new FormData(e.currentTarget);
            setSubmitting(true);
            setError("");
            try {
              const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  slug: consult.slug,
                  start: chosen,
                  name: fd.get("name"),
                  email: fd.get("email"),
                  phone: fd.get("phone"),
                  address: fd.get("address"),
                  notes: fd.get("notes"),
                  company: fd.get("company"),
                  responses: Object.fromEntries(
                    fields.map((f) => [f.slug, String(fd.get(`custom:${f.slug}`) || "")])
                  ),
                }),
              });
              const json = await res.json().catch(() => ({}));
              if (res.ok && json.ok) {
                setDone({ when: json.when, price: json.price, venmoHandle: json.venmoHandle });
                return;
              }
              setError(json.error || "Something went wrong. Please try again.");
              if (res.status === 409) load();
            } catch {
              setError("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <p className="font-display text-2xl text-ink">
            {timeLabel(chosen)} on {dayLabel(chosen.slice(0, 10))}
          </p>
          <p className="text-base text-ink/70">
            {consult.label} · {consult.duration}
            {consult.price > 0 && <> · {formatPrice(consult.price, consult.currency)}</>}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            {consult.slug.includes("onsite") && (
              <Field label="Property address" name="address" required />
            )}
          </div>

          {fields.map((f) => (
            <div key={f.slug}>
              <label htmlFor={`custom:${f.slug}`} className="block text-sm font-medium text-ink/90">
                {f.label}
                {f.required && <span className="text-emerald ml-1">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  id={`custom:${f.slug}`}
                  name={`custom:${f.slug}`}
                  required={f.required}
                  rows={3}
                  className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald resize-y"
                />
              ) : (
                <input
                  id={`custom:${f.slug}`}
                  name={`custom:${f.slug}`}
                  required={f.required}
                  className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald"
                />
              )}
            </div>
          ))}

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-ink/90">
              Anything else?
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald resize-y"
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <input name="company" tabIndex={-1} autoComplete="off" />
          </div>

          {error && (
            <p role="alert" className="text-base text-ink/85 border border-emerald/30 bg-warm/40 rounded-sm px-5 py-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald text-cream text-sm tracking-wide hover:bg-emerald-deep transition-colors disabled:opacity-60"
          >
            {submitting ? "Holding your time…" : "Hold this time"}
          </button>
          <p className="text-sm text-muted">
            Nothing is charged here. Your slot is held while payment comes through.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink/90">
        {label}
        {required && <span className="text-emerald ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald"
      />
    </div>
  );
}
