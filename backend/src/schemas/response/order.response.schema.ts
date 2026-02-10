import { z } from "zod"
import { UserSchema } from "../validation/user.schema"
import { ProductSchema } from "../validation/product.validation.schema"

export const ItemsSchema = z.object({
  id: z.uuidv4(),
  quantity: z.number(),
  product: ProductSchema.shape.body,
})

 const OrderSchema = z.object({
  user: UserSchema,
  items: z.array(ItemsSchema),
  totalAmount: z.number(),
  status: z.enum(["preparing", "done", "delivery"]),
  paymentMethod: z.enum(["online", "card", "cash"]),
  paymentStatus: z.enum(["pending", "paid"]),
})

export const OrdersResponseSchema = z.object({
  status: z.literal("success"),
  orders: z.array(OrderSchema),
  page: z.number(),
  limit: z.number(),
  totalOrders: z.number(),
  totalPages: z.number(),
  totalPendingOrders: z.number(),
})

export const OrderResponseSchema = z.object({
  status: z.literal("success"),
  order: OrderSchema,
})