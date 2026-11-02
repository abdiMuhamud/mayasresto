"use client";

import { create } from "zustand";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

interface UIState {
  cartOpen: boolean;
  reservationOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  openReservation: () => void;
  closeReservation: () => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;

export const useUI = create<UIState>()((set, get) => ({
  cartOpen: false,
  reservationOpen: false,
  toasts: [],
  openCart: () => set({ cartOpen: true, reservationOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  openReservation: () => set({ reservationOpen: true, cartOpen: false }),
  closeReservation: () => set({ reservationOpen: false }),
  pushToast: (toast) => {
    const id = ++toastId;
    // One toast at a time: a newer add replaces the previous message.
    set({ toasts: [{ ...toast, id }] });
    setTimeout(() => get().dismissToast(id), 2800);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
