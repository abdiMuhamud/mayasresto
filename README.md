# Maya's Resto — Kololi, The Gambia

Website for **Maya's Resto**, The Oasis Complex, Bertil Harding Highway, Kololi.
*"When different cuisines meet, there's more than just food to share."*

Guests can browse the menu, build an order and book a table. Orders and bookings go out as pre-filled WhatsApp messages to the restaurant.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Zustand · lucide-react

## Where the content comes from

- **Brand:** the real logo (navy disc, sage leaves, apricot script) is in `public/brand/`. The site palette is taken from it.
- **Facts:** the restaurant's Instagram ([@mayasresto](https://www.instagram.com/mayasresto/)) and its [My Gambia listing](https://www.my-gambia.com/directories/mayas-resto/). That covers the address, Breakfast · Lunch · Dinner, open Wednesday–Monday, phone +220 277 7737, the indoor dining room and outdoor terrace, and the vegetarian-friendly global fusion menu.
- **Photos:** the restaurant's own Instagram posts, with no people in them, saved in `public/images/`.
- **Menu:** dishes the restaurant has shown on Instagram and My Gambia, grouped by its Instagram categories (Breakfast, Tapas, Salads, Wraps, Mains, Desserts, Drinks). **No prices are published, so none are shown.** The team confirms prices on WhatsApp. To add a price to a dish, set `price` (in GMD) on it in [`src/lib/menu.ts`](src/lib/menu.ts) and it appears everywhere.

## Features

- **Intro:** the real logo spins in inside a rotating "Breakfast · Lunch · Dinner" ring, with leaves from the logo.
- **Hero:** the restaurant's tagline is revealed word by word. Real photos sit in arch frames that drift with the mouse and the scroll, next to a rotating "Book a table" badge with a live open/closed status.
- **Story:** the About text lights up as you scroll, with parallax photos of the dining room and terrace and count-up facts.
- **From our kitchen:** a gallery of real dishes. On desktop it holds in place and scrolls sideways; on phones it swipes.
- **Menu:** a typeset menu with sticky category tabs. On desktop, hovering a dish that has a photo shows it next to the cursor. Every dish has an add-to-order button.
- **Order drawer:** items, quantities, takeaway or dine-in, pickup time and notes, sent as a WhatsApp ticket.
- **Reservation form:** name, party size (1–12+), date and time (rejects Tuesdays and out-of-hours times), indoor or terrace seating, occasion and notes, sent to WhatsApp.
- **Location:** a Google Map pinned on Maya's Resto, a weekly hours table, and links to call, WhatsApp, Instagram and the My Gambia listing.
- **Finishing touches:** Lenis smooth scrolling, a custom cursor and magnetic buttons on desktop, a full-screen mobile menu, and support for reduced motion.

## Configure

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only (currently `2202777737`). |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for social previews. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional email shown in the contact card. |

Hours, address and links are in [`src/lib/config.ts`](src/lib/config.ts).

## Develop

```bash
npm install
npm run dev
npm run build
```

Pushing to `main` deploys to Vercel (https://mayasresto.vercel.app).
