import { CtaButton } from "@/components/cta-button";
import { SiteImage } from "@/components/site-image";

export const metadata = {
  title: "About Misty",
  description:
    "The story behind Emerald Design x Hospitality. Misty Schmidt on hospitality, self-taught design, and creating spaces people want to be in.",
};

const story = [
  "I started Emerald Design x Hospitality because hospitality isn't a service layer. It's the whole point.",
  "I grew up watching my grandparents run a campground and dude ranch. Campers, tents, or cabins and a steady stream of guests who often arrived as strangers and left as friends. I watched how my grandpa made people feel welcome. How the smallest details mattered to the guests, which mattered to my grandma. I didn't realize it then, but they were teaching me what hospitality really meant. That idea has stayed with me ever since.",
  "My background is a little unconventional for a designer. I'm fully self-taught, no special initials on my business card. I spent years working alongside contractors and remodelers, learning how properties actually come together. Then I spent 3 years in the short-term rental industry as an operations manager, learning what makes a property work from the inside out. I saw what guests noticed. What they complained about. What made them come back.",
  "That combination changed the way I approach design. I don't just see a room. I see the people using it, the way it needs to function, the story it should tell, and the details that will make someone feel something.",
  "Today, I bring that perspective to vacation rentals, hospitality spaces, and homes. Sometimes that means designing an entire property from the ground up. Sometimes it means rethinking one room, finding the right paint color, rearranging what you already own, or figuring out why a space just isn't working.",
];

// Closing emphasis, set apart from the body of the story.
const closing = {
  lead: "Whatever the project, my goal is the same:",
  statement:
    "Create spaces that feel intentional, personal, and really good to be in. Because good design isn't just about what you see. It's about what you feel.",
};

export default function AboutPage() {
  return (
    <>
      {/* The heading and opening line share the row with the portrait, so the
          column beside it is not left empty. */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pt-12 md:pt-20 pb-14 md:pb-20">
        <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-center">
          <div className="md:col-span-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-6">
              About
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink">
              About <span className="italic text-emerald">Misty</span>
            </h1>
            <p className="mt-6 font-display italic text-xl md:text-2xl text-ink/70 leading-snug">
              The story behind Emerald Design X Hospitality.
            </p>
            <p className="mt-8 font-display italic text-2xl md:text-3xl text-emerald leading-snug">
              {story[0]}
            </p>
          </div>
          <div className="md:col-span-6">
            <SiteImage
              src="/misty.jpeg"
              alt="Misty Schmidt, founder of Emerald Design X Hospitality"
              aspect="square"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 md:px-10 pb-16 md:pb-24">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          {story.slice(1).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="pt-4 space-y-4">
            <p className="text-lg leading-relaxed text-ink/85">{closing.lead}</p>
            <p className="font-display italic text-2xl md:text-3xl text-emerald leading-snug">
              {closing.statement}
            </p>
          </div>

          <p className="pt-4 font-display text-xl text-ink/80">
            — Misty Schmidt
            <span className="block text-sm text-muted not-italic mt-1 font-sans">
              Founder, Emerald Design X Hospitality
            </span>
          </p>
        </div>
      </section>

      <section className="bg-emerald-deep text-cream">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28 text-center">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">
            Ready to talk?
          </h2>
          <div className="mt-10">
            <CtaButton href="/contact" variant="ghost" className="!text-cream !border-cream/40 hover:!bg-cream hover:!text-emerald-deep">
              Start a conversation
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
