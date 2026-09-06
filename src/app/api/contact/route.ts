import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { formatPhone } from "@/lib/format";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "Emerald Website <onboarding@resend.dev>";
const toAddress = process.env.CONTACT_TO || site.email;

type Payload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  situation: string;
  details: string;
  referral: string;
};

const fields: Array<{ key: keyof Payload; label: string; required: boolean }> = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", required: true },
  { key: "phone", label: "Phone", required: false },
  { key: "location", label: "Where based", required: true },
  { key: "situation", label: "Property situation", required: true },
  { key: "details", label: "About the property", required: true },
  { key: "referral", label: "How they heard", required: false },
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real people leave this empty; bots fill everything in.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const values = {} as Payload;
  for (const field of fields) {
    const raw = body[field.key];
    const value = typeof raw === "string" ? raw.trim().slice(0, 5000) : "";
    if (field.required && !value) {
      return NextResponse.json(
        { ok: false, error: `${field.label} is required.` },
        { status: 400 }
      );
    }
    values[field.key] = field.key === "phone" ? formatPhone(value) : value;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  // Not configured yet — tell the client so it can fall back to a mailto: link
  // rather than silently swallowing the inquiry.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — inquiry not emailed");
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const rows = fields
    .filter((field) => values[field.key])
    .map(
      (field) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6b66;font-size:13px;vertical-align:top;white-space:nowrap;">${field.label}</td><td style="padding:6px 0;font-size:14px;color:#1a1a1a;">${escapeHtml(values[field.key]).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#1b6b53;margin:0 0 8px;">New website inquiry</p>
      <h1 style="font-size:22px;margin:0 0 24px;">${escapeHtml(values.name)}</h1>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <p style="margin-top:24px;font-size:13px;color:#6b6b66;">Reply straight to this email to reach ${escapeHtml(values.name)}.</p>
    </div>
  `;

  const text = fields
    .filter((field) => values[field.key])
    .map((field) => `${field.label}: ${values[field.key]}`)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: toAddress,
        reply_to: values.email,
        subject: `Website inquiry — ${values.name}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend error:", response.status, detail);
      return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
