import { NextResponse } from "next/server";

const API = "https://api.cal.com/v2";
const KEY = process.env.CAL_API_KEY || "";

// The custom questions Misty configures on an event type in Cal.com. Rendered
// in our own booking form so her intake questions stay hers to edit.
export async function GET(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("eventTypeId"));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Missing eventTypeId" }, { status: 400 });
  }

  try {
    const res = await fetch(`${API}/event-types/${id}`, {
      headers: { Authorization: `Bearer ${KEY}`, "cal-api-version": "2024-06-14" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()).data;

    const fields = (data.bookingFields || [])
      .filter((f: { isDefault?: boolean; slug?: string }) => !f.isDefault && f.slug)
      .map((f: { slug: string; type: string; required?: boolean; label?: string; options?: unknown }) => ({
        slug: f.slug,
        type: f.type,
        required: Boolean(f.required),
        label: f.label || f.slug,
        options: f.options ?? null,
      }));

    return NextResponse.json({ fields });
  } catch (err) {
    console.error("[booking-fields]", err);
    return NextResponse.json({ fields: [] });
  }
}
