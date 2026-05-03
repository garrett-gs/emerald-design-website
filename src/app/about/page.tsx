import { CtaButton } from "@/components/cta-button";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata = {
  title: "About Misty",
  description:
    "The story behind Emerald Design X Hospitality. Misty Schmidt on construction, hospitality, and designing rentals for the guest first.",
};

const story = [
  "I started Emerald Design X Hospitality because I believe every short-term rental deserves to be designed for the person sleeping in it — not the person who owns it.",
  "That sounds simple. In practice, it's the thing the industry gets wrong most often.",
  "I learned what hospitality actually means before I knew it was a career. My grandparents owned a working dude ranch — cabins, a campground, guests rolling in with their campers — and I grew up watching how they took care of people. The way a place could feel warm before anyone said a word. The way small touches made strangers feel like they belonged. The way guests left as friends and came back the next year because of how they were made to feel. That's where I picked up the belief I still carry: hospitality isn't a service layer. It's the whole point. And it's the thing most short-term rentals are missing.",
  "That foundation shaped everything that came after. I spent years working alongside general contractors and remodelers, learning interior finishes inside and out, and getting to know how a property actually comes together. Then I spent over five years in the short-term rental world, first as an operations manager for a local STR company, where I learned the business from the inside out. I saw which properties booked solid and which ones sat empty. I saw what guests photographed and what they complained about. And along the way, I started designing spaces myself — funky, classic, eclectic, calm — whatever the property and the guest called for.",
  "What that combination gives me is rare: I speak both languages. I know what contractors are dealing with, and I know what designers need. I'm not the one swinging the hammer or pulling permits — but I understand the process well enough to make sure every decision I make as a designer works in the real world, on the real timeline, with the real materials. That's the gap most STR projects fall into. A designer chooses something a contractor can't actually install on time. A contractor makes a call that kills the design vision. The owner ends up in the middle, paying for the confusion. With me, that doesn't happen — because I see the whole project, and I'm thinking three steps ahead the whole time.",
  "That perspective shapes everything I do. Before a single design decision gets made, I want to understand the property as a whole — its bones, its story, its honest potential. I help clients figure out whether a property is worth pursuing for short-term rental, what it could realistically earn, and what it would take to get there. Sometimes that means saying “this one's a yes, and here's why.” Sometimes it means saying “this isn't the right property — but here's what to look for next.” Either way, the goal is the same: make sure my clients are investing in something that can actually deliver.",
  "Then comes the design. Color, texture, personal touches that turn a property into a place. Spaces designed for the guest first, because guests are who pay the bills. And a turnkey experience that supports the owner from the first walkthrough to the first five-star review — the kind of experience my grandparents would recognize.",
  "The moment I knew I had to do this on my own was simple: I watched a client see their finished space for the first time. The excitement. The pride. The way they couldn't wait to start sharing it. And then, months later, when they came back to tell me what was happening — bookings, reviews, guests writing notes about how at home they felt — I realized this was the work I was meant to do.",
  "Emerald Design X Hospitality exists so I can do that work the way it should be done. Every client treated like my only client. Every property read honestly. Every space designed with real intention. And every project run smoothly from end to end, because the owner shouldn't have to translate between their contractor and their designer — that's my job.",
  "I work with owners and investors who understand that hospitality is the product, and that smart property decisions and great design are what make great hospitality possible.",
  "If that's you, I'd love to hear about your space — or the one you're thinking about buying.",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-20">
        <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-soft mb-6">
              About
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink">
              About <span className="italic text-emerald">Misty</span>
            </h1>
            <p className="mt-8 font-display italic text-xl md:text-2xl text-ink/70 leading-snug max-w-xl">
              The story behind Emerald Design X Hospitality.
            </p>
          </div>
          <div className="md:col-span-5">
            <ImagePlaceholder
              label="Portrait of Misty Schmidt — at a property, in studio, or on site"
              aspect="hero"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 md:px-10 pb-16 md:pb-24">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          {story.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display italic text-2xl md:text-3xl text-emerald leading-snug"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
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
