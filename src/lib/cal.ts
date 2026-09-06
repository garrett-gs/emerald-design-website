// Cal.com is used for availability and calendar writes only. Payment is handled
// on our side so it is not tied to whichever processor is working this month.
const API = "https://api.cal.com/v2";
const KEY = process.env.CAL_API_KEY || "";

export const CAL_TIMEZONE = "America/Chicago";

function headers(version: string) {
  return {
    Authorization: `Bearer ${KEY}`,
    "cal-api-version": version,
    "Content-Type": "application/json",
  };
}

export type Slot = { start: string };

export async function getSlots(
  eventTypeId: number,
  startISO: string,
  endISO: string
): Promise<Record<string, Slot[]>> {
  if (!KEY) throw new Error("CAL_API_KEY not set");
  const url = `${API}/slots?eventTypeId=${eventTypeId}&start=${startISO}&end=${endISO}&timeZone=${encodeURIComponent(CAL_TIMEZONE)}`;
  const res = await fetch(url, {
    headers: headers("2024-09-04"),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`slots ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return json.data ?? {};
}

export type BookingInput = {
  eventTypeId: number;
  start: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  responses?: Record<string, string>;
};

export async function createBooking(input: BookingInput) {
  if (!KEY) throw new Error("CAL_API_KEY not set");

  const body: Record<string, unknown> = {
    start: input.start,
    eventTypeId: input.eventTypeId,
    attendee: {
      name: input.name,
      email: input.email,
      timeZone: CAL_TIMEZONE,
      language: "en",
    },
    metadata: {},
  };

  const detail = [
    input.phone ? `Phone: ${input.phone}` : "",
    input.address ? `Property address: ${input.address}` : "",
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Custom questions configured on the event type in Cal.com, plus our own
  // free-text notes in the built-in notes field.
  const responses: Record<string, string> = { ...(input.responses || {}) };
  if (detail) responses.notes = detail;
  if (Object.keys(responses).length) body.bookingFieldsResponses = responses;

  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: headers("2024-08-13"),
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status === "error") {
    throw new Error(
      `booking failed ${res.status}: ${JSON.stringify(json).slice(0, 300)}`
    );
  }
  return json.data;
}
