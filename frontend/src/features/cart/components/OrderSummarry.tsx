import { Link } from "react-router"
import { formatCurrency, toCents } from "../../../lib/formatCurrency"

type OrderSummarryProps = { cartTotal: number }
export default function OrderSummarry({ cartTotal }: OrderSummarryProps) {
  const deliveryPrice = toCents(20)
  
  return (
    <div className="border border-white p-4 w-[95vw] max-w-114">
      <h2 className="uppercase mb-3 text-yellow-400 font-bold">
        Order Summary
      </h2>
      <div className="text-sm flex justify-between mb-1.5">
        <span className="text-white/50">SUBTOTAL</span>
        <span className="text-white font-bold">
          {formatCurrency(cartTotal)}
        </span>
      </div>
      <div className="text-sm flex justify-between mb-1.5">
        <span className="text-white/50">DELIVERY</span>
        <span className="text-white tracking-wider font-bold">
          {formatCurrency(deliveryPrice)}
        </span>
      </div>
      <div className="text-sm flex justify-between">
        <span className="text-white/50">TOTAL</span>{" "}
        <span data-testid="cart-total" className="text-white font-bold">
          {formatCurrency(cartTotal + deliveryPrice)}
        </span>
      </div>
      <Link
        to="/checkout"
        className="bg-yellow-400 w-full block text-center mt-6 p-2 "
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
