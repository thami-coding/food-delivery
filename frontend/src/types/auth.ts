import { z } from "zod/v4";


export const LoginSchema = z.object({
 email: z.email("Invalid email"),
 password: z.string().min(8, "Password must be at least 8 characters")
});

export const SignUpSchema = z.object({
 email: z.email("Invalid email"),
 password: z.string("Password is required").min(8, "Password must be at least 8 characters"),
 confirmPassword: z.string("Confirm password is requires").min(8, "Password must be at least 8 characters")
});

export const ResetPasswordSchema = {
 newPassword: z.string().min(8, "Password must be at least 8 characters"),
 token: z.string()
}

export type TLoginPayload = z.infer<typeof LoginSchema>
export type TSignUpPayload = z.infer<typeof SignUpSchema>
export type TResetPasswordPayload = z.infer<typeof ResetPasswordSchema>