// Kept in step with the portal's formatter so a phone number looks the same
// in a website notification email as it does in the portal.

/** Renders a US phone number as (402) 555-0142; anything else is left as entered. */
export function formatPhone(value: string | null | undefined): string {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (local.length !== 10) return value.trim();
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}
