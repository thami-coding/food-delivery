import { z } from "zod/v4"
import { ErrorSchema } from "./product"


export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  role: z.enum(["admin", "user"]),
  streetAddress: z.string(),
  city: z.string(),
  suburb: z.string(),
  postalCode: z.string(),
})

export const UserSuccessSchema = z.object({
  status: z.literal("success"),
  user: UserSchema,
})

export const ApiUserResponseSchema = z.discriminatedUnion("status", [
  UserSuccessSchema,
  ErrorSchema,
])

export const UserLoginSchema = z.object({
  status: z.literal("success"),
  user: z.object({
    id: z.string(),
    role: z.enum(["admin", "user"]),
  }),
})
export const LoginResponseSchema = z.discriminatedUnion("status", [
  UserLoginSchema,
  ErrorSchema,
])

export type TUser = z.infer<typeof UserSchema>
