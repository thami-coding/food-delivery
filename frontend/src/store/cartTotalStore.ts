import { create } from "zustand";

interface cartTotalState {
 cartTotal: number,
 deliveryAmount: number,
 calculateCartTotal: (cart) => void
}

export const useCartTotal = create<cartTotalState>()((set) => ({
 cartTotal: 0,
 deliveryAmount: 20,
 calculateCartTotal: (cart) => set((state) => ({
  cartTotal: cart.reduce((acc: number, item) => {
   acc += item.price * item.quantity;
   return acc;
  }, 0)
 })),
}))