import { AxiosInstance } from "../../app/axios"
import { validateOrThrow } from "../../lib/errors/error.utils"
import { orderSchema } from "../admin/schemas"

export const fetchUserOrders = async () => {
  const { data } = await AxiosInstance.get("/orders/me")
  return data
}

export const fetchOrder = async () => {
  const { data } = await AxiosInstance.get("/orders/new")
 
  const order = validateOrThrow(orderSchema, data.order)
  return order
}

export const createOrder = async (paymentMethod: string) => {
  const { data } = await AxiosInstance.post("/orders", { paymentMethod })
  return data
}
