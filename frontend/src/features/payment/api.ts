import { AxiosInstance } from "../../app/axios"
import { fromCents } from "../../lib/formatCurrency"



export const generateSignature = async (order) => {
  const payload = {
    totalAmount: fromCents(order.totalAmount),
    name: order.user.fullName,
    orderId: order.id,
    email: order.user.email,
  }

  const { data } = await AxiosInstance.post("/payment/signature", payload)

  return data.signature
}

