import { z } from "zod"
import { ErrorSchema } from "../types/product"

export const userSchema = z.object({
  id: z.uuidv4(),
  fullName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  role: z.enum(["admin", "user"]),
  streetAddress: z.string(),
  city: z.string(),
  suburb: z.string(),
  postalCode: z.string(),
})

export const SuccessSchema = z.object({
  status: z.literal("success"),
  user: userSchema,
})

export const UserResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorSchema,
])


export type TAuth = z.infer<typeof userSchema>