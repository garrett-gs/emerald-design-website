"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/consults";
import type { Consult } from "@/lib/site";

export function BlockTiers({ tiers }: { tiers: Consult[] }) {
  const [open, setOpen] = useState<Consult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ label: string; price: string; venmoHandle: string | null } | null>(null);

  if (done) {
    return (
      <div className="border border-emerald/30 bg-cream rounded-sm p-8 md:p-10">
        <p className="font-display italic text-2xl md:text-3xl text-emerald leading-snug">
          Got it — {done.label}.
        </p>
        <p className="mt-4 text-base text-ink/85 leading-relaxed">
          {done.venmoHandle ? (
            <>
              Send <strong>{done.price}</strong> by Venmo to{" "}
              <strong>{done.venmoHandle}</strong> with your name in the note, and
              I&apos;ll set your hours up right away.
            </>
          ) : (
            <>I&apos;ll follow up shortly with payment details and get your hours set up.</>
          )}
        </p>
        <p className="mt-4 text-base text-ink/80 leading-relaxed">
          Once they&apos;re set up you&apos;ll get a private link to book sessions
          against your hours — virtual or on-site, and they never expire.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {tiers.map((tier) => (
          <article
            key={tier.slug}
            className="flex flex-col bg-cream border border-border/70 rounded-sm p-8 md:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {tier.label}
              </h3>
              <p className="font-display text-2xl md:text-3xl text-emerald whitespace-nowrap">
                {formatPrice(tier.price, tier.currency)}
              </p>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-soft">
              {tier.blockHours} hours · {formatPrice(tier.price / (tier.blockHours || 1), tier.currency)}/hr
            </p>
            {tier.summary && (
              <p className="mt-5 font-display italic text-lg text-ink/75 leading-snug">
                {tier.summary}
              </p>
            )}
            {tier.body && (
              <p className="mt-4 text-base text-ink/80 leading-relaxed">{tier.body}</p>
            )}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  setOpen(tier);
                  setError("");
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald text-cream text-sm tracking-wide hover:bg-emerald-deep transition-colors"
              >
                Get {tier.blockHours} hours
              </button>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <form
          className="mt-10 border-t border-border/70 pt-8 space-y-5 max-w-2xl"
          onSubmit={async (e) => {
            e.preventDefault();
            if (busy) return;
            const fd = new FormData(e.currentTarget);
            setBusy(true);
            setError("");
            try {
              const res = await fetch("/api/block-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  slug: open.slug,
                  name: fd.get("name"),
                  email: fd.get("email"),
                  phone: fd.get("phone"),
                  notes: fd.get("notes"),
                  company: fd.get("company"),
                }),
              });
              const json = await res.json().catch(() => ({}));
              if (res.ok && json.ok) {
                setDone({ label: json.label, price: json.price, venmoHandle: json.venmoHandle });
                return;
              }
              setError(json.error || "Something went wrong. Please try again.");
            } catch {
              setError("Something went wrong. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <p className="font-display text-2xl text-ink">
            {open.label} — {formatPrice(open.price, open.currency)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-ink/90">
              What are you working on?
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
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
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald text-cream text-sm tracking-wide hover:bg-emerald-deep transition-colors disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send request"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="text-emerald hover:text-emerald-deep text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
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
