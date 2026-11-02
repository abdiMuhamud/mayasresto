"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Armchair, Leaf, Sunrise } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/config";
import { formatTime12 } from "@/lib/format";
import { LeafSprig, Logo } from "./Brand";
import { Reveal, SectionEyebrow } from "./Reveal";

const statement =
  "A home away from home on Bertil Harding Highway, loved by locals and visitors alike. Our menu brings different cuisines together, from manakish and mezze to grills, seafood and pancakes, with fresh vegetarian-friendly choices throughout.";

const pillars = [
  {
    icon: Sunrise,
    title: "Breakfast to dinner",
    text: "Open from 9:30 for breakfast, through long lunches, to dinner with friends.",
  },
  {
    icon: Leaf,
    title: "Vegetarian-friendly",
    text: "Falafel, hummus, manakish, fattoush and more, alongside grills and seafood.",
  },
  {
    icon: Armchair,
    title: "Inside or out",
    text: "A richly decorated dining room, or the open-air terrace among the plants.",
  },
];

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  const imagesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({ target: imagesRef, offset: ["start end", "end start"] });
  const bigY = useTransform(imgProgress, [0, 1], ["-8%", "8%"]);
  const smallY = useTransform(imgProgress, [0, 1], ["25%", "-25%"]);
  const badgeRotate = useTransform(imgProgress, [0, 1], [-90, 90]);

  return (
    <section id="about" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-16 top-16 w-72 opacity-70 sm:w-[28rem]">
        <LeafSprig flip />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>About Maya&apos;s</SectionEyebrow>
        <p
          ref={textRef}
          className="max-w-5xl font-serif text-[2rem] font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div ref={imagesRef} className="relative lg:col-span-7">
            <div className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-lift">
              <motion.div className="absolute inset-[-10%]" style={{ y: bigY }}>
                <Image
                  src="/images/dining-room.webp"
                  alt="The decorated indoor dining room at Maya's Resto"
                  fill
                  sizes="(min-width: 1024px) 560px, 86vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              style={{ y: smallY }}
              className="absolute -bottom-10 left-0 w-[44%] overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-sand shadow-lift"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/terrace.webp"
                  alt="The open-air terrace with flowers and palms"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div style={{ rotate: badgeRotate }} className="group absolute right-0 top-[-2rem] sm:-right-4">
              <Logo size={104} />
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {site.tagline.split(",")[0]}, <em className="text-clay">there&apos;s more</em> than just food to share
              </h2>
              <p className="mt-5 text-base leading-relaxed text-taupe sm:text-lg">
                Find us in The Oasis Complex in Kololi. Settle into the dining room, or take a table on the terrace and
                eat in the open air.
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
              <Stat label="Doors open" value={formatTime12(site.hours.open).replace(" ", "")} />
              <Stat label="Days a week" count={7 - site.hours.closedDays.length} />
              <Stat label="Meals a day" count={3} />
              <Stat label="Places to sit" count={2} />
            </dl>
          </div>
        </div>

        <div className="mt-24 grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <div className="group h-full rounded-3xl bg-white/70 p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-full bg-sage-soft text-sage-deep transition-colors duration-500 group-hover:bg-navy group-hover:text-apricot">
                  <p.icon size={21} />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = /home|cuisines|manakish|vegetarian/i.test(children);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? "italic text-clay" : ""}`}>
      {children}
    </motion.span>
  );
}

function Stat({ label, value, count }: { label: string; value?: string; count?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || count === undefined) return;
    const c = animate(0, count, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, count]);

  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">{label}</dt>
      <dd ref={ref} className="mt-1 font-serif text-5xl font-medium tabular-nums text-ink">
        {value ?? n}
      </dd>
    </div>
  );
}
