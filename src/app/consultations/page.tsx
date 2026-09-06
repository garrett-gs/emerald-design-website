import Link from "next/link";
import { ConsultBooking } from "@/components/consult-booking";
import { CtaButton } from "@/components/cta-button";
import { consults, site } from "@/lib/site";

export const metadata = {
  title: "Consultations",
  description:
    "Virtual and on-site design consultations for short-term rental owners. One room, one problem, one hour — a lower-cost way to work with Misty Schmidt.",
};

const steps = [
  {
    title: "Book a time",
    body: "Pick virtual or on-site, choose a slot, and pay when you book. That's the whole commitment — no proposal, no scoping call first.",
  },
  {
    title: "Send what you have",
    body: "Photos, measurements, your listing, a floor plan sketch on a napkin. Whatever exists. If nothing exists, that's fine too.",
  },
  {
    title: "We work the problem",
    body: "The whole session is spent on your space, not on introductions. You'll get a written recap afterward so nothing lives only in your memory.",
  },
];

export default function ConsultationsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
          Consultations
        </p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink max-w-4xl">
          Start with <span className="italic text-emerald">one room.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink/80 leading-relaxed max-w-2xl">
          Not every project needs a full design engagement. Sometimes you have one
          room that isn&apos;t working, one decision you keep going back and forth on,
          or one property you want a second opinion about before you commit.
        </p>
        <p className="mt-4 text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
          A consultation is the smallest way to work with me — a focused session on
          the thing that&apos;s actually in your way.
        </p>
      </section>

      <section className="bg-warm/50 border-y border-border/60">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
          <div className="grid gap-10 md:gap-12 md:grid-cols-2">
            {consults.map((consult) => (
              <article
                key={consult.slug}
                className="flex flex-col bg-cream border border-border/70 rounded-sm p-8 md:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
                    {consult.label}
                  </h2>
                  <p className="font-display text-2xl md:text-3xl text-emerald whitespace-nowrap">
                    {consult.price}
                  </p>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-soft">
                  {consult.duration}
                </p>
                <p className="mt-5 font-display italic text-lg md:text-xl text-ink/75 leading-snug">
                  {consult.summary}
                </p>
                <p className="mt-4 text-base text-ink/80 leading-relaxed">
                  {consult.body}
                </p>
                <ul className="mt-6 space-y-2 text-base text-ink/80">
                  {consult.walkAway.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-emerald">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <CtaButton href={`#book-${consult.slug}`}>Book {consult.label.toLowerCase()}</CtaButton>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted max-w-2xl">
            On-site consultations cover {site.serviceArea}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
            How it works
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-ink">
            Book it, and we go
          </h2>
        </div>
        <div className="mt-12 md:mt-16 grid gap-10 md:gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <article key={step.title} className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {step.title}
              </h3>
              <p className="text-base text-ink/80 leading-relaxed">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="book" className="bg-warm/40 border-y border-border/60 scroll-mt-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
            Pick a time
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-ink">
            Book a consultation
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink/75 leading-relaxed max-w-2xl">
            Choose the session that fits, and pay when you book.
          </p>
          <div className="mt-10">
            <ConsultBooking />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28 text-center">
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink">
          Bigger project in mind?
        </h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-2xl mx-auto">
          If it&apos;s a whole property rather than a single room — or you want the
          design, the build, and the guest experience handled end to end — that&apos;s
          a different conversation, and a better one to have directly.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <CtaButton href="/contact">Start a conversation</CtaButton>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-emerald hover:text-emerald-deep transition-colors group"
          >
            See full services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
