"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Martini, Snowflake, TreePalm } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useUI } from "@/store/ui";
import { RotatingBadge, WhatsAppIcon } from "./icons";
import { Magnetic } from "./Magnetic";
import { Reveal, SectionEyebrow } from "./Reveal";

const spaces = [
  {
    icon: Snowflake,
    name: "Indoor Air-Conditioned",
    text: "Cool and quiet among the plants, good for long lunches and business dinners.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=70",
  },
  {
    icon: TreePalm,
    name: "Garden Terrace",
    text: "Lantern-lit tables under the palms, open to the evening breeze.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=900&q=70",
  },
  {
    icon: Martini,
    name: "Lounge Bar",
    text: "Low seats, cocktails and music, for sundowners and late nights.",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=70",
  },
];

export function Reservations() {
  const openReservation = useUI((s) => s.openReservation);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section ref={ref} id="reservations" className="relative overflow-hidden bg-ebony py-24 text-sand sm:py-32">
      <motion.div
        aria-hidden
        style={{ x: glowX }}
        className="pointer-events-none absolute -top-40 right-0 size-[40rem] rounded-full bg-clay/20 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-brass/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <SectionEyebrow light>Reservations</SectionEyebrow>
            <h2 className="font-serif text-5xl font-medium leading-[1] tracking-tight sm:text-7xl">
              Save your table <em className="text-gold">in under a minute</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand/60 sm:text-lg">
              Tell us when you&apos;re coming and where you&apos;d like to sit. We&apos;ll prepare a WhatsApp message
              for you to send, and our host will reply to confirm.
            </p>
            <Magnetic className="mt-8">
              <button
                type="button"
                onClick={openReservation}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white shadow-lift"
              >
                <span className="absolute inset-0 translate-y-full bg-sand transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <WhatsAppIcon size={20} className="relative transition-colors group-hover:text-whatsapp" />
                <span className="relative transition-colors group-hover:text-ink">Reserve via WhatsApp</span>
                <ArrowRight size={16} className="relative transition-all group-hover:translate-x-1 group-hover:text-ink" />
              </button>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <button type="button" onClick={openReservation} data-cursor="Book" aria-label="Book a table" className="group text-gold">
              <RotatingBadge size={170} text="Garden ✦ Lounge ✦ Indoor ✦ Terrace ✦ ">
                <span className="grid size-20 place-items-center rounded-full bg-sand text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                  <ArrowUpRight size={28} />
                </span>
              </RotatingBadge>
            </button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {spaces.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <button
                type="button"
                onClick={openReservation}
                data-cursor="Reserve"
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] text-left ring-1 ring-white/10 md:aspect-[3/4]"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute left-6 top-5 font-serif text-sm text-gold">0{i + 1}</span>
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-white/10 text-gold ring-1 ring-white/20 backdrop-blur-md transition-colors duration-500 group-hover:bg-clay group-hover:text-white">
                    <s.icon size={19} />
                  </span>
                  <span className="mt-4 block font-serif text-3xl font-semibold">{s.name}</span>
                  <span className="mt-1.5 block max-h-0 overflow-hidden text-sm leading-relaxed text-sand/75 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100 max-md:max-h-24 max-md:opacity-100">
                    {s.text}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
