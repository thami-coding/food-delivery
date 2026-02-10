import { z } from "zod"
import { ProductSchema } from "../validation/product.validation.schema"

const CartSchema = z.object({
  quantity: z.number(),
  product: ProductSchema.shape.body,
})

export const CartResponseSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartSchema),
})
