"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useUI } from "@/store/ui";
import { WhatsAppIcon } from "./icons";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  const openReservation = useUI((s) => s.openReservation);
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ebony">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Open-air terrace dining at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ebony via-ebony/55 to-ebony/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ebony/70 via-transparent to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <motion.p
            {...fade(0.15)}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-sand ring-1 ring-white/20 backdrop-blur-md sm:text-sm"
          >
            <span aria-hidden>📍</span> Senegambia Strip, Kololi, The Gambia
          </motion.p>

          <motion.h1
            {...fade(0.3)}
            className="font-serif text-[2.9rem] font-medium leading-[0.98] tracking-tight text-sand sm:text-7xl lg:text-[5.5rem]"
          >
            Flavors of the Coast{" "}
            <span className="block italic text-gold/95">
              Meets Culinary <span className="text-clay">Craftsmanship</span>
            </span>
          </motion.h1>

          <motion.p {...fade(0.45)} className="mt-6 max-w-xl text-base leading-relaxed text-sand/75 sm:text-lg">
            Garden-fresh bowls, Argentinian fire and the morning&apos;s Atlantic catch, served under the palms with
            cocktails steeped in wonjo, baobab and ginger.
          </motion.p>

          <motion.div {...fade(0.6)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-sm font-semibold text-white shadow-lift transition hover:bg-clay-dark"
            >
              Explore Menu
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={openReservation}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white/10 px-8 py-4 text-sm font-semibold text-sand ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/20"
            >
              <WhatsAppIcon size={18} className="text-[#4ade80]" />
              Book a Table via WhatsApp
            </button>
          </motion.div>

          <motion.dl
            {...fade(0.75)}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sand"
          >
            {[
              { k: "3", v: "Seating spaces" },
              { k: "Daily", v: "Local catch" },
              { k: "11:30", v: "Opens Wed–Mon" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="sr-only">{s.v}</dt>
                <dd className="font-serif text-2xl sm:text-3xl">{s.k}</dd>
                <dd className="mt-1 text-[10px] uppercase leading-snug tracking-[0.12em] text-sand/55 sm:text-[11px] sm:tracking-[0.18em]">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
