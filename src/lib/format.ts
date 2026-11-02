import { site } from "./config";

const gmd = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const eur = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** "D 1,250" — the dalasi sign used locally. */
export function formatGMD(amount: number) {
  return `D ${gmd.format(Math.round(amount))}`;
}

/** "≈ €15" equivalent for visiting guests. */
export function formatEUR(amount: number) {
  return `≈ ${eur.format(amount / site.pricing.gmdPerEur)}`;
}

/** "Saturday, 14 Nov 2026" from a yyyy-mm-dd string (no timezone drift). */
export function formatDateLong(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "19:30" → "7:30 PM" */
export function formatTime12(time: string) {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}
