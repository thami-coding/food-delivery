import { LoginSchema } from "../schemas/login.schema"
import { SignupSchema } from "../schemas/signup.schema"

export const validateSignupInputs = ({ email, password, confirmPassword }) => {
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

export const validateLoginInputs = ({ email, password }) => {
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
