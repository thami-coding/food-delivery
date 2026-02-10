import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { AuthPayload } from "../types/common.types"

export const hashPassword = async (password: string) => {
  const encryptedString = await bcrypt.hash(password, 8)
  return encryptedString
}

export const authorize =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
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
      process.env.ACCESS_TOKEN_SECRET,
    ) as AuthPayload
    
    const { userId, role, tokenId } = decoded
    req.user = { id: userId, role, tokenId }
    next()
  } catch (error) {
    // console.log(error)
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
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  })
}

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
}
