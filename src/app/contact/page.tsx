import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Tell me about your property — whether you own it, are thinking about buying it, or are still figuring out if short-term rental is the right move.",
};

const faqs = [
  {
    q: "Where do you work?",
    a: `I primarily serve clients in ${site.serviceArea}. If you're outside that area, reach out anyway — remote consultation may be a fit.`,
  },
  {
    q: "What size projects do you take on?",
    a: "Anything from a single cabin to a small portfolio. The right fit isn't about size — it's about whether you understand that hospitality is the product.",
  },
  {
    q: "How long does a project take?",
    a: "Every project is different. Property reads are typically a 1–2 week engagement. Full design projects vary based on the property and the scope, but most run 2–6 months from kickoff to launch-ready. We'll talk through realistic timelines on our first call.",
  },
  {
    q: "Do you handle the construction?",
    a: "No. I'm a designer with deep construction fluency — that means I make design decisions that work with your build, and I can speak the same language as your contractor so the project runs smoothly. But I'm not your GC. If you don't have one, I can often point you toward trusted ones.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-12 md:pt-20 pb-10 md:pb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-6">
          Contact
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink max-w-4xl">
          Let&apos;s talk about <span className="italic text-emerald">your property</span>.
        </h1>
        <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-ink/80">
          <p>
            Whether it&apos;s a property you already own, one you&apos;re thinking about buying, or you&apos;re just trying to figure out if short-term rental is the right move — I&apos;d love to hear about it.
          </p>
          <p>
            The more you can share, the more useful our first conversation will be. I&apos;ll get back to you within two business days.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <ContactForm />
          </div>
          <aside className="md:col-span-5 md:sticky md:top-28 space-y-10">
            <div className="border-l-2 border-emerald/40 pl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                Prefer email?
              </p>
              <p className="mt-3 text-base text-ink/85 leading-relaxed">
                You can also reach me directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-emerald hover:text-emerald-deep"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
            <div className="border-l-2 border-emerald/40 pl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                Want to see more of the work?
              </p>
              <p className="mt-3 text-base text-ink/85 leading-relaxed">
                Follow along on Instagram:{" "}
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald hover:text-emerald-deep"
                >
                  {site.instagram}
                </a>
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                Common questions
              </p>
              <dl className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <dt className="font-display text-lg text-ink leading-snug">
                      {faq.q}
                    </dt>
                    <dd className="mt-2 text-sm text-ink/75 leading-relaxed">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
