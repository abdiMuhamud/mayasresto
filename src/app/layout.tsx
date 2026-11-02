import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Kololi, The Gambia — Breakfast, Lunch & Dinner`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Maya's Resto",
    "Kololi restaurant",
    "Oasis Complex Kololi",
    "Bertil Harding Highway restaurant",
    "breakfast Kololi",
    "vegetarian Gambia",
    "manakish Gambia",
    "restaurants in The Gambia",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} · The Oasis Complex, Kololi`,
    description: site.tagline,
    siteName: site.name,
    locale: "en_GB",
    images: [{ url: "/images/manakish-terrace.webp", width: 512, height: 640, alt: "Manakish and labneh on the terrace at Maya's Resto" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#06143a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  image: `${site.url}/brand/logo.png`,
  telephone: "+220 277 7737",
  servesCuisine: ["Fusion", "Middle Eastern", "Breakfast", "Vegetarian-friendly"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Kololi",
    addressCountry: "GM",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.open,
      closes: site.hours.close,
    },
  ],
  acceptsReservations: true,
  sameAs: [site.socials.instagram.url, site.socials.directory.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide the intro before first paint if it already played this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("mayas-intro")==="1")document.documentElement.dataset.intro="done"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
