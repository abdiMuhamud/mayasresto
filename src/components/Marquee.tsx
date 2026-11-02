"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Endless ticker that speeds up, reverses and leans with the scroll. */
function VelocityRow({ children, baseVelocity }: { children: React.ReactNode; baseVelocity: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex whitespace-nowrap" style={{ x, skewX: reduce ? 0 : skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const rowA = ["Wonjo Spritz", "Bife de Chorizo", "Tanji Catch", "Baobab Mojito", "Rainbow Quinoa", "Garlic Gambas"];
const rowB = ["Garden", "Fire", "Sea", "Smoke", "Citrus", "Spice", "Palm Shade"];

function Items({ words, outline }: { words: string[]; outline?: boolean }) {
  return (
    <>
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`px-6 font-serif italic sm:px-10 ${outline ? "text-outline-clay" : ""}`}>{w}</span>
          <span className="text-[0.45em] not-italic text-gold">✦</span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <section aria-label="House favourites" className="relative overflow-hidden border-y border-ink/5 bg-sand py-10 sm:py-14">
      <div className="text-5xl leading-[1.15] text-ink sm:text-7xl lg:text-8xl">
        <VelocityRow baseVelocity={-2.2}>
          <Items words={rowA} />
        </VelocityRow>
        <VelocityRow baseVelocity={2.2}>
          <Items words={rowB} outline />
        </VelocityRow>
      </div>
    </section>
  );
}
