import { z } from "zod"

export const LoginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long.")
})