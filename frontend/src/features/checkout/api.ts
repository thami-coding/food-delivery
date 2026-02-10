import { AxiosInstance } from "../../app/axios"
import type { DateRange } from "./types"

type Params = {
  page: number
  limit: number
  filters?: { dateRange: DateRange; status: string }
}

export const fetchOrders = async (params: Params) => {
  const { page, limit, filters } = params
  let queryFilters = ""
  console.log(filters)

  queryFilters += filters?.dateRange ? `&dateRange=${filters.dateRange}` : ""
  queryFilters += filters?.status ? `&status=${filters.status}` : ""

  const { data } = await AxiosInstance.get(
    `/orders?page=${page}&limit=${limit}${queryFilters}`,
  )

  return data
}

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

export async function updateOrder(payload: { id: string; status: string }) {
  await AxiosInstance.patch(`/orders`, payload)
}

export const fetchPendingOrdertotal = async () => {
  const { data } = await AxiosInstance.get("/orders/pending")
  return data.pendingTotal
}
