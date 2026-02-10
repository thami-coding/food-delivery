import type { z } from "zod"
import log from "loglevel"
import { HttpError } from "./HttpError"
import { isAxiosError } from "axios"
import { ErrorWithFieldsSchema, ErrorWithMessageSchema } from "./error.schema"

export function validateOrThrow<T>(schema: z.ZodType<T>, data: unknown): T {
  const response = schema.safeParse(data)

  if (!response.success) {
    console.warn("Schema mismatch", response.error, data) //TODO:remove log
    throw new HttpError("Unexpected server response.")
  }
  return response.data
}

export function throwHttpErrorFromAxios(error: unknown): never {
  if (isAxiosError(error)) {
    const statusCode = error.response?.status
    const data = error.response?.data
    const fields = data?.fields
    const message = data?.message ?? error.response?.statusText
    let parsed = null

    if (fields) {
      parsed = ErrorWithFieldsSchema.safeParse(data)
    } else {
      parsed = ErrorWithMessageSchema.safeParse({ status: "error", message })
    }

    if (!parsed.success) {
      log.warn("Schema mismatch", parsed.error, data) //TODO:remove log
      throw new HttpError("Unexpected server response.", 500)
    }

    throw new HttpError(message, statusCode, fields)
  }

  throw new HttpError(
    "Oops! Something went wrong on our end. Please try again in a moment",
    500,
  )
}
