import { AxiosInstance } from "../../app/axios"
import { ProductResponseSchema } from "../products/schemas"
import {  paginatedTotalOrdersSchema, type ProductDb, type Queries } from "./schemas"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"

export async function fetchProduct(productId: string) {
  try {
    const { data } = await AxiosInstance.get(`/products/${productId}`, {
      skipAuth: true,
    })
    const parsed = validateOrThrow(ProductResponseSchema, data)
    return parsed.product
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export async function updateProduct(payload: ProductDb) {
  try {
    const { data } = await AxiosInstance.put(`/products/${payload.id}`, payload)
    validateOrThrow(ProductResponseSchema, data)
    return null
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export const createProduct = async (product: ProductDb) => {
  const { data } = await AxiosInstance.post("/products", product)
  return data
}

export async function deleteProduct(productId: string) {
  const { data } = await AxiosInstance.delete(`/products/${productId}`)
  return data.product
}

export const fetchOrders = async (params: Queries) => {
  const { page, limit, filters } = params
  let queryFilters = ""

  queryFilters += filters?.dateRange ? `&dateRange=${filters.dateRange}` : ""
  queryFilters += filters?.status ? `&status=${filters.status}` : ""

  const { data } = await AxiosInstance.get(
    `/orders?page=${page}&limit=${limit}${queryFilters}`,
  )
  
  const parsed = validateOrThrow(paginatedTotalOrdersSchema, data)
  return parsed
}
export async function updateOrder(payload: { id: string; status: string }) {
  await AxiosInstance.patch(`/orders`, payload)
}
