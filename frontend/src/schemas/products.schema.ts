import { z } from "zod"
import { ErrorSchema, ProductSchema } from "../types/product"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.string(),
  category: z.enum([
    "all",
    "burgers",
    "pizzas",
    "desserts",
    "wings",
    "combos",
    "ribs",
  ]),
  description: z.string(),
  price: z.string(),
  imageUrl: z.url(),
})
export const SuccessSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
})
export const ProductsResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorSchema,
])

