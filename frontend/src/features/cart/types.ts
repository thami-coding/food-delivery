import type z from "zod"
import type { CartSchema, CartSchemaDetailed } from "./schemas"

export type CartItem = z.infer<typeof CartSchema>
export type DetailedCart = z.infer<typeof CartSchemaDetailed>
export type UpdateQuantity = {
  quantity: number
  productId: string
}