"use client";

import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatEUR, formatGMD } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { tagMeta, type Dish } from "@/lib/menu";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

export function DishCard({ dish, priority = false }: { dish: Dish; priority?: boolean }) {
  const hydrated = useHydrated();
  const qty = useCart((s) => s.items[dish.id] ?? 0);
  const add = useCart((s) => s.add);
  const decrement = useCart((s) => s.decrement);
  const pushToast = useUI((s) => s.pushToast);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(dish.id);
    pushToast({ title: `${dish.name} added`, description: "Ready when you are — open your order to send it.", image: dish.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const inCart = hydrated && qty > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-soft ring-1 ring-ink/[0.04] transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ebony/40 to-transparent" />
        {inCart && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-sand backdrop-blur-md">
            {qty} in order
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.55rem] font-semibold leading-tight text-ink">{dish.name}</h3>
          <div className="shrink-0 text-right">
            <p className="text-base font-bold text-clay">{formatGMD(dish.price)}</p>
            <p className="text-xs text-taupe">{formatEUR(dish.price)}</p>
          </div>
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
            className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
              justAdded ? "bg-ink text-sand" : "bg-clay text-white hover:bg-clay-dark"
            }`}
          >
            {justAdded ? <Check size={17} /> : <Plus size={17} />}
            {justAdded ? "Added" : "Add to Order"}
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
    </article>
  );
}
