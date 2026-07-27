import { z } from "zod"

import { ProductSchema } from "../products/schemas"

export const CartSchemaDetailed = z.object({
  id: z.uuidv4(),
  product: ProductSchema,
  quantity: z.number(),
})

export const CartItemSchema = z.object({
  productId: z.uuidv4(),
  quantity: z.number(),
})

export const CartDetailedResponseSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartSchemaDetailed),
})
export const CartResponseSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartItemSchema),
})



