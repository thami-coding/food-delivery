import { z } from "zod"

export const SignupSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string("Confirm Password is required")
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["password"],
  })
