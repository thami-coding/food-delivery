import { LoginSchema, SignupSchema } from "../features/auth/schemas"
import type { LoginData, SignupData } from "../features/auth/types"

export const validateSignupInputs = ({
  email,
  password,
  confirmPassword,
}: SignupData) => {
  const result = SignupSchema.safeParse({
    email,
    password,
    confirmPassword,
  })

  const fieldErrors: Record<string, string> = {}
  if (!result.success) {
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0] as string] = err.message
    })
  }
  return fieldErrors
}

export const validateLoginInputs = ({ email, password }: LoginData) => {
  const result = LoginSchema.safeParse({
    email,
    password,
  })

  const fieldErrors: Record<string, string> = {}
  if (!result.success) {
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0] as string] = err.message
    })
  }
  return fieldErrors
}
