import { z } from "zod"

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.string().nullable()
  , // TODO: nullable for now must make required
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

export const ProductResponseSchema = z.object({
  status: z.literal("success"),
  product: ProductSchema,
})


export const ProductsResponseSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
  page: z.number(),
  totalPages: z.number(),
  totalProducts: z.number(),
})
