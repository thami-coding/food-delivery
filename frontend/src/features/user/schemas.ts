import { z } from "zod"
import { ErrorWithFieldsSchema } from "../../lib/errors/error.schema"

export const UserSchema = z.object({
  id: z.uuidv4(),
  fullName: z.string().nullish(),
  email: z.email(),
  phoneNumber: z.string().nullish(),
  role: z.enum(["admin", "user"]).nullish(),
  streetAddress: z.string().nullish(),
  city: z.string().nullish(),
  suburb: z.string().nullish(),
  postalCode: z.string().nullish(),
})

export const SuccessSchema = z.object({
  status: z.literal("success"),
  user: UserSchema.nullish(),
})

export const UserResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorWithFieldsSchema,
])
