"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Camera, Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { formatGMD } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { categories, dishes, tagMeta, type CategoryId, type Dish } from "@/lib/menu";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { site } from "@/lib/config";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { Reveal, SectionEyebrow } from "./Reveal";

const menuRequest = `Hello ${site.name}! Could you share today's menu and prices, please?`;

export function MenuSection() {
  const [active, setActive] = useState<CategoryId>("breakfast");
  const tabsRef = useRef<HTMLDivElement>(null);
  const category = categories.find((c) => c.id === active)!;
  const items = useMemo(() => dishes.filter((d) => d.category === active), [active]);

  // Floating photo preview that follows the mouse over dishes with a real photo.
  const [preview, setPreview] = useState<Dish | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.6 });
  const py = useSpring(my, { stiffness: 260, damping: 26, mass: 0.6 });

  const select = (id: CategoryId, el: HTMLButtonElement) => {
    setActive(id);
    setPreview(null);
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

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
    <section
      id="menu"
      className="grain relative bg-ivory py-24 sm:py-32"
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onPointerLeave={() => setPreview(null)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>The Menu</SectionEyebrow>
          <h2 className="font-serif text-5xl font-medium leading-[1] tracking-tight text-ink sm:text-7xl">
            A little of <em className="text-clay">everywhere</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-taupe sm:text-lg">
            Highlights from our kitchen, from breakfast to dessert. Add what you fancy and send the order to us on
            WhatsApp; we&apos;ll confirm prices and timing in the chat.
          </p>
        </Reveal>

        <div className="sticky top-[var(--header-offset,4rem)] z-20 -mx-4 mt-14 bg-ivory/90 px-4 py-3 backdrop-blur-md transition-[top] duration-500 sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
            className="no-scrollbar mx-auto flex w-max max-w-full gap-1 overflow-x-auto rounded-full bg-sand p-1.5 shadow-soft ring-1 ring-ink/5"
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
                    selected ? "text-apricot" : "text-taupe hover:text-ink"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-tab-pill"
                      className="absolute inset-0 rounded-full bg-navy shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] bg-sand p-6 shadow-soft ring-1 ring-ink/5 sm:p-10 lg:p-14"
            >
              <div className="mb-10 flex flex-col gap-2 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-serif text-4xl italic text-ink sm:text-5xl">{category.label}</h3>
                <p className="max-w-sm text-sm text-taupe sm:text-right">{category.blurb}</p>
              </div>
              <ul className="grid gap-x-16 gap-y-2 lg:grid-cols-2">
                {items.map((dish, i) => (
                  <motion.li
                    key={dish.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse" || !dish.image) return;
                      // Start the preview at the pointer instead of flying in from the corner.
                      px.jump(e.clientX);
                      py.jump(e.clientY);
                      setPreview(dish);
                    }}
                    onPointerLeave={() => setPreview(null)}
                  >
                    <MenuItem dish={dish} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-taupe">
            The full menu changes with the season. Tell us about any allergies when you order.
          </p>
          <a
            href={whatsappUrl(menuRequest)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-sand transition hover:bg-navy-soft"
          >
            <WhatsAppIcon size={16} className="text-[#4ade80]" /> Ask for today&apos;s menu
          </a>
        </div>
      </div>

      {/* Cursor-following photo preview (desktop) */}
      <AnimatePresence>
        {preview?.image && (
          <motion.div
            key={preview.id}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="relative ml-8 -mt-40 h-72 w-56 overflow-hidden rounded-t-full rounded-b-3xl shadow-lift ring-4 ring-sand">
              <Image src={preview.image} alt="" fill sizes="224px" className="object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MenuItem({ dish }: { dish: Dish }) {
  const hydrated = useHydrated();
  const qty = useCart((s) => s.items[dish.id] ?? 0);
  const add = useCart((s) => s.add);
  const decrement = useCart((s) => s.decrement);
  const pushToast = useUI((s) => s.pushToast);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = hydrated && qty > 0;

  const handleAdd = () => {
    add(dish.id);
    pushToast({ title: `${dish.name} added`, description: "Open your order to send it on WhatsApp.", image: dish.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <div className="group flex gap-4 border-b border-dashed border-ink/10 py-6">
      {dish.image && (
        <span className="relative size-16 shrink-0 overflow-hidden rounded-t-full rounded-b-xl ring-1 ring-ink/10 lg:hidden">
          <Image src={dish.image} alt="" fill sizes="64px" className="object-cover" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-serif text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-clay sm:text-[1.7rem]">
            {dish.name}
          </h4>
          {dish.image && (
            <Camera size={14} aria-label="Photo available" className="hidden shrink-0 text-taupe/60 lg:block" />
          )}
          <span aria-hidden className="mb-1.5 hidden flex-1 border-b border-dotted border-ink/25 sm:block" />
          {dish.price !== undefined && (
            <span className="shrink-0 text-sm font-bold text-ink">{formatGMD(dish.price)}</span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-taupe">{dish.description}</p>
        {dish.tags.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Dietary information">
            {dish.tags.map((t) => (
              <li key={t} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${tagMeta[t].className}`}>
                {tagMeta[t].label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex shrink-0 items-start gap-1.5 pt-1">
        {inCart && (
          <>
            <button
              type="button"
              onClick={() => decrement(dish.id)}
              aria-label={`One less ${dish.name}`}
              className="hidden size-10 place-items-center rounded-full bg-ivory text-ink transition hover:bg-ink/10 sm:grid"
            >
              <Minus size={15} />
            </button>
            <span className="hidden h-10 min-w-6 place-items-center text-sm font-bold tabular-nums text-ink sm:grid">{qty}</span>
          </>
        )}
        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          aria-label={`Add ${dish.name} to order`}
          className={`relative grid size-10 place-items-center rounded-full transition-colors duration-300 ${
            justAdded ? "bg-sage-deep text-white" : "bg-navy text-apricot hover:bg-apricot hover:text-navy-deep"
          }`}
        >
          {justAdded ? <Check size={16} /> : <Plus size={16} className="transition-transform duration-500 group-hover:rotate-90" />}
          {inCart && (
            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-apricot px-1 text-[11px] font-bold leading-5 text-navy-deep ring-2 ring-sand sm:hidden">
              {qty}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
