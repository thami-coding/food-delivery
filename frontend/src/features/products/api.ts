import { AxiosInstance } from "../../app/axios"
import { ProductsResponseSchema } from "./schemas"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"

export async function fetchProducts(params: {
  page: number
  limit: number
  category?: string
}) {
  const { page, limit = 10, category } = params
  try {
    const { data } = await AxiosInstance.get(
      `/products?page=${page}&limit=${limit}&category=${category}`,
      { skipAuth: true },
    )

    const parsed = validateOrThrow(ProductsResponseSchema, data)
    return parsed
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}
