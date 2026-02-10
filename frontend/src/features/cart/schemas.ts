import { z } from "zod"
import { ErrorWithMessageSchema } from "../../lib/errors/error.schema"
import { ProductSchema } from "../products/schemas"

export const CartSchemaDetailed = z.object({
  id: z.uuidv4(),
  product: ProductSchema,
  quantity: z.number(),
})

export const CartSchema = z.object({
  productId: z.uuidv4(),
  quantity: z.number(),
})

const CartDetailedSuccessSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartSchemaDetailed),
})
const CartSuccessSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartSchema),
})

export const CartDetailedResponseSchema = z.discriminatedUnion("status", [
  CartDetailedSuccessSchema,
  ErrorWithMessageSchema,
])

export const CartResponseSchema = z.discriminatedUnion("status", [
  CartSuccessSchema,
  ErrorWithMessageSchema,
])
