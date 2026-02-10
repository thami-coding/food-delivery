import { z } from "zod"
import { ProductSchema } from "../validation/product.validation.schema"

export const ProductsResponseSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema.shape.body),
  page: z.number(),
  totalPages: z.number(),
  totalProducts: z.number(),
})

export const ProductResponseSchema = z.object({
  status: z.literal("success"),
  product: ProductSchema.shape.body,
})
