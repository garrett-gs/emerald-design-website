import { fallbackConsults, type Consult } from "@/lib/site";

const PORTAL_URL = process.env.PORTAL_URL || "https://portal.emerald-dh.com";

export function formatPrice(cents: number) {
  if (!cents) return "";
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

// Pricing and copy live in the portal. The marketing site must not go down
// because the portal did, so this caches for five minutes and falls back to
// bundled copy on any failure.
export async function getConsults(): Promise<Consult[]> {
  try {
    const res = await fetch(`${PORTAL_URL}/api/public/consultations`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`portal responded ${res.status}`);

    const data = (await res.json()) as { offerings?: Consult[] };
    if (!Array.isArray(data.offerings) || data.offerings.length === 0) {
      throw new Error("portal returned no offerings");
    }
    return data.offerings;
  } catch (err) {
    console.warn("[consults] falling back to bundled copy:", err);
    return fallbackConsults;
  }
}
