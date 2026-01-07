import { Link } from "react-router";
import { useCartTotal } from "../store/cartTotalStore";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useCreateOrder } from "../hooks/useOrder";
import ProceedToPayment from "../components/Payment";

export default function CheckoutPage() {
  const { data: cart } = useCart()
  const { cartTotal, deliveryAmount, calculateCartTotal } = useCartTotal((state) => state)
  const { isPending, isError, error, data:user } = useUser()
  const order = useCreateOrder()
  useEffect(() => {
    if (cart !== undefined) {
      calculateCartTotal(cart)
    }
  }, [cart])

  const orderTotal = (cartTotal + deliveryAmount).toFixed(2)

  if (isPending) {
    return <div>Loading...</div>
  }
  const handleClick = () => {
    order.mutate()
  }
  if(order.isSuccess){
    return <ProceedToPayment />
  }
  return (
    <section className="grid place-items-center h-screen ">
      <div
        className="mt-10  border  text-gray-100 mr-20 w-lg px-5 py-10"
      >
        <div className="flex justify-between">
          <h2 className=" tracking-wide text-gray font-bold">Address:</h2>
          <Link to="/profile" className="text-yellow-400 cursor-pointer hover:underline">
            change
          </Link>
        </div>

        <div className="text-sm tracking-wide py-2">
          <span className="block mb-1 p-1">{user.streetAddress}</span>
          <span className="block mb-1 p-1">{user.suburb}</span>
          <span className="block mb-1 p-1">{user.city}</span>
          <span className="block p-1">{user.postalCode}</span>
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <h2 className="font-bold">Payment Method:</h2>
          {/* <button
              type="button"
              className="text-yellow-400 cursor-pointer hover:underline"
              onClick={handleClick}
            >
           change
            </button> */}
        </div>
        <p>Card</p>
        <div className="flex justify-between font-extrabold text-yellow-400 border-t-1 border-white mt-5 pt-3">
          <span> Total Payment</span> <span>R{orderTotal}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="py-1.5">Discount</span>
          <span className="font-bold">R0.00</span>
        </div>
        <button
          onClick={handleClick}
          className=" block text-center bg-yellow-400 w-full mt-6 text-gray-950 py-2 rounded-sm font-semibold track"
        >
          Place Order
        </button>

      </div>
    </section>
  );
}

