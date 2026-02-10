import { z } from "zod"

export const SignupResponseSchema = z.object({
  status: z.literal("success"),
  user: z.object({
    id: z.uuidv4(),
    email: z.email(),
    role: z.enum(["admin", "user"]),
  }),
})
