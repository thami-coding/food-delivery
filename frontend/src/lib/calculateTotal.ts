import type { TCart, } from "../types/cart";

export const calculateCartTotal = (cart: TCart[]):number => {
  const total = cart.reduce((acc: number, item: TCart) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);
  return total;
};

export const calculateTotalItems = (cart: TCart[]) => {
  const total = cart.reduce((acc: number, item: TCart) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return total;
};
