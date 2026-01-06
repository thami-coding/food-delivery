import { Link } from "react-router";
import { useCartTotal } from "../store/cartTotalStore";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

export default function CheckoutPage() {
  const { data: cart } = useCart()
  const { cartTotal, deliveryAmount, calculateCartTotal } = useCartTotal((state) => state)
  const { isPending, isError, error, data } = useUser()

  useEffect(() => {
    if (cart !== undefined) {
      calculateCartTotal(cart)
    }
  }, [cart])

  const orderTotal = (cartTotal + deliveryAmount).toFixed(2)

  if (isPending) {
    return <div>Loading...</div>
  }
  return (
    <section className="grid place-items-center h-screen">
      <div
        className="mt-10  border  text-gray-100 mr-20 w-lg p-3"
      >
        <div className="flex justify-between">
          <h2 className=" tracking-wide text-gray font-bold">Address:</h2>
          <Link to="/profile/edit" className="text-yellow-400 cursor-pointer hover:underline">
            change
          </Link>
        </div>

        <div className="text-sm tracking-wide py-2">
          <span className="block mb-1 p-1">{data.streetAddress}</span>
          <span className="block mb-1 p-1">{data.suburb}</span>
          <span className="block mb-1 p-1">{data.city}</span>
          <span className="block p-1">{data.postalCode}</span>
        </div>
        <form
          className="mt-6"
          action="https://sandbox.payfast.co.za/eng/process"
          method="post"
        >
          <input type="hidden" name="merchant_id" value="10040258" />
          <input type="hidden" name="merchant_key" value="cer0bf24g7wfr" />
          <input type="hidden" name="amount" value={orderTotal} />
          <input type="hidden" name="item_name" value="Test Product" />
          <input type="hidden" name="return_url" value="https://www.example.com/"></input>

          <div className="flex justify-between">
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
          {/* <div className="flex justify-between border-t-1 mt-6 pt-5">
            <span>Order Amount</span> <span className="font-bold">R{orderTotal}</span>
          </div> */}
          <div className="flex justify-between border-t-1 mt-5 pt-2.5">
            <span className="py-1.5">Discount</span>
            <span className="font-bold">R0.00</span>
          </div>
          <div className="flex justify-between font-extrabold text-yellow-400">
            <span> Total Payment</span> <span>R{orderTotal}</span>
          </div>
          <button
            type="submit"
            className=" block text-center bg-yellow-400 w-full mt-6 text-gray-950 py-2 rounded-sm font-semibold track"
          >
            Proceed to Payment
          </button>
        </form>

      </div>
    </section>
  );
}

