import { site } from "./config";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Current weekday (0–6) and minutes-since-midnight in Banjul time. */
export function nowInBanjul(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function isOpenNow(date = new Date()) {
  const { weekday, minutes } = nowInBanjul(date);
  if ((site.hours.closedDays as readonly number[]).includes(weekday)) return false;
  return minutes >= toMinutes(site.hours.open) && minutes < toMinutes(site.hours.close);
}

/** Today's date in Banjul as yyyy-mm-dd, for the date picker's `min`. */
export function todayISO(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone }).format(date);
}

/** Validates a requested booking slot. Returns an error message, or null when OK. */
export function validateBookingSlot(isoDate: string, time: string): string | null {
  if (!isoDate || !time) return "Please choose a date and time.";
  const [y, m, d] = isoDate.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  if ((site.hours.closedDays as readonly number[]).includes(weekday)) {
    return "We're closed on Tuesdays — please pick another day.";
  }
  if (isoDate < todayISO()) return "That date has already passed.";
  const t = toMinutes(time);
  if (t < toMinutes(site.hours.open) || t > toMinutes(site.hours.lastSeating)) {
    return "Tables are available from 11:30 AM, last seating 9:30 PM.";
  }
  if (isoDate === todayISO() && t <= nowInBanjul().minutes) {
    return "That time has already passed today.";
  }
  return null;
}
