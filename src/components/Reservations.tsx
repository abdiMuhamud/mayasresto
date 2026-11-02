"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Armchair, Sun } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/config";
import { useUI } from "@/store/ui";
import { LeafSprig, Logo } from "./Brand";
import { RotatingBadge, WhatsAppIcon } from "./icons";
import { Magnetic } from "./Magnetic";
import { Reveal, SectionEyebrow } from "./Reveal";

const spaces = [
  {
    icon: Armchair,
    name: "Indoor Dining Room",
    text: "Richly decorated, cool and relaxed, with plants and soft light.",
    image: "/images/dining-room.webp",
  },
  {
    icon: Sun,
    name: "Outdoor Terrace",
    text: "Eat in the open air among the flowers and palms.",
    image: "/images/terrace.webp",
  },
];

export function Reservations() {
  const openReservation = useUI((s) => s.openReservation);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [-10, 14]);

  return (
    <section ref={ref} id="reservations" className="relative overflow-hidden bg-navy-deep py-24 text-sand sm:py-32">
      <motion.div aria-hidden style={{ x: glowX }} className="pointer-events-none absolute -top-40 right-0 size-[40rem] rounded-full bg-navy-soft/80 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-apricot/10 blur-3xl" />
      <motion.div aria-hidden style={{ rotate: leafRotate }} className="pointer-events-none absolute -left-10 bottom-10 w-72 opacity-50 sm:w-96">
        <LeafSprig />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionEyebrow light>Reservations</SectionEyebrow>
              <h2 className="font-serif text-5xl font-medium leading-[1] tracking-tight sm:text-7xl">
                Save your <em className="text-apricot">table</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-sand/65 sm:text-lg">
                Tell us when you&apos;re coming and where you&apos;d like to sit. We&apos;ll prepare a WhatsApp message
                for you to send, and the team will reply to confirm.
              </p>
              <p className="mt-4 text-sm text-sand/50">
                {site.hours.label} · {site.hours.closedLabel}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Magnetic>
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
                <a href={site.phoneHref} className="text-sm font-semibold text-sand/80 underline-offset-4 hover:text-apricot hover:underline">
                  or call {site.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {spaces.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.12} className={i === 1 ? "sm:mt-16" : ""}>
                <button
                  type="button"
                  onClick={openReservation}
                  data-cursor="Reserve"
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-t-full rounded-b-[2rem] text-left ring-1 ring-white/10"
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="grid size-11 place-items-center rounded-full bg-white/10 text-apricot ring-1 ring-white/20 backdrop-blur-md transition-colors duration-500 group-hover:bg-apricot group-hover:text-navy-deep">
                      <s.icon size={19} />
                    </span>
                    <span className="mt-4 block font-serif text-3xl font-semibold">{s.name}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-sand/75">{s.text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="pointer-events-none absolute -right-4 -top-14 hidden lg:block">
              <span className="group pointer-events-auto block text-apricot">
                <RotatingBadge size={150} text="Indoor ✦ Terrace ✦ Kololi ✦ ">
                  <Logo size={84} ring={false} />
                </RotatingBadge>
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
