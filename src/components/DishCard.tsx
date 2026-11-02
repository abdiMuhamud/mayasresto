"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatEUR, formatGMD } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { tagMeta, type Dish } from "@/lib/menu";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

const spring = { stiffness: 200, damping: 20, mass: 0.5 };

export function DishCard({ dish, priority = false }: { dish: Dish; priority?: boolean }) {
  const hydrated = useHydrated();
  const qty = useCart((s) => s.items[dish.id] ?? 0);
  const add = useCart((s) => s.add);
  const decrement = useCart((s) => s.decrement);
  const pushToast = useUI((s) => s.pushToast);
  const [justAdded, setJustAdded] = useState(false);

  // 3D tilt + glare that follows the mouse.
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.35), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 9);
    rx.set((0.5 - py) * 9);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const handleAdd = () => {
    add(dish.id);
    pushToast({ title: `${dish.name} added`, description: "Open your order to send it on WhatsApp.", image: dish.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const inCart = hydrated && qty > 0;

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="group relative flex h-full flex-col rounded-[1.75rem] bg-white p-3 shadow-soft ring-1 ring-ink/[0.04] transition-shadow duration-500 hover:shadow-lift"
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-ivory"
        initial={{ clipPath: "inset(12% 12% 12% 12% round 1.25rem)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.25rem)" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        data-cursor="Add"
        onClick={handleAdd}
      >
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ebony/50 to-transparent" />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />
        {inCart && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-sand backdrop-blur-md"
          >
            {qty} in order
          </motion.span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-sand/90 px-3 py-1.5 text-sm font-bold text-ink shadow-soft backdrop-blur-md">
          {formatGMD(dish.price)}
        </span>
      </motion.div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.65rem] font-semibold leading-tight text-ink">{dish.name}</h3>
          <p className="shrink-0 pt-1.5 text-xs text-taupe">{formatEUR(dish.price)}</p>
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Dietary information">
          {dish.tags.map((t) => (
            <li
              key={t}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${tagMeta[t].className}`}
            >
              <span aria-hidden>{tagMeta[t].emoji}</span>
              {tagMeta[t].label}
            </li>
          ))}
        </ul>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">{dish.description}</p>

        <div className="mt-5 flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            className={`group/btn relative inline-flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold transition-colors duration-300 ${
              justAdded ? "bg-ink text-sand" : "bg-clay text-white"
            }`}
          >
            {!justAdded && (
              <span className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-y-0" />
            )}
            <span className="relative flex items-center gap-2">
              {justAdded ? <Check size={17} /> : <Plus size={17} className="transition-transform duration-500 group-hover/btn:rotate-90" />}
              {justAdded ? "Added" : "Add to Order"}
            </span>
          </motion.button>
          {inCart && (
            <button
              type="button"
              onClick={() => decrement(dish.id)}
              aria-label={`Remove one ${dish.name}`}
              className="grid size-12 place-items-center rounded-full bg-ivory text-ink transition hover:bg-ink/10"
            >
              <Minus size={17} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
