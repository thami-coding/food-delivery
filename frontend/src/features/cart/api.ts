import { AxiosInstance } from "../../app/axios"
import { HttpError } from "../../lib/errors/HttpError"
import { CartDetailedResponseSchema, CartResponseSchema } from "./schemas"
import type { CartItem, UpdateQuantity } from "./types"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"

export async function addCartItem(cartItem: CartItem) {
  try {
    const { data } = await AxiosInstance.post("/cart", cartItem)
    const parsed = validateOrThrow(CartResponseSchema, data)

    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }

    return data.cart
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export async function fetchCurrentUsersCart() {
  try {
    const { data } = await AxiosInstance.get("/cart")
    const parsed = validateOrThrow(CartDetailedResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }

    return parsed.cart
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export async function deleteCartItem(productId: string) {
  await AxiosInstance.delete(`/cart/${productId}`)
}

export const updateCart = async (payload: UpdateQuantity) => {
  const { data } = await AxiosInstance.patch("/cart", payload)
  try {
    const parsed = validateOrThrow(CartResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }
    return data
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export const clearCart = async () => {
  const { data } = await AxiosInstance.delete("/cart")
  return data
}
