"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/config";
import { formatTime12 } from "@/lib/format";
import { isOpenNow } from "@/lib/hours";
import { useUI } from "@/store/ui";
import { RotatingBadge, WhatsAppIcon } from "./icons";
import { Magnetic } from "./Magnetic";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const heroSlides = [
  { src: u("1600093463592-8e36ae95ef56"), label: "The Garden", alt: "Lush tropical garden dining area strung with warm lights" },
  { src: u("1537047902294-62a40c20a6ae"), label: "The Dining Room", alt: "Plant-filled dining room with velvet banquettes" },
  { src: u("1600565193348-f74bd3c7ccdf"), label: "The Fire", alt: "Chef working over a burst of flame in the kitchen" },
  { src: u("1519671482749-fd09be7ccebf"), label: "The Evenings", alt: "Guests raising glasses in a toast" },
];

const SLIDE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

const lines: { words: string[]; className: string }[] = [
  { words: ["Flavors", "of", "the", "Coast"], className: "text-sand" },
  { words: ["Meets", "Culinary"], className: "italic text-gold" },
  { words: ["Craftsmanship"], className: "italic text-clay" },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const word: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 + d, ease: EASE } }),
};

export function Hero() {
  const openReservation = useUI((s) => s.openReservation);
  const introDone = useUI((s) => s.introDone);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, introDone]);

  useEffect(() => setOpen(isOpenNow()), []);

  const state = introDone ? "show" : "hidden";

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ebony">
      {/* Slideshow with Ken Burns drift and scroll parallax */}
      <motion.div className="absolute inset-x-0 -top-[25%] -z-20 h-[125%]" style={reduce ? undefined : { y: imageY, scale: imageScale }}>
        {heroSlides.map((s, i) => {
          const active = i === index;
          return (
            <motion.div
              key={s.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.14 }}
              transition={{
                opacity: { duration: 1.6, ease: "easeInOut" },
                scale: { duration: active ? SLIDE_MS / 1000 + 1.6 : 1.6, ease: "linear" },
              }}
            >
              <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ebony via-ebony/50 to-ebony/30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_80%,rgb(20_21_24/0.85),transparent_60%)]" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-32 sm:px-6 sm:pb-36 lg:px-8"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div initial="hidden" animate={state} className="max-w-4xl">
          <motion.div variants={fadeUp} custom={-0.4} className="mb-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-sand ring-1 ring-white/20 backdrop-blur-md sm:text-sm">
              <span aria-hidden>📍</span> Senegambia Strip, Kololi, The Gambia
            </span>
            {open !== null && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-medium text-sand/90 ring-1 ring-white/20 backdrop-blur-md">
                <span className={`size-1.5 rounded-full ${open ? "animate-pulse bg-emerald-400" : "bg-sand/50"}`} />
                {open ? "Open now" : `Opens ${formatTime12(site.hours.open)}`}
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={container}
            className="font-serif text-[3.1rem] font-medium leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6.6rem]"
          >
            {lines.map((line, li) => (
              <span key={li} className={`block ${line.className}`}>
                {line.words.map((w, wi) => (
                  <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
                    <motion.span variants={word} className="inline-block origin-bottom-left">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} custom={0.1} className="mt-7 max-w-xl text-base leading-relaxed text-sand/75 sm:text-lg">
            Garden-fresh bowls, Argentinian fire and the morning&apos;s Atlantic catch, served under the palms with
            cocktails steeped in wonjo, baobab and ginger.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.25} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#menu"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-clay px-9 py-4 text-sm font-semibold text-white shadow-lift sm:w-auto"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <span className="relative">Explore Menu</span>
                <ArrowDown size={16} className="relative transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={openReservation}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white/10 px-9 py-4 text-sm font-semibold text-sand ring-1 ring-white/30 backdrop-blur-md sm:w-auto"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-sand transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <WhatsAppIcon size={18} className="relative text-[#4ade80] transition-colors group-hover:text-whatsapp" />
                <span className="relative transition-colors group-hover:text-ink">Book a Table via WhatsApp</span>
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rotating reserve badge */}
      <motion.button
        type="button"
        onClick={openReservation}
        data-cursor="Book"
        aria-label="Book a table"
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={introDone ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
        className="group absolute bottom-28 right-6 hidden text-sand/85 lg:right-10 lg:block xl:bottom-36"
      >
        <RotatingBadge size={150} text="Book a table ✦ Book a table ✦ ">
          <span className="grid size-16 place-items-center rounded-full bg-clay text-white transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight size={24} />
          </span>
        </RotatingBadge>
      </motion.button>

      {/* Slide indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ebony/30 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
          {heroSlides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.label}`}
              aria-current={i === index}
              className="group py-4 text-left sm:py-5"
            >
              <span className="relative block h-px w-full overflow-hidden bg-white/20">
                {i === index && introDone && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
              <span
                className={`mt-3 hidden items-baseline gap-2 text-xs uppercase tracking-[0.2em] transition-colors sm:flex ${
                  i === index ? "text-sand" : "text-sand/40 group-hover:text-sand/70"
                }`}
              >
                <span className="font-serif text-sm tracking-normal text-gold">0{i + 1}</span>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
