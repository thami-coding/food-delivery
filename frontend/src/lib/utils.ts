import type { z } from "zod"
import { ErrorSchema } from "../types/product"

export class ApiError extends Error {
  statusCode?: number
  fields?: Record<string, string>
  constructor(
    message: string,
    statusCode?: number,
    fields?: Record<string, string>,
  ) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
    this.fields = fields
  }
}

export function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown): T {
  const res = schema.safeParse(data)
  if (!res.success) {
    console.error("Schema mismatch", res.error, data) //TODO:remove log
    throw new ApiError("Unexpected server response.")
  }
  return res.data
}

export function throwApiErrorFromAxios(error: unknown): never {
  if (error.response) {
    const statusCode = error.response?.status
    const data = error.response?.data
    const fields = data?.fields
    const message = data?.message

    const parsed = ErrorSchema.safeParse(data)
    if (parsed.success) {
      throw new ApiError(message, statusCode, fields)
    }

    if (error.request) {
      throw new ApiError(
        "Oops! Something went wrong on our end. Please try again in a moment",
        500,
      )
    }

    throw new ApiError("Request failed. Please try again.", statusCode)
  }

  throw error
}
