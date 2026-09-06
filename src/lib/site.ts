export const site = {
  name: "Emerald Design X Hospitality",
  tagline: "Hospitality, by design.",
  shortTagline: "Short-term rentals designed for the guest, not the owner.",
  founder: "Misty Schmidt",
  portalUrl: "https://portal.emerald-dh.com/login",
  email: "misty@emerald-dh.com",
  bookingUrl: "https://cal.com/misty-edh/virtual-consultation",
  instagram: "@emeralddesignhospitality",
  instagramUrl: "https://instagram.com/emeralddesignhospitality",
  serviceArea:
    "the greater Kansas City area and the Midwest, plus select destination markets nationwide for the right project",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/consultations", label: "Consultations" },
  { href: "/contact", label: "Contact" },
];

// Fallback copy, used only when the portal is unreachable. Live values are
// edited in the portal and served from its public consultations endpoint.
export type Consult = {
  slug: string;
  label: string;
  priceCents: number;
  duration: string;
  calLink: string;
  summary: string;
  body: string;
  walkAway: string[];
};

export const fallbackConsults: Consult[] = [
  {
    slug: "virtual",
    label: "Virtual",
    priceCents: 0,
    duration: "60 minutes",
    calLink: "misty-edh/virtual-consultation",
    summary:
      "A working video call about one room or one problem, wherever your property is.",
    body: "Bring photos, measurements, and the thing that isn't working. We spend the hour on that — layout, color, what to keep, what to replace, what to spend on and what not to bother with.",
    walkAway: [
      "A clear direction for the space",
      "Specific product and finish guidance",
      "A written recap you can act on",
    ],
  },
  {
    slug: "onsite",
    label: "On-site",
    priceCents: 0,
    duration: "90 minutes",
    calLink: "misty-edh/onsite-consultation",
    summary:
      "Misty walks the space with you, in person, in the greater Kansas City area.",
    body: "Some things you can't read from photos — how light moves through a room, how people actually walk through it, what the bones are hiding. We walk it together and talk through it in the space itself.",
    walkAway: [
      "Everything in the virtual consult, on site",
      "A read on the property's bones and layout",
      "A written recap you can act on",
    ],
  },
];
