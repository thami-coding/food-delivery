import { z } from "zod"
import { ErrorWithFieldsSchema } from "../../lib/errors/error.schema"

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

export const ResetPasswordSchema = z
  .object({
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

export const LoginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long."),
})

export const SuccessSchema = z.object({
  status: z.literal("success"),
  user: z.object({
    id: z.uuidv4(),
    email: z.email(),
    role: z.enum(["user", "admin"]),
  }),
})

export const AuthResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorWithFieldsSchema,
])
