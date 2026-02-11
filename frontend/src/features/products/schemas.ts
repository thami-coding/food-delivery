import { z } from "zod"
import { ErrorWithFieldsSchema } from "../../lib/errors/error.schema"

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
  description: z.string(),
  price: z.string(),
  imageUrl: z.url(),
})

export const ProductSuccessSchema = z.object({
  status: z.literal("success"),
  product: ProductSchema,
})

export const ProductResponseSchema = z.discriminatedUnion("status", [
  ProductSuccessSchema,
  ErrorWithFieldsSchema,
])

const SuccessSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
  page: z.number(),
  totalPages: z.number(),
  totalProducts: z.number(),
})
export const ProductsResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorWithFieldsSchema,
])
