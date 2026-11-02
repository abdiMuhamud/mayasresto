"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatEUR, formatGMD } from "@/lib/format";
import { dishById, type Dish } from "@/lib/menu";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

const picks = ["asado-platter", "catch-of-the-day", "rainbow-quinoa", "wonjo-spritz", "gambas-ajillo"];
const signatures = picks.map((id) => dishById.get(id)).filter((d): d is Dish => !!d);

/**
 * "The Signatures": on large screens the section pins and vertical scrolling drives a
 * horizontal gallery. On touch/small screens it is a native swipeable strip.
 */
export function Signatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState<number | undefined>();
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, distance], ([p, d]: number[]) => -p * d);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const enable = mq.matches;
      setPinned(enable);
      if (!enable || !trackRef.current) {
        setHeight(undefined);
        distance.set(0);
        return;
      }
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <section
      ref={sectionRef}
      id="signatures"
      aria-labelledby="signatures-title"
      className="relative overflow-x-clip bg-ebony text-sand"
      style={pinned && height ? { height } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20 sm:py-24"}>
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 size-[36rem] rounded-full bg-clay/15 blur-3xl" />

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={`relative flex items-stretch gap-5 px-4 sm:gap-8 sm:px-6 lg:w-max lg:px-[6vw] ${
            pinned ? "" : "no-scrollbar snap-x snap-mandatory scroll-px-4 overflow-x-auto sm:scroll-px-6"
          }`}
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[34vw] lg:pr-10">
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
              <span className="h-px w-8 bg-current" /> The Signatures
            </p>
            <h2 id="signatures-title" className="font-serif text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
              Five plates that <em className="text-gold">define</em> Maya&apos;s
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-sand/60">
              The dishes our regulars order again and again. Add any of them to your order from here.
            </p>
            <p className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-sand/40 lg:flex">
              Keep scrolling
              <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowRight size={16} />
              </motion.span>
            </p>
          </div>

          {signatures.map((dish, i) => (
            <SignatureCard key={dish.id} dish={dish} index={i} />
          ))}
          <div aria-hidden className="w-1 shrink-0 lg:w-[4vw]" />
        </motion.div>

        {pinned && (
          <div className="absolute inset-x-[6vw] bottom-10 h-px bg-white/10">
            <motion.div className="h-full bg-gradient-to-r from-clay to-gold" style={{ width: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}

function SignatureCard({ dish, index }: { dish: Dish; index: number }) {
  const add = useCart((s) => s.add);
  const pushToast = useUI((s) => s.pushToast);

  const onAdd = () => {
    add(dish.id);
    pushToast({ title: `${dish.name} added`, description: "Open your order to send it on WhatsApp.", image: dish.image });
  };

  return (
    <article className="group relative flex w-[82vw] shrink-0 snap-start flex-col sm:w-[52vw] lg:w-[30vw] xl:w-[27vw]">
      <div
        className="relative h-[58vh] max-h-[620px] min-h-[380px] overflow-hidden rounded-[2rem] bg-ebony-soft"
        data-cursor="Add"
        onClick={onAdd}
      >
        <Image
          src={dish.image.replace("w=900", "w=1200")}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 30vw, 82vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/10 to-transparent" />
        <span className="absolute left-6 top-4 font-serif text-[5.5rem] leading-none text-outline">
          0{index + 1}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">{dish.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-sand/70">{dish.description}</p>
          <div className="mt-5 flex items-center justify-between">
            <p>
              <span className="text-lg font-bold text-gold">{formatGMD(dish.price)}</span>
              <span className="ml-2 text-xs text-sand/50">{formatEUR(dish.price)}</span>
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              aria-label={`Add ${dish.name} to order`}
              className="grid size-12 place-items-center rounded-full bg-clay text-white transition duration-500 hover:rotate-90 hover:bg-gold hover:text-ink"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
