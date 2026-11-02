"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categories, featured, type Dish } from "@/lib/menu";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { LeafSprig } from "./Brand";

const categoryLabel = new Map(categories.map((c) => [c.id, c.label]));

/**
 * "From our kitchen": real dishes from the restaurant. On large screens the section
 * pins and vertical scrolling drives a horizontal gallery; on small screens it is a
 * native swipeable strip.
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
      id="kitchen"
      aria-labelledby="kitchen-title"
      className="relative overflow-x-clip bg-navy-deep text-sand"
      style={pinned && height ? { height } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20 sm:py-24"}>
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 size-[36rem] rounded-full bg-navy-soft/70 blur-3xl" />

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={`relative flex items-stretch gap-5 px-4 sm:gap-8 sm:px-6 lg:w-max lg:px-[6vw] ${
            pinned ? "" : "no-scrollbar snap-x snap-mandatory scroll-px-4 overflow-x-auto sm:scroll-px-6"
          }`}
        >
          <div className="relative flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[32vw] lg:pr-10">
            <div aria-hidden className="mb-6 w-40 opacity-90">
              <LeafSprig />
            </div>
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-apricot">
              <span className="h-px w-8 bg-current" /> From our kitchen
            </p>
            <h2 id="kitchen-title" className="font-serif text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
              Plates our <em className="text-apricot">guests</em> come back for
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-sand/60">
              Straight from the Maya&apos;s kitchen. Add any of them to your order from here.
            </p>
            <p className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-sand/40 lg:flex">
              Keep scrolling
              <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowRight size={16} />
              </motion.span>
            </p>
          </div>

          {featured.map((dish, i) => (
            <KitchenCard key={dish.id} dish={dish} index={i} />
          ))}
          <div aria-hidden className="w-1 shrink-0 lg:w-[4vw]" />
        </motion.div>

        {pinned && (
          <div className="absolute inset-x-[6vw] bottom-10 h-px bg-white/10">
            <motion.div className="h-full bg-gradient-to-r from-sage to-apricot" style={{ width: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}

function KitchenCard({ dish, index }: { dish: Dish & { image: string }; index: number }) {
  const add = useCart((s) => s.add);
  const pushToast = useUI((s) => s.pushToast);

  const onAdd = () => {
    add(dish.id);
    pushToast({ title: `${dish.name} added`, description: "Open your order to send it on WhatsApp.", image: dish.image });
  };

  return (
    <article className="group relative flex w-[78vw] shrink-0 snap-start flex-col sm:w-[46vw] lg:w-[25vw] xl:w-[23vw]">
      <div
        className="relative h-[58vh] max-h-[560px] min-h-[380px] overflow-hidden rounded-t-full rounded-b-[2rem] bg-navy ring-1 ring-white/10"
        data-cursor="Add"
        onClick={onAdd}
      >
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 25vw, 78vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-apricot">
            0{index + 1} · {categoryLabel.get(dish.category)}
          </p>
          <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight">{dish.name}</h3>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="line-clamp-2 text-sm leading-relaxed text-sand/70">{dish.description}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              aria-label={`Add ${dish.name} to order`}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-apricot text-navy-deep transition duration-500 hover:rotate-90 hover:bg-sand"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
