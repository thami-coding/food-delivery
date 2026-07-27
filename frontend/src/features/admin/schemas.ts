import { z } from "zod"
import { ProductSchema } from "../products/schemas"
import { UserSchema } from "../user/schemas"

const categories = [
  "all",
  "pizzas",
  "wings",
  "burgers",
  "desserts",
  "combos",
  "ribs",
] as const

export const productSchema = z.object({
  id: z.string().optional(),
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

export const filters = z
  .object({
    dateRange: z.string().optional(),
    status: z.string().optional(),
  })
  .optional()

export const querySchema = z.object({
  page: z.number(),
  limit: z.number(),
  filters: filters,
})

export const productDbSchema = productSchema.omit({ imageFile: true }).extend({
  imageUrl: z.url("Invalid image URL"),
})

export const paginatedProducts = z.object({
  pageParams: z.array(z.number()),
  pages: z.array(
    z.object({
      status: z.string(),
      products: z.array(productDbSchema),
      page: z.number(),
      totalPages: z.number(),
      totalProducts: z.number(),
    }),
  ),
})

export const orderItemsSchema = z.array(
  z.object({
    id: z.uuidv4(),
    product: ProductSchema,
    productId: z.uuidv4(),
    quantity: z.number(),
  }),
)

export const orderSchema = z.object({
  items: orderItemsSchema,
  createdAt: z.string(), // TODO: change to timestamp
  id: z.uuidv4(),
  paymentMethod: z.enum(["cash", "card", "online"]),
  paymentStatus: z.enum(["paid", "pending"]),
  status: z.enum(["preparing", "done", "delivery"]),
  totalAmount: z.string(),
  user: UserSchema,
})

export const paginatedOrdersSchema = z.object({
  pageParams: z.array(z.number()),
  pages: z.array(
    z.object({
      status: z.string(),
      orders: z.array(orderSchema),
      page: z.number(),
      totalPages: z.number(),
      totalProducts: z.number(),
    }),
  ),
})

export const paginatedTotalOrdersSchema = z.object({
  limit: z.number(),
  orders: z.array(orderSchema),
  page: z.number(),
  totalOrders: z.number(),
  totalPages: z.number(),
  totalPendingOrders: z.number(),
})

export type Product = z.infer<typeof productSchema>
export type ProductDb = z.infer<typeof productDbSchema>
export type Queries = z.infer<typeof querySchema>
export type PaginatedProducts = z.infer<typeof paginatedProducts>
export type PaginatedOrders = z.infer<typeof paginatedOrdersSchema>
export type Filters = z.infer<typeof filters>
export type OrderItems = z.infer<typeof orderItemsSchema>
export type Order = z.infer<typeof orderSchema>
