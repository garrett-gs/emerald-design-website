import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { SiteHeader } from "@/components/site-header";
import { getConsults, formatPrice } from "@/lib/consults";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Short-term rentals designed for the guest, not the owner. Property reads, interior design, and guest experience by Misty Schmidt.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sessions = (await getConsults()).filter((c) => !c.blockHours);
  const from = sessions.length
    ? formatPrice(Math.min(...sessions.map((c) => c.price)), sessions[0].currency)
    : "";
  const bannerMessage = from
    ? `New: virtual and on-site design consultations, ${from}.`
    : "New: virtual and on-site design consultations.";
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/wiz3tin.css" />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <AnnouncementBanner message={bannerMessage} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
