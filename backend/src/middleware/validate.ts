import { Request, Response, NextFunction } from "express"
import { ZodType, ZodError, z } from "zod"
import { ValidationError } from "../errors/AppError"

const formatZodError = (error: ZodError) => {
  const errors: Record<string, string> = {}

  for (const issue of error.issues) {
    const field = issue.path.at(-1)?.toString() ?? "unknown"
    errors[field] = issue.message
  }

  return errors
}

export const validate =
  (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(formatZodError(error))
      }
      throw error
    }
  }
