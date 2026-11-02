/**
 * Central site configuration. Everything the restaurant may want to change
 * (contact details, hours, fees, exchange rate) lives here.
 */

/**
 * WhatsApp number in international format, digits only (e.g. 2207XXXXXX).
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel → Project → Settings → Environment Variables.
 * When unset, WhatsApp opens with the message pre-filled and lets the guest pick the chat.
 */
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const site = {
  name: "Maya's Resto",
  shortName: "Maya's",
  tagline: "Coastal kitchen · Grill · Garden bar",
  description:
    "Bohemian-chic dining on the Senegambia Strip, Kololi. Fresh quinoa bowls, Argentinian-style grill, Atlantic seafood and artisanal cocktails.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mayasresto.vercel.app",

  whatsappNumber: rawWhatsApp.replace(/\D/g, ""),

  address: {
    line1: "Senegambia Strip, Bertil Harding Highway",
    line2: "Kololi, The Gambia",
    mapQuery: "Maya's Resto, Senegambia, Kololi, The Gambia",
  },

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  socials: {
    instagram: { handle: "@mayasresto", url: "https://www.instagram.com/mayasresto/" },
    facebook: { url: "https://www.facebook.com/mayasresto" },
    tripadvisor: { url: "https://www.tripadvisor.com/Search?q=Maya%27s%20Resto%20Kololi" },
  },

  /** The Gambia runs on GMT all year (Africa/Banjul). */
  timeZone: "Africa/Banjul",
  hours: {
    label: "Wed – Mon: 11:30 AM – 10:30 PM",
    closedLabel: "Closed Tuesdays",
    open: "11:30",
    close: "22:30",
    /** Last table booking accepted, in 24h time. */
    lastSeating: "21:30",
    /** 0 = Sunday … 6 = Saturday */
    closedDays: [2],
  },

  pricing: {
    currency: "GMD",
    /** Approximate dalasi per euro, used for the € equivalent shown on the menu. */
    gmdPerEur: 82,
    serviceChargeRate: 0.1,
    takeawayPackagingFee: 75,
    vatNote: "Menu prices include 15% VAT.",
  },
} as const;

export type Site = typeof site;
