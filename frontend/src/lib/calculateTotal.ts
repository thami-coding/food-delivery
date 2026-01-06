
export const calculateCartTotal = (cart):number => {
  const cartTotal = cart.reduce((acc: number, item) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);
  return cartTotal;
};

export const calculateTotalItems = (cart) => {
  const totalItemsInCart = cart.reduce((acc: number, item) => {
    acc += item.quantity ;
    return acc;
  }, 0);

  return totalItemsInCart;
};
