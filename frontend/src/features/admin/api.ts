import { AxiosInstance } from "../../app/axios"
import { throwHttpErrorFromAxios, validateOrThrow } from "../../lib/errors/error.utils"
import { HttpError } from "../../lib/errors/HttpError"
import { ProductResponseSchema } from "../products/schemas"

export async function fetchProduct(productId: string) {
  try {
    const { data } = await AxiosInstance.get(`/products/${productId}`, {
      skipAuth: true,
    })
    const parsed = validateOrThrow(ProductResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }
    return parsed.product
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export async function updateProduct(payload) {
  try {
    const { data } = await AxiosInstance.put(`/products/${payload.id}`, payload)
    const parsed = validateOrThrow(ProductResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }
    return null
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export const createProduct = async (product) => {
  const { data } = await AxiosInstance.post("/products", product)
  return data
}

export async function deleteProduct(productId: string) {
  const { data } = await AxiosInstance.delete(`/products/${productId}`)
  return data.product
}

export const fetchOrders = async (params) => {
  const { page, limit, filters } = params
  let queryFilters = ""

  queryFilters += filters?.dateRange ? `&dateRange=${filters.dateRange}` : ""
  queryFilters += filters?.status ? `&status=${filters.status}` : ""

  const { data } = await AxiosInstance.get(
    `/orders?page=${page}&limit=${limit}${queryFilters}`,
  )

  return data
}
export async function updateOrder(payload: { id: string; status: string }) {
  await AxiosInstance.patch(`/orders`, payload)
}