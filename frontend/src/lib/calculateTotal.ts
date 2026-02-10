import { toCents } from "./formatCurrency";

export const calculateCartTotal = (cart) => {
  const cartTotal: number = cart.reduce((sum: number, item) => {
    sum += toCents(Number(item.product.price)) * item.quantity;
    return sum;
  }, 0);
  return cartTotal
};

export const calculateItems = (cart) => {
  const totalItemsInCart = cart.reduce((sum: number, item) => {
    sum += item.quantity;
    return sum;
  }, 0);

  return totalItemsInCart;
};
