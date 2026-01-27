import { z } from "zod/v4"

export const ErrorWithFieldsSchema = z.object({
  status: z.literal("error"),
  fields: z.record(z.string(), z.string()),
})

export const ErrorWithMessageSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
})

export const ErrorSchema = z.union([ErrorWithMessageSchema, ErrorWithFieldsSchema])

