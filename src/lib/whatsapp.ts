import { site } from "./config";
import { formatDateLong, formatGMD, formatTime12 } from "./format";

/**
 * Builds a wa.me deep link. With a configured number the chat opens directly;
 * without one, WhatsApp asks the guest which chat to send the pre-filled text to.
 */
export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

export type SeatingPreference = "Indoor Dining Room" | "Outdoor Terrace" | "No preference";
export type Occasion = "None" | "Birthday" | "Anniversary" | "Business" | "Family" | "Other";

export interface ReservationDetails {
  name: string;
  guests: string;
  date: string;
  time: string;
  seating: SeatingPreference;
  occasion: Occasion;
  notes: string;
}

export function buildReservationMessage(r: ReservationDetails) {
  const notes = [r.occasion !== "None" ? r.occasion : "", r.notes.trim()].filter(Boolean).join(" — ") || "—";
  return [
    `Hello ${site.name}! I would like to reserve a table.`,
    "",
    `👤 Name: ${r.name.trim()}`,
    `👥 Party Size: ${r.guests} ${r.guests === "1" ? "Guest" : "Guests"}`,
    `📅 Date & Time: ${formatDateLong(r.date)} at ${formatTime12(r.time)}`,
    `📍 Seating: ${r.seating}`,
    `📝 Notes: ${notes}`,
  ].join("\n");
}

export const quickReserveMessage = `Hello ${site.name}! I would like to reserve a table. Could you let me know what's available?`;

export type OrderType = "Takeaway" | "Dine-in pre-order";

export interface OrderLine {
  name: string;
  quantity: number;
  unitPrice?: number;
}

export interface OrderDetails {
  name: string;
  orderType: OrderType;
  time: string;
  notes: string;
  lines: OrderLine[];
}

/** Order ticket. Prices appear only for dishes that have one; the team confirms the total. */
export function buildOrderMessage(o: OrderDetails) {
  const items = o.lines.map(
    (l) => `• ${l.quantity} × ${l.name}${l.unitPrice ? ` — ${formatGMD(l.unitPrice * l.quantity)}` : ""}`,
  );

  return [
    `Hello ${site.name}! I'd like to place an order.`,
    "",
    `🧾 *${o.orderType.toUpperCase()}*`,
    `👤 Name: ${o.name.trim()}`,
    o.time ? `⏰ ${o.orderType === "Takeaway" ? "Pickup" : "Arrival"}: ${formatTime12(o.time)}` : "",
    "",
    "*Order*",
    ...items,
    o.notes.trim() ? `\n📝 Notes: ${o.notes.trim()}` : "",
    "",
    "Please confirm availability and the total. Thank you!",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n")
    .trim();
}
