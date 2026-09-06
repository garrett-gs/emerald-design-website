import { NextResponse } from "next/server";
import { getSlots } from "@/lib/cal";

// Proxied so the Cal.com key stays server-side.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventTypeId = Number(searchParams.get("eventTypeId"));
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  if (!Number.isFinite(eventTypeId) || !start || !end) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const slots = await getSlots(eventTypeId, start, end);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[slots]", err);
    return NextResponse.json({ error: "Could not load availability" }, { status: 502 });
  }
}
