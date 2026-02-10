import z from "zod"

export const OrderSchema = z.object({
  status: z.string().nonempty(),
})
