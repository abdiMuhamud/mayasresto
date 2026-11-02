"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { site } from "@/lib/config";
import { categories, dishes, type CategoryId } from "@/lib/menu";
import { DishCard } from "./DishCard";
import { Reveal, SectionEyebrow } from "./Reveal";

export function MenuSection() {
  const [active, setActive] = useState<CategoryId>("bowls");
  const tabsRef = useRef<HTMLDivElement>(null);
  const category = categories.find((c) => c.id === active)!;
  const items = useMemo(() => dishes.filter((d) => d.category === active), [active]);

  const select = (id: CategoryId, el: HTMLButtonElement) => {
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = categories.findIndex((c) => c.id === active);
    const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length;
    const btn = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next];
    if (btn) {
      btn.focus();
      select(categories[next].id, btn);
    }
  };

  return (
    <section id="menu" className="grain relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>The Menu</SectionEyebrow>
          <h2 className="font-serif text-5xl font-medium leading-[1] tracking-tight text-ink sm:text-7xl">
            From garden, fire <em className="text-clay">&amp;</em> sea
          </h2>
          <p className="mt-5 text-base leading-relaxed text-taupe sm:text-lg">
            Add your favourites and send the order straight to our kitchen on WhatsApp — for takeaway or ready when you
            sit down.
          </p>
        </Reveal>

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="sticky top-[var(--header-offset,4rem)] z-20 -mx-4 mt-14 bg-sand/90 px-4 py-3 backdrop-blur-md transition-[top] duration-500 sm:mx-0 sm:rounded-full sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
            className="no-scrollbar mx-auto flex w-max max-w-full gap-2 overflow-x-auto rounded-full bg-ivory p-1.5 shadow-soft ring-1 ring-ink/5"
          >
            {categories.map((c) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={(e) => select(c.id, e.currentTarget)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                    selected ? "text-white" : "text-taupe hover:text-ink"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-tab-pill"
                      className="absolute inset-0 rounded-full bg-ink shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span aria-hidden>{c.emoji}</span>
                    <span className="lg:hidden">{c.shortLabel}</span>
                    <span className="hidden lg:inline">{c.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex flex-col items-center gap-1 text-center">
                <h3 className="font-serif text-2xl italic text-ink sm:text-3xl">{category.label}</h3>
                <p className="max-w-xl text-sm text-taupe">{category.blurb}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:gap-7 xl:grid-cols-3">
                {items.map((dish, i) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DishCard dish={dish} priority={i < 2} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-center text-xs text-taupe">
          {site.pricing.vatNote} € prices are approximate. Please tell us about any allergies when ordering.
        </p>
      </div>
    </section>
  );
}
