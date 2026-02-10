import { AxiosInstance } from "../../app/axios"

export const fetchUserOrders = async () => {
  const { data } = await AxiosInstance.get("/orders/me")
  return data
}

export const fetchOrder = async () => {
  const { data } = await AxiosInstance.get("/orders/new")
  return data.order
}

export const createOrder = async (paymentMethod: string) => {
  const { data } = await AxiosInstance.post("/orders", { paymentMethod })
  return data
}
