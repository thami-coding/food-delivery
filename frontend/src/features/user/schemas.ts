import { z } from "zod"

export const UserSchema = z.object({
  id: z.uuidv4(),
  fullName: z.string().nullish(),
  role: z.enum(["admin", "user"]),
  email: z.email(),
  phoneNumber: z.string().nullish(),
  streetAddress: z.string().nullish(),
  city: z.string().nullish(),
  suburb: z.string().nullish(),
  postalCode: z.string().nullish(),
})

export const SuccessSchema = z.object({
  status: z.literal("success"),
  user: UserSchema.nullish(),
})

export const UserResponseSchema = z.object({
  status: z.literal("success"),
  user: UserSchema,
})

export const UserUpdateSchema = UserSchema.omit({ role: true }).partial()

