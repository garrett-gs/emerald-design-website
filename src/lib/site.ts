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

// PLACEHOLDER VALUES — price, duration, deliverables and the on-site travel
// radius are all guesses. Replace before this page goes live.
export const consults = [
  {
    slug: "virtual",
    calLink: "misty-edh/virtual-consultation",
    label: "Virtual",
    price: "$TBD",
    duration: "60 minutes",
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
    // TODO: this event type still needs to be created in Cal.com.
    calLink: "misty-edh/onsite-consultation",
    label: "On-site",
    price: "$TBD",
    duration: "90 minutes",
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
