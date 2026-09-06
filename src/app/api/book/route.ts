import { NextResponse } from "next/server";
import { createBooking } from "@/lib/cal";
import { getConsults, formatPrice } from "@/lib/consults";
import { site } from "@/lib/site";
import { formatPhone } from "@/lib/format";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "Emerald Website <onboarding@resend.dev>";
const notifyAddress = process.env.CONTACT_TO || site.email;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function send(to: string, subject: string, html: string, text: string, replyTo?: string) {
  if (!apiKey) {
    console.warn("[book] RESEND_API_KEY not set — skipping email to", to);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: fromAddress, to, subject, html, text, reply_to: replyTo }),
  });
  if (!res.ok) console.error("[book] email failed", res.status, await res.text());
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const slug = str("slug");
  const start = str("start");
  const name = str("name");
  const email = str("email");
  const phone = formatPhone(str("phone"));
  const address = str("address");
  const notes = str("notes").slice(0, 4000);
  const responses: Record<string, string> = {};
  if (body.responses && typeof body.responses === "object") {
    for (const [k, v] of Object.entries(body.responses as Record<string, unknown>)) {
      if (typeof v === "string" && v.trim()) responses[k] = v.trim().slice(0, 2000);
    }
  }

  if (!slug || !start || !name) {
    return NextResponse.json({ ok: false, error: "Missing required details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 400 });
  }

  const consults = await getConsults();
  const consult = consults.find((c) => c.slug === slug);
  if (!consult || !consult.calEventTypeId) {
    return NextResponse.json({ ok: false, error: "That session isn't available." }, { status: 400 });
  }
  if (consult.slug.includes("onsite") && !address) {
    return NextResponse.json(
      { ok: false, error: "A property address is required for on-site sessions." },
      { status: 400 }
    );
  }

  let booking;
  try {
    booking = await createBooking({
      eventTypeId: consult.calEventTypeId,
      start,
      name,
      email,
      phone,
      address,
      notes,
      responses,
    });
  } catch (err) {
    console.error("[book]", err);
    return NextResponse.json(
      { ok: false, error: "That time was just taken, or booking is temporarily unavailable. Please pick another slot." },
      { status: 409 }
    );
  }

  const when = new Date(start).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });
  const price = formatPrice(consult.price, consult.currency);
  const payTo = site.venmoHandle;

  const payLine = payTo
    ? `Send ${price} by Venmo to ${payTo}, and include your name in the note.`
    : `Payment details will follow in a separate message.`;

  await send(
    email,
    `Your ${consult.label} — hold confirmed for ${when} CT`,
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1b6b53;margin:0 0 8px;">Time held</p>
      <h1 style="font-size:22px;margin:0 0 20px;">${escapeHtml(consult.label)}</h1>
      <p style="font-size:15px;line-height:1.6;">Hi ${escapeHtml(name)} — your session is held for <strong>${escapeHtml(when)} Central</strong>.</p>
      <p style="font-size:15px;line-height:1.6;">${escapeHtml(payLine)} Once payment arrives I'll confirm the booking and you'll get a calendar invite.</p>
      <p style="font-size:13px;line-height:1.6;color:#6b6b66;margin-top:24px;">Times are held for 24 hours. Just reply to this email if anything needs to change.</p>
    </div>`,
    [
      `Hi ${name},`,
      ``,
      `Your ${consult.label} is held for ${when} Central.`,
      ``,
      payLine,
      ``,
      `Once payment arrives I'll confirm the booking and send a calendar invite.`,
      `Times are held for 24 hours.`,
    ].join("\n"),
    notifyAddress
  );

  await send(
    notifyAddress,
    `New booking (unpaid) — ${name}, ${consult.label}`,
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1b6b53;margin:0 0 8px;">Awaiting payment</p>
      <h1 style="font-size:22px;margin:0 0 20px;">${escapeHtml(name)} — ${escapeHtml(consult.label)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">When</td><td>${escapeHtml(when)} CT</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Amount</td><td>${escapeHtml(price)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Email</td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
        ${address ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;">Address</td><td>${escapeHtml(address)}</td></tr>` : ""}
        ${notes ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;vertical-align:top;">Notes</td><td>${escapeHtml(notes).replace(/\n/g, "<br>")}</td></tr>` : ""}
      </table>
      <p style="font-size:13px;line-height:1.6;color:#6b6b66;margin-top:24px;">Confirm this booking in Cal.com once payment arrives — it stays pending until you do.</p>
    </div>`,
    `${name} booked ${consult.label} for ${when} CT. ${price} due. Email: ${email}. Confirm in Cal.com once paid.`,
    email
  );

  return NextResponse.json({
    ok: true,
    when,
    price,
    venmoHandle: payTo || null,
    bookingUid: (booking as { uid?: string })?.uid ?? null,
  });
}
