"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useUI } from "@/store/ui";

export function Toaster() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  const openCart = useUI((s) => s.openCart);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:top-24 sm:items-end"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-ink/95 p-2.5 pr-3 text-sand shadow-lift ring-1 ring-white/10 backdrop-blur-md"
            role="status"
          >
            {t.image ? (
              <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-ink/40">
                  <Check size={18} className="text-white" />
                </span>
              </span>
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-clay">
                <Check size={18} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.title}</p>
              {t.description && <p className="truncate text-xs text-sand/60">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => {
                dismiss(t.id);
                openCart();
              }}
              className="shrink-0 rounded-full bg-clay px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-clay-dark"
            >
              View
            </button>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="grid size-7 shrink-0 place-items-center rounded-full text-sand/50 hover:bg-white/10 hover:text-sand"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
