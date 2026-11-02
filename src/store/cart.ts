"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { site } from "@/lib/config";
import { dishById } from "@/lib/menu";
import type { OrderType } from "@/lib/whatsapp";

/** dishId → quantity. Prices are always read from the menu, never stored. */
type Quantities = Record<string, number>;

interface CartState {
  items: Quantities;
  add: (dishId: string) => void;
  increment: (dishId: string) => void;
  decrement: (dishId: string) => void;
  remove: (dishId: string) => void;
  clear: () => void;
}

const MAX_QTY = 20;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      add: (id) =>
        set((s) => ({ items: { ...s.items, [id]: Math.min((s.items[id] ?? 0) + 1, MAX_QTY) } })),
      increment: (id) =>
        set((s) => ({ items: { ...s.items, [id]: Math.min((s.items[id] ?? 0) + 1, MAX_QTY) } })),
      decrement: (id) =>
        set((s) => {
          const next = (s.items[id] ?? 0) - 1;
          const items = { ...s.items };
          if (next <= 0) delete items[id];
          else items[id] = next;
          return { items };
        }),
      remove: (id) =>
        set((s) => {
          const items = { ...s.items };
          delete items[id];
          return { items };
        }),
      clear: () => set({ items: {} }),
    }),
    {
      name: "mayas-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Drop anything no longer on the menu.
      merge: (persisted, current) => {
        const saved = (persisted as Partial<CartState> | undefined)?.items ?? {};
        const items: Quantities = {};
        for (const [id, qty] of Object.entries(saved)) {
          if (dishById.has(id) && Number.isInteger(qty) && qty > 0) items[id] = Math.min(qty, MAX_QTY);
        }
        return { ...current, items };
      },
    },
  ),
);

export interface CartLine {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export function selectLines(items: Quantities): CartLine[] {
  return Object.entries(items).flatMap(([id, quantity]) => {
    const dish = dishById.get(id);
    if (!dish) return [];
    return [{ id, name: dish.name, image: dish.image, unitPrice: dish.price, quantity, lineTotal: dish.price * quantity }];
  });
}

export function selectCount(items: Quantities) {
  return Object.values(items).reduce((n, q) => n + q, 0);
}

export function computeTotals(lines: CartLine[], orderType: OrderType) {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const serviceCharge = Math.round(subtotal * site.pricing.serviceChargeRate);
  const packagingFee = orderType === "Takeaway" && subtotal > 0 ? site.pricing.takeawayPackagingFee : 0;
  return { subtotal, serviceCharge, packagingFee, total: subtotal + serviceCharge + packagingFee };
}
