"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const situations = [
  "I own a property and want to design or redesign it",
  "I'm thinking about buying a property for short-term rental",
  "I have multiple properties / I'm an investor",
  "I'm not sure yet — I want to talk through it",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const location = String(data.get("location") || "");
    const situation = String(data.get("situation") || "");
    const details = String(data.get("details") || "");
    const referral = String(data.get("referral") || "");

    const subject = `Website inquiry from ${name || "a visitor"}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      `Where based: ${location}`,
      `Property situation: ${situation}`,
      "",
      "About the property:",
      details,
      "",
      referral && `How they heard: ${referral}`,
    ].filter(Boolean);

    const body = lines.join("\n");
    const url = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-emerald/30 bg-warm/30 rounded-sm p-8 md:p-10">
        <p className="font-display italic text-2xl md:text-3xl text-emerald leading-snug">
          Thanks — your note&apos;s in.
        </p>
        <p className="mt-4 text-base text-ink/80 leading-relaxed">
          I&apos;ll be in touch within two business days. In the meantime, feel free to look around or{" "}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-emerald hover:text-emerald-deep underline-offset-4 hover:underline"
          >
            follow along on Instagram
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-muted">
          (If your email client didn&apos;t open automatically, you can also email{" "}
          <a className="text-emerald" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          directly.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" optional />
      <Field
        label="Where are you based?"
        name="location"
        required
        hint="City, state."
      />
      <div>
        <Label htmlFor="situation" required>
          What&apos;s the property situation?
        </Label>
        <select
          id="situation"
          name="situation"
          required
          defaultValue=""
          className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald"
        >
          <option value="" disabled>
            Choose one
          </option>
          {situations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="details" required>
          Tell me about the property and what you want to get out of it
        </Label>
        <textarea
          id="details"
          name="details"
          required
          rows={6}
          className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald resize-y"
        />
      </div>
      <Field label="How did you hear about me?" name="referral" optional />
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald text-cream text-sm tracking-wide hover:bg-emerald-deep transition-colors"
        >
          Send it over
        </button>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-ink/90"
    >
      {children}
      {required ? <span className="text-emerald ml-1">*</span> : null}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
        {optional ? <span className="text-muted ml-1 font-normal">(optional)</span> : null}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-sm border border-border bg-cream px-4 py-3 text-base text-ink focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald"
      />
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
