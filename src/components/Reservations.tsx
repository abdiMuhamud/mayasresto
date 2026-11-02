"use client";

import { ArrowRight, Martini, Snowflake, TreePalm } from "lucide-react";
import Image from "next/image";
import { useUI } from "@/store/ui";
import { WhatsAppIcon } from "./icons";
import { Reveal, SectionEyebrow } from "./Reveal";

const spaces = [
  {
    icon: Snowflake,
    name: "Indoor Air-Conditioned",
    text: "Cool and quiet, good for long lunches and business dinners.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=70",
  },
  {
    icon: TreePalm,
    name: "Garden Terrace",
    text: "Lantern-lit tables under the palms, open to the evening breeze.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70",
  },
  {
    icon: Martini,
    name: "Lounge Bar",
    text: "Low seats, cocktails and music, for sundowners and late nights.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=70",
  },
];

export function Reservations() {
  const openReservation = useUI((s) => s.openReservation);

  return (
    <section id="reservations" className="relative overflow-hidden bg-ebony py-20 text-sand sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-clay/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-brass/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionEyebrow light>Reservations</SectionEyebrow>
            <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              Save your table <em className="text-gold">in under a minute</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sand/65 sm:text-lg">
              Tell us when you&apos;re coming and where you&apos;d like to sit. We&apos;ll prepare a WhatsApp message
              for you to send, and our host will reply to confirm.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={openReservation}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white shadow-lift transition hover:brightness-110 sm:w-auto"
            >
              <WhatsAppIcon size={20} />
              Reserve via WhatsApp
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {spaces.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <button
                type="button"
                onClick={openReservation}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left ring-1 ring-white/10 md:aspect-[3/4]"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-white/10 text-gold ring-1 ring-white/20 backdrop-blur-md">
                    <s.icon size={18} />
                  </span>
                  <span className="mt-4 block font-serif text-2xl font-semibold">{s.name}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-sand/70">{s.text}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
