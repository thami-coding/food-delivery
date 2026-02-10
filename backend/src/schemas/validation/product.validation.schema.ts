import { z } from "zod"

export const ProductSchema = z.object({
  body: z.object({
    id: z.string().optional(),
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
    imageUrl: z.url().nullish(),
  }),
})
