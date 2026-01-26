import { z } from "zod"
import { ErrorSchema } from "../types/product"

export const AuthSchema = z.object({
  email: z.email(),
  id: z.uuidv4(),
  role: z.enum(["admin", "user"]),
})

export const SuccessSchema = z.object({
  status: z.literal("success"),
  user: AuthSchema,
})

export const AuthResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorSchema,
])

export type Auth = z.infer<typeof AuthSchema>
