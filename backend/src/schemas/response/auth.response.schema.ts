import { z } from "zod"

export const LoginResponseSchema = z.object({
  status: z.literal("success"),
  accessToken: z.string(),
})
