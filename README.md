# Maya's Resto — Senegambia, Kololi

Mobile-first restaurant site for Maya's Resto on the Senegambia Strip. Guests can browse the menu, build an order and book a table. Orders and bookings go out as pre-filled WhatsApp messages.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · lucide-react

## Features

- **Sticky header.** Transparent over the hero, then frosted once you scroll. Shows a live cart badge and a WhatsApp Quick Reserve button. On mobile, the links move into a menu.
- **Hero.** Full-bleed image, the location tag, and two buttons: *Explore Menu* (smooth scroll) and *Book a Table via WhatsApp*.
- **Menu.** Four category tabs (arrow keys work, and the bar stays visible while you scroll). Each dish card shows the price in dalasi with a euro equivalent, plus dietary tags. "Add to Order" pops a toast.
- **Cart drawer.** Slides in from the right. Has + / − quantity controls and a Takeaway / Dine-in pre-order toggle. It shows the subtotal, a 10% service charge and the takeaway packaging fee, then sends the order to WhatsApp as a formatted ticket. The cart is saved in `localStorage`.
- **Reservation form.** Opens as a bottom sheet on mobile and a centred modal on desktop. Fields: name, party size (1–12+), date and time, seating (Indoor Air-Conditioned / Garden Terrace / Lounge Bar), occasion and notes. It rejects Tuesdays, past dates and times outside 11:30–21:30, then opens `wa.me` with the message filled in.
- **Location.** Google Maps embed and a "Get directions" link. Opening hours include a live *Open now* badge based on Banjul time. Links to Instagram, Facebook and Tripadvisor.
- **SEO.** Open Graph tags and `Restaurant` JSON-LD structured data.
- **Accessibility.** Focus trap and Escape-to-close on overlays, ARIA tabs and dialogs, and support for reduced motion.

## Configure

Copy `.env.example` to `.env.local` (and add the same variables in Vercel):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | The restaurant's WhatsApp number, digits only, e.g. `2207XXXXXX`. If unset, WhatsApp opens with the message ready and the guest picks the chat. |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for social previews. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional email shown in the contact card. |

Everything else lives in [`src/lib/config.ts`](src/lib/config.ts): hours, address, social links, service charge, packaging fee and the GMD→EUR rate. Menu items are in [`src/lib/menu.ts`](src/lib/menu.ts).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deploy to Vercel

1. In Vercel, click **Add New → Project** and import `abdiMuhamud/mayasresto`. Vercel detects Next.js automatically.
2. Under **Environment Variables**, add `NEXT_PUBLIC_WHATSAPP_NUMBER` (and optionally the others).
3. Click **Deploy**. Every push to `main` redeploys.

## Images

Dish and ambience photos currently come from Unsplash (`images.unsplash.com`, allowed in `next.config.ts`). To use your own, put them in `public/` and change the `image` fields in `src/lib/menu.ts`.

## Project structure

```
src/
  app/            layout (fonts, SEO, JSON-LD), page, global styles, favicon
  components/     Header, Hero, MenuSection, DishCard, About, Reservations,
                  Location, Footer, CartDrawer, ReservationModal, Toaster,
                  MobileOrderBar, Reveal, icons
  lib/            config, menu data, WhatsApp message builders, hours, formatting, hooks
  store/          Zustand stores: cart (persisted) and UI (drawers, toasts)
```
