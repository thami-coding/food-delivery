import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"
import { StatusCodes } from "http-status-codes"
import { logger } from "../utils/logger"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  })

  if (err instanceof AppError) {
    console.log(err)

    res.status(err.statusCode).json({
      status: "error",
      fields: err.fields,
    })
    return
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Internal server error",
  })
}
