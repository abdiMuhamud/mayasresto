"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { Logo } from "./Brand";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#reservations", label: "Reservations" },
  { href: "#location", label: "Location & Contact" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export function Header() {
  const hydrated = useHydrated();
  const count = useCart((s) => selectCount(s.items));
  const openCart = useUI((s) => s.openCart);
  const openReservation = useUI((s) => s.openReservation);
  const introDone = useUI((s) => s.introDone);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 500 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    if (!hydrated || count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 320);
    return () => clearTimeout(t);
  }, [count, hydrated]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Sticky elements below the header (menu tabs) follow its show/hide.
  const headerShown = introDone && !hidden;
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", headerShown ? "var(--header-h)" : "0px");
  }, [headerShown]);

  const solid = scrolled && !mobileOpen;
  const light = !solid; // light text over the hero / mobile overlay

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: introDone && !(hidden && !mobileOpen) ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            solid ? "border-b border-ink/5 bg-sand/80 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
            <a href="#top" onClick={() => setMobileOpen(false)} className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <Logo size={44} priority />
              <span className="hidden flex-col leading-none sm:flex">
                <span className={`font-serif text-[1.55rem] font-semibold tracking-tight transition-colors ${light ? "text-sand" : "text-ink"}`}>
                  Maya&apos;s Resto
                </span>
                <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.36em] ${light ? "text-apricot" : "text-clay"}`}>
                  Kololi · The Gambia
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative py-2 text-sm font-medium transition-colors ${
                    light ? "text-sand/85 hover:text-sand" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-clay transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open order${hydrated && count ? `, ${count} items` : ""}`}
                className={`relative grid size-11 place-items-center rounded-full transition-colors ${
                  light ? "bg-white/10 text-sand ring-1 ring-white/20 hover:bg-white/20" : "bg-ivory text-ink hover:bg-ink/10"
                }`}
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                {hydrated && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: bump ? 1.25 : 1 }}
                    className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-sand"
                  >
                    {count}
                  </motion.span>
                )}
              </button>

              <button
                type="button"
                onClick={openReservation}
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white shadow-soft sm:inline-flex"
              >
                <span className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <WhatsAppIcon size={18} className="relative" />
                <span className="relative">Quick Reserve</span>
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
                className={`relative grid size-11 place-items-center rounded-full lg:hidden ${light ? "text-sand" : "text-ink"}`}
              >
                <span className="relative block h-3 w-6">
                  <span
                    className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${
                      mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] bg-current transition-all duration-500 ${
                      mobileOpen ? "top-1/2 w-full -translate-y-1/2 -rotate-45" : "bottom-0 w-4"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-navy-deep text-sand lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="absolute inset-0 opacity-25">
              <Image src="/images/terrace.webp" alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ebony/70 via-ebony/90 to-ebony" />
            </div>
            <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center px-6 pt-20">
              <ul>
                {links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-white/10">
                    <motion.a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-baseline gap-4 py-5 font-serif text-[2.25rem] leading-none sm:text-5xl"
                    >
                      <span className="font-sans text-xs text-apricot">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative flex items-end justify-between px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-sm text-sand/60"
            >
              <div>
                <p>{site.hours.label}</p>
                <p className="text-clay">{site.hours.closedLabel}</p>
              </div>
              <a
                href={site.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full ring-1 ring-white/15"
              >
                <InstagramIcon size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
