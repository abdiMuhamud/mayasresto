/**
 * Central site configuration. Facts here come from the restaurant's own Instagram
 * (@mayasresto) and its My Gambia directory listing. Change them here only.
 */

/**
 * WhatsApp number in international format, digits only.
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel → Project → Settings → Environment Variables.
 * When unset, WhatsApp opens with the message pre-filled and lets the guest pick the chat.
 */
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const site = {
  name: "Maya's Resto",
  shortName: "Maya's",
  /** The restaurant's own line from its Instagram bio. */
  tagline: "When different cuisines meet, there's more than just food to share.",
  meals: "Breakfast · Lunch · Dinner",
  description:
    "Maya's Resto in Kololi, The Gambia: global fusion cooking with fresh vegetarian-friendly options, served for breakfast, lunch and dinner in a decorated dining room or on the open-air terrace.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mayasresto.vercel.app",

  whatsappNumber: rawWhatsApp.replace(/\D/g, ""),
  phoneDisplay: "+220 277 7737",
  phoneHref: "tel:+2202777737",

  address: {
    line1: "The Oasis Complex, Bertil Harding Highway",
    line2: "Kololi, The Gambia",
    /** Google Maps has the restaurant listed by name, which drops the pin on it. */
    mapQuery: "Maya's Resto, Kololi, The Gambia",
  },

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  socials: {
    instagram: { handle: "@mayasresto", url: "https://www.instagram.com/mayasresto/" },
    directory: { label: "My Gambia directory", url: "https://www.my-gambia.com/directories/mayas-resto/" },
  },

  /** The Gambia runs on GMT all year (Africa/Banjul). */
  timeZone: "Africa/Banjul",
  hours: {
    label: "Wed – Mon: 9:30 AM – 10:30 PM",
    closedLabel: "Closed Tuesdays",
    open: "09:30",
    close: "22:30",
    /** Last table booking accepted, in 24h time. */
    lastSeating: "21:30",
    /** 0 = Sunday … 6 = Saturday */
    closedDays: [2],
  },
} as const;

export type Site = typeof site;
