import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { ImagePlaceholder } from "@/components/image-placeholder";

const services = [
  {
    title: "Property Reads",
    tagline: "Honest assessment before you buy or commit.",
    body: "Not every property is meant to be a short-term rental. I'll walk a property with you, read the bones, and project what it can realistically earn — so you invest in something that can deliver.",
  },
  {
    title: "Design",
    tagline: "Color, texture, and personal touches that make a space worth telling friends about.",
    body: "Spaces designed for the guest first. Built around how people actually use a rental, photographed beautifully, and grounded in construction realities so the design works in the real world.",
  },
  {
    title: "Guest Experience",
    tagline: "Because beautiful rooms alone don't make a successful rental.",
    body: "The listing, the welcome, the small details, the way an owner shows up when something goes wrong — it all matters. I help tie the whole thing together so the property doesn't just look good. It performs.",
  },
];

const testimonials: Array<{ quote: string; attribution: string }> = [
  {
    quote: "Misty has a unique ability to create spaces that feel both visually memorable and genuinely welcoming for guests. Her design vision completely elevated my property and helped transform it into a space that feels intentional, cohesive, and unlike a typical rental.",
    attribution: "Casey V., Short-Term Rental Owner",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-6">
              Emerald Design X Hospitality
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink">
              Hospitality, <span className="italic text-emerald">by design.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-ink/80 leading-relaxed max-w-xl">
              Short-term rentals designed for the guest — not the owner. I help owners and investors turn properties into places that book solid, photograph beautifully, and earn real five-star reviews.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink/70 leading-relaxed max-w-xl">
              From the first walkthrough to the last detail, I run the whole project so the design, the build, and the guest experience all hold together. Because beautiful rooms alone don&apos;t make a successful rental. The whole thing has to.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton href="/contact">Start a conversation</CtaButton>
              <CtaButton href="/services" variant="ghost">See the work</CtaButton>
            </div>
          </div>
          <div className="md:col-span-5">
            <ImagePlaceholder
              label="Hero image — designed property exterior or signature interior detail"
              aspect="hero"
            />
          </div>
        </div>
      </section>

      <section className="bg-warm/50 border-y border-border/60">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">The Belief</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-ink">
            What I believe about vacation rental design
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85">
            <p className="font-display italic text-2xl md:text-3xl text-emerald leading-snug">
              A property should be designed for the guest, not the owner.
            </p>
            <p>
              That&apos;s where most rentals go sideways. Owners design what they would want — and end up with a space that&apos;s beautiful in photos and forgettable in person. Guests don&apos;t remember beige. They remember the corner that made them stop and take a picture. The kitchen that made them want to cook. The bed that made them sleep in.
            </p>
            <p>
              I learned what hospitality actually means growing up at my grandparents&apos; dude ranch. It&apos;s not a service layer you add at the end. It&apos;s the whole reason guests come back.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-emerald hover:text-emerald-deep transition-colors group"
            >
              Read the full story
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">How I work</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-ink">
            A whole-property approach
          </h2>
          <p className="mt-6 text-lg text-ink/80 leading-relaxed">
            From &ldquo;should I buy this?&rdquo; to &ldquo;how do I get a five-star review?&rdquo;
          </p>
        </div>
        <div className="mt-12 md:mt-16 grid gap-10 md:gap-12 md:grid-cols-3">
          {services.map((service, i) => (
            <article key={service.title} className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {service.title}
              </h3>
              <p className="font-display italic text-ink/70 text-base md:text-lg leading-snug">
                {service.tagline}
              </p>
              <p className="text-base text-ink/80 leading-relaxed">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-emerald hover:text-emerald-deep transition-colors group"
          >
            See full services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <section className="bg-emerald-deep text-cream">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">What clients are saying</p>
          {testimonials.length > 0 ? (
            <div className="mt-10 space-y-12">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="border-l-2 border-cream/30 pl-6">
                  <p className="font-display italic text-2xl md:text-3xl leading-snug">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm text-cream/70">— {t.attribution}</footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <p className="mt-8 font-display italic text-2xl md:text-3xl leading-snug text-cream/80 max-w-2xl">
              Real testimonials from past clients are coming soon. In the meantime, I&apos;d love to hear about your property and what you want it to do.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28 text-center">
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink">
          Have a property in mind?
        </h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-2xl mx-auto">
          Whether it&apos;s a space you already own or one you&apos;re thinking about buying, I&apos;d love to hear about it. Tell me what you&apos;re working with and what you want to get out of it — and we&apos;ll go from there.
        </p>
        <div className="mt-10">
          <CtaButton href="/contact">Start a conversation</CtaButton>
        </div>
      </section>
    </>
  );
}
