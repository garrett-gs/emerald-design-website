import { CtaButton } from "@/components/cta-button";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata = {
  title: "Services",
  description:
    "A whole-property approach to short-term rentals — from acquisition to five-star reviews. Property reads, interior design, and guest experience.",
};

const services = [
  {
    number: "01",
    title: "Property Reads & Assessment",
    tagline: "Honest answers before you commit.",
    body: [
      "Not every property should be a short-term rental. Not every market will support what an owner is hoping to earn. And not every renovation is worth the money it costs.",
      "Before any design work begins, I assess the property as a whole — its bones, its location, its layout, its honest potential. My background in construction and interior finishes means I see what's behind the walls, not just on the surface. I'll tell you what's possible, what's not worth the money, and what it'll really take to get the property where you want it to go.",
      "For investors evaluating a purchase, this can happen before you close. For owners with a property already in hand, it's the foundation for every decision that follows.",
    ],
    walkAway: [
      "An honest read on the property's STR potential",
      "Realistic projections on what it can earn",
      "A clear picture of what design and construction work is actually needed",
      "A go / no-go recommendation, with reasons",
    ],
    imageLabel: "Property walkthrough — exterior or signature room",
  },
  {
    number: "02",
    title: "Interior Design",
    tagline: "Color, texture, and personality that make a space worth telling friends about.",
    body: [
      "Once the property is right, the design work begins.",
      "I design vacation rentals for the guest first — because guests are who pay the bills. That means spaces with real personality, considered details, and a sense of place. Color and texture that make a property memorable. Layouts that work for how people actually use a rental. Finishes chosen for both beauty and the construction reality of the build.",
      "I'm not the one swinging the hammer or pulling permits — but I understand the process well enough to make sure every design choice works in the real world, on the real timeline, with the real materials. The contractor and the designer aren't pulling in different directions on my projects, because I already know how those worlds fit together.",
    ],
    walkAway: [
      "A design that fits the property, the market, and the guest",
      "Material and finish selections that work with your build timeline and budget",
      "A space that photographs beautifully and lives even better",
      "A project that runs smoothly, without you stuck in the middle",
    ],
    imageLabel: "Designed interior — rich color, layered texture, considered detail",
  },
  {
    number: "03",
    title: "Guest Experience Design",
    tagline: "Because beautiful rooms alone don't make a successful rental.",
    body: [
      "The design is one piece of a successful short-term rental. The guest experience is the whole thing.",
      "Listings that show up in the right searches and convert. The welcome moment that sets the tone for the stay. The small details that turn a five-star review from possible to inevitable. The systems that quietly run in the background so the owner can show up when something goes wrong.",
      "I help tie all of that together — so what guests get isn't just a beautifully designed space, but a stay they want to tell their friends about.",
    ],
    walkAway: [
      "A listing that reflects the property and the guest experience honestly",
      "A guest journey designed end to end, from booking to checkout",
      "Recommendations on the small details that drive five-star reviews",
      "A property that doesn't just look good — it performs",
    ],
    imageLabel: "Welcome detail — a small, signature touch from a finished project",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-6">
          Services
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink max-w-4xl">
          A whole-property approach to <span className="italic text-emerald">short-term rentals</span>.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink/80 leading-relaxed max-w-3xl">
          From acquisition to five-star reviews.
        </p>
      </section>

      <section className="bg-warm/50 border-y border-border/60">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
          <p className="text-lg leading-relaxed text-ink/85">
            Most STR designers stop at the design. Most STR consultants stop at the strategy. I do the whole thing — because beautiful rooms with mediocre hospitality still fail, and the most expensive design mistake is buying the wrong property in the first place.
          </p>
          <p className="mt-4 font-display italic text-xl text-emerald">
            Here&apos;s how I work with clients:
          </p>
        </div>
      </section>

      {services.map((service, i) => (
        <section
          key={service.number}
          className={i % 2 === 0 ? "bg-cream" : "bg-warm/30"}
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
            <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-start">
              <div className={`md:col-span-7 ${i % 2 === 0 ? "" : "md:order-2"}`}>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft">
                  {service.number}
                </p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-ink">
                  {service.title}
                </h2>
                <p className="mt-6 font-display italic text-xl md:text-2xl text-emerald leading-snug">
                  {service.tagline}
                </p>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
                  {service.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-4">
                    What you walk away with
                  </p>
                  <ul className="space-y-3">
                    {service.walkAway.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-ink/85"
                      >
                        <span className="text-emerald shrink-0 mt-1">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 0 ? "" : "md:order-1"}`}>
                <div className="md:sticky md:top-28">
                  <ImagePlaceholder label={service.imageLabel} aspect="tall" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28 text-center">
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink">
          Not sure where to start?
        </h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-2xl mx-auto">
          Most clients work with me across all three areas, but every project is shaped around what the property and the owner actually need. The best way to find out is a conversation.
        </p>
        <div className="mt-10">
          <CtaButton href="/contact">Start a conversation</CtaButton>
        </div>
      </section>
    </>
  );
}
