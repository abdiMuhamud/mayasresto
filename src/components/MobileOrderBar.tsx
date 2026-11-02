"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatGMD } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { selectCount, selectLines, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

/** Floating "view order" bar on small screens once something is in the bag. */
export function MobileOrderBar() {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const cartOpen = useUI((s) => s.cartOpen);
  const reservationOpen = useUI((s) => s.reservationOpen);
  const openCart = useUI((s) => s.openCart);

  const count = selectCount(items);
  const subtotal = selectLines(items).reduce((s, l) => s + l.lineTotal, 0);
  const visible = hydrated && count > 0 && !cartOpen && !reservationOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex h-14 w-full items-center justify-between rounded-full bg-ink pl-2 pr-6 text-sand shadow-lift ring-1 ring-white/10"
          >
            <span className="flex items-center gap-3">
              <span className="relative grid size-10 place-items-center rounded-full bg-clay">
                <ShoppingBag size={18} />
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold leading-5 text-ink">
                  {count}
                </span>
              </span>
              <span className="text-sm font-semibold">View order</span>
            </span>
            <span className="font-serif text-xl font-semibold tabular-nums">{formatGMD(subtotal)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
