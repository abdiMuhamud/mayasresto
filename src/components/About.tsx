"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Flame, Leaf, Waves } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/config";
import { formatTime12 } from "@/lib/format";
import { dishes } from "@/lib/menu";
import { BrandMark } from "./icons";
import { Reveal, SectionEyebrow } from "./Reveal";

const statement =
  "We cook the way The Gambia eats: generously, outdoors and with whatever the morning brought in. Garden produce, open fire, the day's catch, and cocktails made with wonjo and baobab.";

const pillars = [
  {
    icon: Leaf,
    title: "Garden first",
    text: "Bowls and salads built around produce from growers in Brikama and Lamin, with plenty for vegan guests.",
  },
  {
    icon: Flame,
    title: "Live-fire grill",
    text: "An Argentinian-style parrilla burning hardwood, for steaks, skewers and sharing asado platters.",
  },
  {
    icon: Waves,
    title: "Atlantic catch",
    text: "Fish and prawns bought each morning at Tanji and Bakau and cooked simply.",
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
  const badgeRotate = useTransform(imgProgress, [0, 1], [-60, 120]);

  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>About Us</SectionEyebrow>
        <p
          ref={textRef}
          className="max-w-5xl font-serif text-[2rem] font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div ref={imagesRef} className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] sm:rounded-[2.5rem]">
              <motion.div className="absolute inset-[-10%]" style={{ y: bigY }}>
                <Image
                  src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1400&q=75"
                  alt="Plant-filled dining room set for dinner"
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              style={{ y: smallY }}
              className="absolute -bottom-10 -right-2 w-[44%] overflow-hidden rounded-3xl border-[6px] border-ivory shadow-lift sm:-right-8"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=600&q=75"
                  alt="Chef plating dishes at the pass"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              style={{ rotate: badgeRotate }}
              className="absolute -left-3 -top-8 grid size-28 place-items-center rounded-full bg-ebony shadow-lift sm:-left-8 sm:size-32"
            >
              <BrandMark size={58} />
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                A barefoot-luxury table on the <em className="text-clay">Smiling Coast</em>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-taupe sm:text-lg">
                Maya&apos;s is a garden restaurant on the Senegambia Strip. Come for a long breakfast or lunch under the
                palms, sundowners at the lounge bar, or a celebration dinner.
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
              <Stat label="Doors open" value={formatTime12(site.hours.open).replace(" ", "")} />
              <Stat label="Dishes & drinks" count={dishes.length} />
              <Stat label="Seating spaces" count={3} />
              <Stat label="Days a week" count={7 - site.hours.closedDays.length} />
            </dl>
          </div>
        </div>

        <div className="mt-24 grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <div className="group h-full rounded-3xl bg-sand p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-full bg-clay-soft text-clay transition-colors duration-500 group-hover:bg-clay group-hover:text-white">
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
  const highlight = /wonjo|baobab|fire|catch|Gambia/i.test(children);
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
