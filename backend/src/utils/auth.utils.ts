import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { AuthPayload } from "../types/common.types"
import { logger } from "./logger"

export const hashPassword = async (password: string) => {
  const encryptedString = await bcrypt.hash(password, 8)
  return encryptedString
}

export const authorize =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      logger.warn("You are Unauthorized to access this route")
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are Unauthorized to access this route" })
      return
    }
    next()
  }

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken
  if (!accessToken) {
    logger.warn("access token is required")
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "token is required",
      user: null,
    })
    return
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as AuthPayload
    
    const { userId, role, tokenId } = decoded
    req.user = { id: userId, role, tokenId }
    next()
  } catch (error) {
    logger.warn("Invalid or expired token")
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "Invalid or expired token",
      user: null,
    })
  }
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "30m",
  })
}

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "1d",
  })
}
