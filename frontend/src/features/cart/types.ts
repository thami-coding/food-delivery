import type z from "zod"
import type { CartItemSchema, CartSchemaDetailed } from "./schemas"

export type CartItem = z.infer<typeof CartItemSchema>
export type DetailedCart = z.infer<typeof CartSchemaDetailed>
export type UpdateQuantity = {
  quantity: number
  productId: string
}