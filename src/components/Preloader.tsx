"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { useUI } from "@/store/ui";
import { LeafSprig, Logo } from "./Brand";
import { RotatingBadge } from "./icons";

const SEEN_KEY = "mayas-intro";
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * First-visit intro on the logo's navy: the real logo spins in inside a turning
 * "Breakfast · Lunch · Dinner" ring, leaves grow in, the tagline rises and a counter
 * runs to 100 before the curtain lifts. Skipped on repeat visits in the same session
 * (see the inline script in layout.tsx) and for reduced motion.
 */
export function Preloader() {
  const setIntroDone = useUI((s) => s.setIntroDone);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const barWidth = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen || reduce) {
      setPhase("gone");
      setIntroDone();
      return;
    }
    const controls = animate(progress, 100, { duration: 2.2, ease: [0.65, 0, 0.35, 1] });
    controls.then(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("leaving");
      setTimeout(setIntroDone, 350);
      setTimeout(() => setPhase("gone"), 1200);
    });
    return () => controls.stop();
  }, [progress, reduce, setIntroDone]);

  if (phase === "gone") return null;

  const words = ["When", "different", "cuisines", "meet"];

  return (
    <motion.div
      className="intro-loader fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-deep text-sand"
      initial={false}
      animate={phase === "leaving" ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-soft/60 blur-3xl" />

      <motion.div
        className="absolute -left-8 top-[18%] w-56 sm:w-80"
        initial={{ opacity: 0, x: -60, rotate: -12 }}
        animate={{ opacity: 0.9, x: 0, rotate: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <LeafSprig />
      </motion.div>
      <motion.div
        className="absolute -right-8 bottom-[20%] w-56 sm:w-80"
        initial={{ opacity: 0, x: 60, rotate: 12 }}
        animate={{ opacity: 0.9, x: 0, rotate: 0 }}
        transition={{ duration: 1.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <LeafSprig flip />
      </motion.div>

      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotate: -270 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-apricot"
      >
        <RotatingBadge size={210} text="Breakfast ✦ Lunch ✦ Dinner ✦ ">
          <Logo size={128} ring={false} priority />
        </RotatingBadge>
      </motion.div>

      <p className="relative mt-8 flex flex-wrap justify-center gap-x-[0.3em] overflow-hidden px-6 font-serif text-3xl italic text-sand sm:text-5xl">
        {words.map((w, i) => (
          <span key={w} className="inline-block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </p>

      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between text-sand/50 sm:inset-x-10 sm:bottom-10">
        <p className="text-[10px] uppercase tracking-[0.3em]">{site.address.line2}</p>
        <motion.p className="font-serif text-5xl tabular-nums text-apricot sm:text-7xl">{counter}</motion.p>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-sage via-apricot to-sage" style={{ width: barWidth }} />
    </motion.div>
  );
}
