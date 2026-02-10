import { z } from "zod"

export const UserSchema = z.object({
  body: z.object({
    fullName: z.string().nonempty("Please provide a valid name"),
    phoneNumber: z.string().length(10, "Please provide a valid phone number"),
    streetAddress: z.string().nonempty("Please provide a valid address"),
    city: z.string().nonempty("Please provide a valid city"),
    suburb: z.string().nonempty("Please provide a valid  suburb"),
    postalCode: z.string().nonempty("Please provide a valid postal code"),
  }),
})
