import { AxiosInstance } from "../../app/axios"
import { fromCents } from "../../lib/formatCurrency"
import type { Order } from "../admin/schemas"

export const generateSignature = async (order:Order) => {
  
  const payload = {
    totalAmount: fromCents(order.totalAmount),
    name: order.user.fullName,
    orderId: order.id,
    email: order.user.email,
  }

  const { data } = await AxiosInstance.post("/payment/signature", payload)

  return data.signature
}

