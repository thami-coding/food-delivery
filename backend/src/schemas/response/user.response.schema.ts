import { z } from "zod"

export const UserResponseSchema = z.object({
  status: z.literal("success"),
  user: z.object({
    id: z.uuidv4(),
    fullName: z.string().nullish(),
    email: z.email(),
    phoneNumber: z.string().nullish(),
    role: z.enum(["admin", "user"]),
    streetAddress: z.string().nullish(),
    city: z.string().nullish(),
    suburb: z.string().nullish(),
    postalCode: z.string().nullish(),
  }),
})
