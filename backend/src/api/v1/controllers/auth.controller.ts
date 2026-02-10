import { Request, Response } from "express"
import * as authService from "../services/auth.service"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { refreshTokenRepository } from "../../../repositories/repos"
import { randomUUID } from "crypto"
import { AuthPayload } from "../../../types/common.types"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/auth.utils"

export const login = async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body)

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // CHange to true for production
    sameSite: "lax", //TODO: Change to strict for production
  })

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // CHange to true for production
    sameSite: "lax", //TODO: Change to strict for production
  })

  res.status(StatusCodes.OK).json({ status: "success", user })
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshRepo = refreshTokenRepository()
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token" })
    return
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    ) as AuthPayload

    const storedToken = await refreshRepo.findOne({
      where: { id: decoded.tokenId },
    })

    if (!storedToken || storedToken.revoked) {
      await refreshRepo.update(decoded.userId, { revoked: true })
      res.status(403).json({ message: "Refresh token reuse detected" })
      return
    }

    const isValid = await bcrypt.compare(refreshToken, storedToken.hashedToken)

    if (!isValid) {
      res.status(403).json({ message: "Invalid refresh tokens" })
      return
    }

    await refreshRepo.update(decoded.tokenId, { revoked: true })

    const newTokenId = randomUUID()

    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      role: decoded.role,
      tokenId: newTokenId,
    })

    await refreshRepo.save({
      id: newTokenId,
      userId: decoded.userId,
      hashedToken: await bcrypt.hash(newRefreshToken, 10),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    })

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // CHange to true for production
      sameSite: "lax", //TODO: Change to strict for production
    })

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // CHange to true for production
      sameSite: "lax", //TODO: Change to strict for production
    })

    res.clearCookie("accessToken")
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false, // CHange to true for production
      sameSite: "lax", //TODO: Change to strict for production
    })

    res.json({ status: "sucess", message: "token refreshed" })
    return
  } catch (err) {
    console.log(err)

    res.status(403).json({ message: "Invalid refresh token" })
  }
}

export const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body)
  res.status(StatusCodes.CREATED).json({ status: "success", user })
}

export const resetPassword = async (req: Request, res: Response) => {
  await authService.resetPasword(req.body)
  res.status(StatusCodes.NO_CONTENT).json(null)
}

export const forgotPassword = async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email)
  res.status(StatusCodes.NO_CONTENT).json(null)
}

export const logout = async (req: Request, res: Response) => {
  const refreshRepo = refreshTokenRepository()
  const refreshToken = req.cookies.refreshToken

  if (refreshToken) {
    const decoded = jwt.decode(refreshToken) as { tokenId: string }
    await refreshRepo.update(decoded.tokenId, { revoked: true })
  }

  res.clearCookie("refreshToken")
  res.clearCookie("accessToken")
  res.status(StatusCodes.NO_CONTENT).json(null)
}
