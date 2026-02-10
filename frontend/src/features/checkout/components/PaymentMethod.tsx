import {type Dispatch, type SetStateAction} from "react"

type PaymentMethodPropd = {
  paymentMethod: string
  setPaymentMethod: Dispatch<SetStateAction<string>>
}
export default function PaymentMethod({
  setPaymentMethod,
  paymentMethod,
}: PaymentMethodPropd) {
  return (
    <div className="flex justify-between mb-2 mt-6">
      <div>
        <p className="font-bold">Payment Method</p>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full bg-[#202020] border border-gray-700 text-white px-4 py-2.5 rounded-lg mt-3"
        >
          <option value="" disabled>
            Payment Method
          </option>
          <option value="online">online</option>
          <option value="card">card</option>
          <option value="cash">cash</option>
        </select>
      </div>
    </div>
  )
}
