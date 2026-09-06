export const site = {
  name: "Emerald Design X Hospitality",
  tagline: "Hospitality, by design.",
  shortTagline: "Short-term rentals designed for the guest, not the owner.",
  founder: "Misty Schmidt",
  portalUrl: "https://portal.emerald-dh.com/login",
  email: "misty@emerald-dh.com",
  bookingUrl: "https://cal.com/misty-edh/virtual-consultation",
  // Payment runs through Venmo until a card processor is connected in Cal.com.
  // Bookings are held unconfirmed until payment lands.
  venmoHandle: "",
  instagram: "@emeralddesignhospitality",
  instagramUrl: "https://instagram.com/emeralddesignhospitality",
  serviceArea:
    "the greater Omaha area and the Midwest, plus select destination markets nationwide for the right project",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/consultations", label: "Consultations" },
  { href: "/contact", label: "Contact" },
];

// Fallback copy, used only when the portal is unreachable. Mirrors what is
// actually configured in the portal so a fallback render is not misleading.
export type Consult = {
  slug: string;
  label: string;
  calEventTypeId: number | null;
  blockHours: number | null;
  price: number;
  currency: string;
  duration: string;
  calLink: string;
  summary: string;
  body: string;
  walkAway: string[];
};

export const fallbackConsults: Consult[] = [
  {
    slug: "virtual-consultation",
    label: "Virtual Design Consultation",
    calEventTypeId: 6498495,
    blockHours: null,
    price: 100,
    currency: "USD",
    duration: "60 minutes",
    calLink: "misty-edh/virtual-consultation",
    summary: "",
    body: "A focused hour over video reviewing your space, with clear priorities and next steps to take away.",
    walkAway: [],
  },
];
