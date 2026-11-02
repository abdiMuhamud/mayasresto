"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowDown, Clock, Leaf, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/config";
import { formatTime12 } from "@/lib/format";
import { isOpenNow } from "@/lib/hours";
import { useUI } from "@/store/ui";
import { LeafSprig, Logo } from "./Brand";
import { RotatingBadge, WhatsAppIcon } from "./icons";
import { Magnetic } from "./Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines: { words: string[]; className: string }[] = [
  { words: ["When", "different"], className: "text-sand" },
  { words: ["cuisines", "meet,"], className: "italic text-apricot" },
  { words: ["there's", "more", "than"], className: "text-sand" },
  { words: ["just", "food", "to", "share."], className: "italic text-sage" },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const word: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 + d, ease: EASE } }),
};

export function Hero() {
  const openReservation = useUI((s) => s.openReservation);
  const introDone = useUI((s) => s.introDone);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  // Pointer parallax for the photo collage.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => setOpen(isOpenNow()), []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  const state = introDone ? "show" : "hidden";

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden bg-navy-deep pb-28 pt-28 text-sand sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-32"
    >
      {/* Atmosphere: soft glows and leaves from the logo */}
      <div aria-hidden className="absolute -left-40 top-10 -z-10 size-[38rem] rounded-full bg-navy-soft/70 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 right-0 -z-10 size-[34rem] rounded-full bg-apricot/10 blur-3xl" />
      <motion.div
        aria-hidden
        className="absolute -left-24 bottom-24 -z-10 w-56 opacity-40 sm:w-80"
        initial={{ opacity: 0, x: -80 }}
        animate={introDone ? { opacity: 0.4, x: 0 } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <LeafSprig />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.div initial="hidden" animate={state}>
            <motion.div variants={fadeUp} custom={-0.5} className="mb-7 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-xs font-medium text-sand/90 ring-1 ring-white/15 backdrop-blur-md sm:text-sm">
                <MapPin size={14} className="text-apricot" /> The Oasis Complex, Kololi
              </span>
              {open !== null && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-2 text-xs font-medium text-sand/90 ring-1 ring-white/15 backdrop-blur-md">
                  <span className={`size-1.5 rounded-full ${open ? "animate-pulse bg-emerald-400" : "bg-sand/50"}`} />
                  {open ? "Open now" : `Opens ${formatTime12(site.hours.open)}`}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={container}
              className="font-serif text-[2.9rem] font-medium leading-[0.98] tracking-[-0.02em] sm:text-7xl xl:text-[5.6rem]"
            >
              {lines.map((line, li) => (
                <span key={li} className={`block ${line.className}`}>
                  {line.words.map((w, wi) => (
                    <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
                      <motion.span variants={word} className="inline-block origin-bottom-left">
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p variants={fadeUp} custom={0.05} className="mt-7 max-w-xl text-base leading-relaxed text-sand/70 sm:text-lg">
              Breakfast, lunch and dinner on Bertil Harding Highway. Manakish and mezze, grills and seafood, pancakes and
              fresh juices, in our decorated dining room or out on the terrace.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <a
                  href="#menu"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-apricot px-9 py-4 text-sm font-semibold text-navy-deep shadow-lift sm:w-auto"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-sand transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                  <span className="relative">Explore the Menu</span>
                  <ArrowDown size={16} className="relative transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={openReservation}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-9 py-4 text-sm font-semibold text-sand ring-1 ring-white/30 backdrop-blur-md sm:w-auto"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-whatsapp transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                  <WhatsAppIcon size={18} className="relative text-[#4ade80] transition-colors group-hover:text-white" />
                  <span className="relative">Book a Table via WhatsApp</span>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Arch photo collage with real photos from the restaurant */}
        <motion.div
          className="relative mx-auto h-[440px] w-full max-w-[460px] sm:h-[540px] lg:col-span-5 lg:h-[620px] lg:max-w-none"
          style={reduce ? undefined : { y: collageY }}
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <Arch
            src="/images/manakish-terrace.webp"
            alt="Za'atar and cheese manakish with labneh, served on the terrace"
            className="left-[18%] top-[4%] h-[78%] w-[62%]"
            depth={26}
            sx={sx}
            sy={sy}
            delay={0.2}
            show={introDone}
            priority
          />
          <Arch
            src="/images/pancakes.webp"
            alt="Banana pancakes"
            className="right-0 top-0 h-[38%] w-[34%]"
            depth={-34}
            sx={sx}
            sy={sy}
            delay={0.45}
            show={introDone}
          />
          <Arch
            src="/images/fish-prawns-mains.webp"
            alt="Grilled fish fillet and grilled prawns"
            className="bottom-[2%] left-0 h-[40%] w-[38%]"
            depth={-20}
            sx={sx}
            sy={sy}
            delay={0.6}
            show={introDone}
          />

          <motion.button
            type="button"
            onClick={openReservation}
            data-cursor="Book"
            aria-label="Book a table"
            initial={{ opacity: 0, scale: 0.5, rotate: -120 }}
            animate={introDone ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
            className="group absolute bottom-[6%] right-[2%] text-apricot"
          >
            <RotatingBadge size={150} text="Book a table ✦ Book a table ✦ ">
              <Logo size={86} ring={false} />
            </RotatingBadge>
          </motion.button>

          <div aria-hidden className="absolute -right-6 top-[44%] w-40 rotate-[-25deg] opacity-80">
            <LeafSprig flip />
          </div>
        </motion.div>
      </div>

      {/* Facts strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-deep/60 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-xs uppercase tracking-[0.18em] text-sand/60 sm:px-6 sm:py-5 lg:px-8">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-apricot" /> {site.meals}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={13} className="text-apricot" /> Wed – Mon from {formatTime12(site.hours.open)}
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <Leaf size={13} className="text-sage" /> Vegetarian-friendly
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function Arch({
  src,
  alt,
  className,
  depth,
  sx,
  sy,
  delay,
  show,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  delay: number;
  show: boolean;
  priority?: boolean;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  const frameRef = useRef<HTMLDivElement>(null);
  const [arch, setArch] = useState("inset(0 round 999px 999px 28px 28px)");

  // Clip to a true semicircular top. Done with clip-path (not border-radius) because
  // Chrome can let a scaling child escape a rounded overflow clip.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const ry = Math.min(50, (width / 2 / height) * 100).toFixed(2);
      setArch(`inset(0 round 50% 50% 28px 28px / ${ry}% ${ry}% 28px 28px)`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <div
        ref={frameRef}
        className="relative size-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]"
      >
        <div className="absolute inset-0 overflow-hidden bg-navy" style={{ clipPath: arch }}>
          <motion.div
            className="absolute inset-0"
            initial={{ y: "100%", scale: 1.3 }}
            animate={show ? { y: "0%", scale: 1 } : undefined}
            transition={{ y: { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }, scale: { duration: 2.2, delay, ease: EASE } }}
          >
            <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 380px, 60vw" className="object-cover" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
