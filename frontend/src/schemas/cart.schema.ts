import { z } from "zod"
import { ErrorWithMessageSchema } from "./error.schema"

export const CartSchema = z.object({
  productId: z.uuidv4(),
  name: z.string(),
  price: z.string(),
  imageUrl: z.url(),
  quantity: z.number(),
})

const SuccessSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartSchema),
})

export const CartResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorWithMessageSchema,
])

export const CartAddSchema = z.object({
  id: z.uuidv4(),
  productId: z.uuidv4(),
  quantity: z.number(),
  userId: z.uuidv4(),
})

export const SuccessCartAddSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartAddSchema),
})

export const CartAddSchemaResponse = z.discriminatedUnion("status", [
  SuccessCartAddSchema,
  ErrorWithMessageSchema,
])



export const CartUpdateSchema = z.object({
  id: z.uuidv4(),
  productId: z.uuidv4(),
  quantity: z.number(),
  userId: z.uuidv4(),
})

export const SuccessUpdateSchema = z.object({
  status: z.literal("success"),
  cart: z.array(CartUpdateSchema),
})

export const CartUpdateResponseSchema = z.discriminatedUnion("status", [
  SuccessUpdateSchema,
  ErrorWithMessageSchema,
])
