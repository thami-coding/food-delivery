import { z } from "zod"

export const LoginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters"),
  }),
})

export const RegisterSchema = z.object({
  body: z
    .object({
      email: z.email("Invalid email address"),

      password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters"),

      confirmPassword: z
        .string("Confirm password is required")
        .min(8, "Confirm must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
})

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z.email("Please enter a valid email"),
  }),
})

export const ResetPasswordSchema = z.object({
  body: z
    .object({
      resetToken: z.string("reset token is required"),
      password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters"),

      confirmPassword: z
        .string("Confirm password is required")
        .min(8, "Confirm must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
})

export type RegisterBody = z.infer<typeof RegisterSchema>["body"]
