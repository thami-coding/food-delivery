import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";

import { TiShoppingCart } from "react-icons/ti";
import { calculateCartTotal } from "../lib/calculateTotal";
import { useGlobalState } from "../hooks/useGlobalState";
import { deleteCartItem, updateQuantity } from "../lib/apiClient";
import { useEffect, useState } from "react";

const Cart = () => {
  // const { data:cart, isPending, error } = useCart()
  const { state, dispatch } = useGlobalState();
  const { cart } = state;
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId && state.cart.length !== 0) {
      updateQuantity(state, productId);
    }
  }, [productId, state]);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-60 border-yellow-50 ">
        <h2 className="text-4xl text-zinc-500">Your Cart Is Empty</h2>
        <TiShoppingCart
          size={90}
          className="text-zinc-500 mr-auto ml-auto mt-2"
        />
      </div>
    );
  }

  const handleDecrease = async (productId: string) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: productId,
    });
    setProductId(productId);
  };

  const cartTotal = calculateCartTotal(cart);
  return (
    <section className="flex justify-center mt-30 max-w-[1359px]">
      <div className="  text-white mr-10 overflow-y-auto w-[500px] h-[440px] rounded-md ">
        <h2 className="text-2xl font-bold pl-5 fixed top-20">Cart Items</h2>
        {cart.map((cartItem) => {
          const { name, price, productId, imageUrl } = cartItem;

          const { quantity } = state.cart.find(
            (item) => item.productId === productId
          )!;
          return (
            <div key={productId} className="p-5  hover:bg-gray-600 rounded-sm">
              <div className="border-b-1 grid grid-cols-3 w-fit pb-3">
                <div className="h-27 border rounded-md border-transparent overflow-hidden bg-gradient-to-br from-black/20 to-[#3b3b3b]">
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full object-contain w-[144px]"
                  />
                </div>
                <div className="flex px-2 flex-col justify-between">
                  <h2>{name}</h2>
                  <p className="text-xs">Size: Small</p>
                  <div className=" rounded-4xl py-1 px-0.5 flex justify-between w-fit">
                    <button
                      className="text-2xl cursor-pointer"
                      disabled={quantity === 1}
                      onClick={() => {
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: productId,
                        });
                        setProductId(productId);
                      }}
                    >
                      <CiCircleMinus />
                    </button>
                    <span className="px-2">{quantity}</span>
                    <button
                      className="text-2xl cursor-pointer"
                      onClick={() => handleDecrease(productId)}
                    >
                      <CiCirclePlus />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: productId,
                      });
                      deleteCartItem(productId);
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                  <p className="">R{(price * quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="sticky bottom-0 flex justify-between px-4 py-2 bg-gradient-to-br from-black to-[#3b3b3b]">
          <span className="font-bold tracking-wider text-[1.2rem]">Total</span>
          <span className="font-bold tracking-wider text-[1.2rem]">R0.00</span>
        </div>
      </div>
      <aside className="border border-white h-min p-4 ml-20  min-w-90 ">
        <h2 className="uppercase mb-3 text-yellow-400 font-bold">
          Order Summary
        </h2>
        <div className="text-sm flex justify-between mb-1.5">
          <span className="text-white/50">SUBTOTAL</span>{" "}
          <span className="text-white font-bold">R{cartTotal.toFixed(2)}</span>
        </div>
        <div className="text-sm flex justify-between mb-1.5">
          <span className="text-white/50">DELIVERY</span>{" "}
          <span className="text-white tracking-wider font-bold">R20.00</span>
        </div>
        <div className="text-sm flex justify-between">
          <span className="text-white/50">TOTAL</span>{" "}
          <span className="text-white font-bold">
            R{cartTotal === 0 ? 0 : (cartTotal + 20).toFixed(2)}
          </span>
        </div>
        <Link
          to="/checkout"
          className="bg-yellow-400 w-full block text-center mt-6 p-2 "
        >
          Proceed to Checkout
        </Link>
      </aside>
    </section>
  );
};

export default Cart;
