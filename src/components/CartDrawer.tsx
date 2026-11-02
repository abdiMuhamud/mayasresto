"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { site } from "@/lib/config";
import { formatGMD, formatTime12 } from "@/lib/format";
import { useHydrated, useOverlay } from "@/lib/hooks";
import { toMinutes } from "@/lib/hours";
import { buildOrderMessage, openWhatsApp, type OrderType } from "@/lib/whatsapp";
import { knownSubtotal, selectLines, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { WhatsAppIcon } from "./icons";

const orderTypes: OrderType[] = ["Takeaway", "Dine-in pre-order"];

const pickupSlots = (() => {
  const out: string[] = [];
  for (let t = toMinutes(site.hours.open) + 30; t <= toMinutes(site.hours.close) - 30; t += 15) {
    out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return out;
})();

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const close = useUI((s) => s.closeCart);
  const panelRef = useOverlay(open, close);
  const titleId = useId();
  const hydrated = useHydrated();

  const items = useCart((s) => s.items);
  const { increment, decrement, remove, clear } = useCart.getState();
  const lines = useMemo(() => (hydrated ? selectLines(items) : []), [items, hydrated]);

  const [orderType, setOrderType] = useState<OrderType>("Takeaway");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [nameError, setNameError] = useState(false);

  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = knownSubtotal(lines);

  const sendOrder = () => {
    if (name.trim().length < 2) {
      setNameError(true);
      document.getElementById("order-name")?.focus();
      return;
    }
    openWhatsApp(
      buildOrderMessage({
        name,
        orderType,
        time,
        notes,
        lines: lines.map((l) => ({ name: l.name, quantity: l.quantity, unitPrice: l.unitPrice })),
      }),
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-ebony/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 36 }}
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-sand shadow-lift outline-none sm:rounded-l-[2rem]"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-ink/5 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-clay">Your order</p>
                <h2 id={titleId} className="font-serif text-3xl font-medium text-ink">
                  {lines.length ? "Ready to send" : "Your bag is empty"}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close order"
                className="grid size-11 place-items-center rounded-full bg-ivory text-ink transition hover:bg-ink/10"
              >
                <X size={19} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-ivory text-brass">
                  <ShoppingBag size={32} strokeWidth={1.5} />
                </span>
                <p className="mt-6 font-serif text-2xl text-ink">Nothing here yet</p>
                <p className="mt-2 max-w-xs text-sm text-taupe">
                  Browse the menu and tap “Add to Order” on anything that tempts you.
                </p>
                <a
                  href="#menu"
                  onClick={close}
                  className="mt-7 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
                >
                  Explore the menu
                </a>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {lines.map((l) => (
                        <motion.li
                          key={l.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                          className="flex gap-3 rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-ink/[0.04]"
                        >
                          <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-t-full rounded-b-xl bg-navy">
                            {l.image ? (
                              <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
                            ) : (
                              <Image src="/brand/logo.webp" alt="" width={56} height={56} className="rounded-full" />
                            )}
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-serif text-lg font-semibold leading-tight text-ink">{l.name}</p>
                              <button
                                type="button"
                                onClick={() => remove(l.id)}
                                aria-label={`Remove ${l.name}`}
                                className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-full text-taupe/70 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center rounded-full bg-ivory p-1">
                                <button
                                  type="button"
                                  onClick={() => decrement(l.id)}
                                  aria-label={`One less ${l.name}`}
                                  className="grid size-8 place-items-center rounded-full text-ink transition hover:bg-white"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-7 text-center text-sm font-bold tabular-nums" aria-live="polite">
                                  {l.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increment(l.id)}
                                  aria-label={`One more ${l.name}`}
                                  className="grid size-8 place-items-center rounded-full text-ink transition hover:bg-white"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              {l.unitPrice !== undefined && (
                                <p className="text-sm font-bold text-ink tabular-nums">{formatGMD(l.unitPrice * l.quantity)}</p>
                              )}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 text-xs font-semibold text-taupe underline-offset-4 hover:text-red-600 hover:underline"
                  >
                    Clear order
                  </button>

                  {/* Order details */}
                  <div className="mt-6 space-y-4 rounded-2xl bg-ivory p-4">
                    <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 gap-1 rounded-full bg-sand p-1">
                      {orderTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={orderType === t}
                          onClick={() => setOrderType(t)}
                          className={`rounded-full px-3 py-2.5 text-xs font-semibold transition sm:text-sm ${
                            orderType === t ? "bg-ink text-sand shadow-soft" : "text-taupe hover:text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-3">
                        <label htmlFor="order-name" className="mb-1.5 block text-xs font-semibold text-taupe">
                          Your name
                        </label>
                        <input
                          id="order-name"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setNameError(false);
                          }}
                          aria-invalid={nameError}
                          placeholder="Name for the order"
                          className={`h-11 w-full rounded-xl bg-white px-3 text-sm outline-none ring-1 transition focus:ring-2 ${
                            nameError ? "ring-red-400 focus:ring-red-500" : "ring-ink/10 focus:ring-clay"
                          }`}
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="order-time" className="mb-1.5 block text-xs font-semibold text-taupe">
                          {orderType === "Takeaway" ? "Pickup" : "Arrival"}
                        </label>
                        <select
                          id="order-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="h-11 w-full rounded-xl bg-white px-2 text-sm outline-none ring-1 ring-ink/10 transition focus:ring-2 focus:ring-clay"
                        >
                          <option value="">ASAP</option>
                          {pickupSlots.map((s) => (
                            <option key={s} value={s}>
                              {formatTime12(s)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {nameError && (
                      <p role="alert" className="-mt-2 text-xs font-medium text-red-700">
                        Please add a name so we know whose order it is.
                      </p>
                    )}
                    <div>
                      <label htmlFor="order-notes" className="mb-1.5 block text-xs font-semibold text-taupe">
                        Notes <span className="font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="order-notes"
                        rows={2}
                        maxLength={300}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="No chilli, extra flatbread…"
                        className="w-full resize-none rounded-xl bg-white px-3 py-2.5 text-sm outline-none ring-1 ring-ink/10 transition focus:ring-2 focus:ring-clay"
                      />
                    </div>
                  </div>
                </div>

                <footer className="shrink-0 border-t border-ink/5 bg-sand px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-taupe">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                    {subtotal !== null && (
                      <span className="font-serif text-2xl font-semibold text-ink tabular-nums">{formatGMD(subtotal)}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-taupe">
                    We&apos;ll confirm prices, the total and timing when we reply on WhatsApp. Pay on pickup or at your table.
                  </p>
                  <button
                    type="button"
                    onClick={sendOrder}
                    className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp text-base font-semibold text-white shadow-soft transition hover:brightness-110 active:scale-[0.99]"
                  >
                    <WhatsAppIcon size={20} /> Send Order via WhatsApp
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
