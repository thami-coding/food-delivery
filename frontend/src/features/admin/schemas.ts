import { z } from "zod"

const categories = [
  "pizzas",
  "wings",
  "burgers",
  "desserts",
  "combos",
  "ribs",
] as const
export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  category: z.enum(categories, {
    message: "Select a category",
  }),
  price: z.string(),
  imageFile: z
    .instanceof(File, { message: "Product image is required" })
    .nullish(),
})

export type ProductFormData = z.infer<typeof productSchema>
