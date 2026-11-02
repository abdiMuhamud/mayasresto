"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { useHydrated, useScrolled } from "@/lib/hooks";
import { selectCount, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { BrandMark, WhatsAppIcon } from "./icons";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#reservations", label: "Reservations" },
  { href: "#location", label: "Location & Contact" },
];

export function Header() {
  const scrolled = useScrolled();
  const hydrated = useHydrated();
  const count = useCart((s) => selectCount(s.items));
  const openCart = useUI((s) => s.openCart);
  const openReservation = useUI((s) => s.openReservation);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bump, setBump] = useState(false);

  // Little pop on the badge whenever the count changes.
  useEffect(() => {
    if (!hydrated || count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(t);
  }, [count, hydrated]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "border-b border-ink/5 bg-sand/85 shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur-md"
          : "bg-gradient-to-b from-ebony/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <BrandMark size={30} className="transition-transform duration-700 group-hover:rotate-[20deg]" />
          <span className="flex flex-col leading-none">
            <span
              className={`font-serif text-[1.65rem] font-semibold tracking-tight transition-colors ${
                solid ? "text-ink" : "text-sand"
              }`}
            >
              Maya&apos;s
            </span>
            <span
              className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[0.42em] ${
                solid ? "text-brass" : "text-gold"
              }`}
            >
              Resto · Kololi
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solid ? "text-ink/75 hover:bg-ivory hover:text-ink" : "text-sand/85 hover:bg-white/10 hover:text-sand"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open order${hydrated && count ? `, ${count} items` : ""}`}
            className={`relative grid size-11 place-items-center rounded-full transition-colors ${
              solid ? "bg-ivory text-ink hover:bg-ink/10" : "bg-white/10 text-sand ring-1 ring-white/20 hover:bg-white/20"
            }`}
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            {hydrated && count > 0 && (
              <span
                className={`absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-sand transition-transform duration-300 ${
                  bump ? "scale-125" : "scale-100"
                }`}
              >
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openReservation}
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 sm:inline-flex"
          >
            <WhatsAppIcon size={18} />
            Quick Reserve
          </button>
          <button
            type="button"
            onClick={openReservation}
            aria-label="Reserve a table on WhatsApp"
            className="grid size-11 place-items-center rounded-full bg-whatsapp text-white shadow-soft sm:hidden"
          >
            <WhatsAppIcon size={20} />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`grid size-11 place-items-center rounded-full lg:hidden ${
              solid ? "text-ink hover:bg-ivory" : "text-sand hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/5 bg-sand lg:hidden"
          >
            <ul className="px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-ink/5 py-4 font-serif text-2xl text-ink last:border-0"
                  >
                    {l.label}
                    <span className="text-brass">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
