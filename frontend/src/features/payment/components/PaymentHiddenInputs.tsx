import type { Order } from "../../admin/schemas"

interface PaymentHiddenInputsProps {
  order: Order
  signature: string
  totalAmount: string
}

export default function PaymentHiddenInputs({
  order,
  signature,
  totalAmount,
}: PaymentHiddenInputsProps) {
  const merchantId = import.meta.env.VITE_PAYFAST_MERCHATN_ID //remove
  const merchantKey = import.meta.env.VITE_PAYFAST_MERCHATN_KEY // remove

  return (
    <>
      <input type="hidden" name="merchant_id" value={merchantId} />
      <input type="hidden" name="merchant_key" value={merchantKey} />
      <input
        type="hidden"
        name="return_url"
        value="https://food-delivery-ydng-peach.vercel.app/order-status"
      />
      <input
        type="hidden"
        name="notify_url"
        value="https://food-delivery-backend-xi-ten.vercel.app/api/payment/complete"
      />
      <input type="hidden" name="name_first" value={order.user.fullName!} />
      <input type="hidden" name="email_address" value={order.user.email} />
      <input type="hidden" name="m_payment_id" value={order.id} />
      <input type="hidden" name="amount" value={totalAmount} />
      {/* Change food item value */}
      <input type="hidden" name="item_name" value="food" /> 
      <input type="hidden" name="signature" value={signature} />
    </>
  )
}
