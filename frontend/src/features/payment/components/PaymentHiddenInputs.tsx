export default function PaymentHiddenInputs({ order, signature, totalAmount }) {
  const merchantId = import.meta.env.VITE_PAYFAST_MERCHATN_ID
  const merchantKey = import.meta.env.VITE_PAYFAST_MERCHATN_KEY

  return (
    <>
      <input type="hidden" name="merchant_id" value={merchantId} />
      <input type="hidden" name="merchant_key" value={merchantKey} />
      <input
        type="hidden"
        name="return_url"
        value="https://2d9507fde928.ngrok-free.app/order/status"
      />
      <input
        type="hidden"
        name="notify_url"
        value="https://89362e9053a8.ngrok-free.app/api/payment/complete"
      />
      <input type="hidden" name="name_first" value={order.user.fullName} />
      <input type="hidden" name="email_address" value={order.user.email} />
      <input type="hidden" name="m_payment_id" value={order.id} />
      <input type="hidden" name="amount" value={totalAmount} />
      <input type="hidden" name="item_name" value="food" />
      <input type="hidden" name="signature" value={signature} />
    </>
  )
}
