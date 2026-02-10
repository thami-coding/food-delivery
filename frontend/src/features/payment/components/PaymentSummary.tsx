import { formatCurrency } from "../../../lib/formatCurrency"

export default function PaymentSummary({ order, delivery }) {
  return (
    <div className="w-full max-w-lg min-w-md rounded-2xl shadow-xl border border-zinc-800 p-8 space-y-6 bg-neutral-800">
      <h2 className="text-2xl font-semibold text-center text-white">
        Proceed to Payment
      </h2>
      <div className="rounded-lg bg-[#484646c6] p-4 space-y-2 text-sm text-white">
        <div className="flex justify-between">
          <span>Items ({order.items.length})</span>
          <span>{formatCurrency(order.totalAmount - delivery)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>{formatCurrency(delivery)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-medium">
          <span>Total</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>
      <div className="flex items-start gap-3 text-sm text-zinc-600">
        <div>
          <p className="font-medium text-white">Delivering to</p>
          <p className="text-zinc-300">{order.user.streetAddress}</p>
        </div>
      </div>
      <button
        type="submit"
        className=" cursor-pointer w-full rounded-lg bg-yellow-300 text-neutral-800 py-3 font-medium hover:bg-yellow-400 transition"
      >
        Pay Now
      </button>
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
        <span>100% secure payment</span>
      </div>
      <p className="text-xs text-center text-zinc-400">
        By continuing, you agree to our{" "}
        <span className="underline cursor-pointer">Terms & Refund Policy</span>
      </p>
    </div>
  )
}
