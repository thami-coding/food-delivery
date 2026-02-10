import type z from "zod"
import type { LoginSchema, ResetPasswordSchema, SignupSchema } from "./schemas"

export type SignupData = z.infer<typeof SignupSchema>
export type LoginData = z.infer<typeof LoginSchema>
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>
