"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useUI } from "@/store/ui";
import { BrandMark } from "./icons";

const SEEN_KEY = "mayas-intro";
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * First-visit intro: the sun mark spins up, the name rises letter by letter while a
 * counter runs to 100, then the curtain lifts onto the hero. Skipped on repeat visits
 * in the same session (see the inline script in layout.tsx) and for reduced motion.
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
    const controls = animate(progress, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1] });
    controls.then(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("leaving");
      // Let the hero start its entrance while the curtain is still lifting.
      setTimeout(setIntroDone, 350);
      setTimeout(() => setPhase("gone"), 1200);
    });
    return () => controls.stop();
  }, [progress, reduce, setIntroDone]);

  if (phase === "gone") return null;

  const name = "Maya's";

  return (
    <motion.div
      className="intro-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ebony text-sand"
      initial={false}
      animate={phase === "leaving" ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden
    >
      <div aria-hidden className="absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/15 blur-3xl" />

      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotate: -120 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandMark size={84} />
      </motion.div>

      <h2 className="mt-7 flex overflow-hidden font-serif text-6xl font-medium tracking-tight sm:text-8xl">
        {name.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </h2>
      <motion.p
        className="mt-3 text-[11px] font-semibold uppercase tracking-[0.5em] text-gold"
        initial={{ opacity: 0, letterSpacing: "0.9em" }}
        animate={{ opacity: 1, letterSpacing: "0.5em" }}
        transition={{ duration: 1.4, delay: 0.7 }}
      >
        Resto · Kololi
      </motion.p>

      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between text-sand/50 sm:inset-x-10 sm:bottom-10">
        <p className="text-[10px] uppercase tracking-[0.3em]">Senegambia Strip · The Gambia</p>
        <motion.p className="font-serif text-5xl tabular-nums text-sand sm:text-7xl">{counter}</motion.p>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-clay via-gold to-clay"
        style={{ width: barWidth }}
      />
    </motion.div>
  );
}
