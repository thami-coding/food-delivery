import { formatCurrency } from "../../../lib/formatCurrency"

export default function CartTotal({ cartTotal }: { cartTotal: number }) {
  return (
    <div className="sticky bottom-0 flex justify-between px-4 py-2 bg-linear-to-br from-black to-[#3b3b3b]">
      <span className="font-bold tracking-wider text-[1.2rem]">Total</span>
      <span className="font-bold tracking-wider text-[1.2rem]">
        {formatCurrency(cartTotal)}
      </span>
    </div>
  )
}
