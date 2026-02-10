import { z } from "zod"

export const CartSchema = z.object({
  body: z.object({
    productId: z.uuidv4("Invalid product ID"),
    quantity: z
      .number("Quantity is required")
      .int()
      .positive("Quantity must be greater than 0"),
  }),
})
