import { z } from "zod"
import { ErrorWithFieldsSchema } from "./error.schema"

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.string().nullish(),
  category: z.enum([
    "all",
    "burgers",
    "pizzas",
    "desserts",
    "wings",
    "combos",
    "ribs",
  ]),
  description: z.string().nullish(),
  price: z.string(),
  imageUrl: z.url(),
})
export const SuccessSchema = z.object({
  status: z.literal("success"),
  product: ProductSchema,
})

export const ProductResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorWithFieldsSchema,
])
