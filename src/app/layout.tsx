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
    default: `${site.name} · Senegambia, Kololi — Coastal Kitchen & Grill`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Maya's Resto",
    "Senegambia restaurant",
    "Kololi restaurant",
    "The Gambia dining",
    "steakhouse Gambia",
    "seafood Kololi",
    "vegan Gambia",
    "cocktails Senegambia",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} · Senegambia Strip, Kololi`,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&h=630&q=75",
        width: 1200,
        height: 630,
        alt: "Garden dining at Maya's Resto",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#141518",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  servesCuisine: ["Mediterranean", "Argentinian", "Seafood", "Vegan", "West African"],
  priceRange: "$$",
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
  sameAs: [site.socials.instagram.url, site.socials.facebook.url],
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
