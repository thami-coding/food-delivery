import { StatusCodes } from "http-status-codes"

export abstract class AppError extends Error {
  public readonly statusCode: number
  public readonly fields: Record<string, string>

  constructor(
    fields?: Record<string, string>,
    message?: string,
    statusCode?: number,
  ) {
    super(message)
    this.statusCode = statusCode
    this.fields = fields

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(fields: Record<string, string>, message = "Validation failed") {
    super(fields, message, StatusCodes.BAD_REQUEST)
  }
}

export class UnauthorizedError extends AppError {
  constructor(fields: Record<string, string>, message = "Unauthorized") {
    super(fields, message, StatusCodes.UNAUTHORIZED)
  }
}

export class NotFoundError extends AppError {
  constructor(fields: Record<string, string>, message = "Resource not found") {
    super(fields, message, StatusCodes.NOT_FOUND)
  }
}

export class ConflictError extends AppError {
  constructor(fields: Record<string, string>, message = "Conflict") {
    super(fields, message, StatusCodes.CONFLICT)
  }
}

export class BadRequestError extends AppError {
  constructor(fields: Record<string, string>, message = "Invalid Input data") {
    super(fields, message, StatusCodes.BAD_REQUEST)
  }
}
