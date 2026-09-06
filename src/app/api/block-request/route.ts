import { NextResponse } from "next/server";
import { getConsults, formatPrice } from "@/lib/consults";
import { site } from "@/lib/site";
import { formatPhone } from "@/lib/format";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "Emerald Website <onboarding@resend.dev>";
const notifyAddress = process.env.CONTACT_TO || site.email;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

async function send(to: string, subject: string, html: string, text: string, replyTo?: string) {
  if (!apiKey) {
    console.warn("[block-request] RESEND_API_KEY not set — skipping", to);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: fromAddress, to, subject, html, text, reply_to: replyTo }),
  });
  if (!res.ok) console.error("[block-request] email failed", res.status, await res.text());
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const slug = str("slug");
  const name = str("name");
  const email = str("email");
  const phone = formatPhone(str("phone"));
  const notes = str("notes").slice(0, 4000);

  if (!slug || !name) {
    return NextResponse.json({ ok: false, error: "Missing required details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 400 });
  }

  const consults = await getConsults();
  const tier = consults.find((c) => c.slug === slug && c.blockHours);
  if (!tier) {
    return NextResponse.json({ ok: false, error: "That package isn't available." }, { status: 400 });
  }

  const price = formatPrice(tier.price, tier.currency);
  const payTo = site.venmoHandle;
  const payLine = payTo
    ? `Send ${price} by Venmo to ${payTo} with your name in the note, and I'll set your hours up right away.`
    : `I'll follow up shortly with payment details and get your hours set up.`;

  await send(
    email,
    `Your ${tier.label} — next steps`,
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1b6b53;margin:0 0 8px;">Requested</p>
      <h1 style="font-size:22px;margin:0 0 20px;">${escapeHtml(tier.label)} — ${escapeHtml(price)}</h1>
      <p style="font-size:15px;line-height:1.6;">Hi ${escapeHtml(name)} — thanks for this. ${escapeHtml(payLine)}</p>
      <p style="font-size:15px;line-height:1.6;">Once it's set up you'll get a private booking link to schedule sessions against your hours. They never expire, and you can use them virtually or on-site.</p>
    </div>`,
    `Hi ${name},\n\n${tier.label} — ${price}.\n\n${payLine}\n\nOnce set up you'll get a private booking link to schedule against your hours. They never expire and work virtually or on-site.`,
    notifyAddress
  );

  await send(
    notifyAddress,
    `Block request — ${name}, ${tier.label}`,
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1b6b53;margin:0 0 8px;">Block request</p>
      <h1 style="font-size:22px;margin:0 0 20px;">${escapeHtml(name)} — ${escapeHtml(tier.label)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Package</td><td>${tier.blockHours} hours — ${escapeHtml(price)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Email</td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
        ${notes ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;vertical-align:top;">Notes</td><td>${escapeHtml(notes).replace(/\n/g, "<br>")}</td></tr>` : ""}
      </table>
      <p style="font-size:13px;line-height:1.6;color:#6b6b66;margin-top:24px;">When payment lands, add the block in the portal under Consultations, then send them the prepaid-session link.</p>
    </div>`,
    `${name} requested ${tier.label} (${tier.blockHours}hr, ${price}). Email: ${email}. Add the block in the portal once paid.`,
    email
  );

  return NextResponse.json({ ok: true, price, venmoHandle: payTo || null, label: tier.label });
}
