import request from "supertest"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { UserRole } from "../../../src/types/common.types"
import { app } from "../../../src/server"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../src/utils/auth.utils"
import {
  refreshTokenRepository,
  userRepository,
} from "../../../src/repositories/repos"

export const signup = async ({ email, password }) => {
  return request(app).post("/api/v1/auth/register").send({
    email,
    password,
    confirmPassword: password,
  })
}

export const login = async ({ email, password }) => {
  return request(app).post("/api/v1/auth/login").send({
    email,
    password,
  })
}

export const logout = async (data) => {
  const { accessToken, refreshToken } = data
  return request(app)
    .post("/api/v1/auth/logout")
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send()
}

export const hashPasswordSync = (password: string) => {
  return bcrypt.hashSync(password, 8)
}

export const seedUser = async ({ email, password }) => {
  return userRepository().save({
    email,
    password: hashPasswordSync(password),
  })
}

export const generateAccessTokens = async (
  userId: string,
  role: UserRole = "user",
) => {
  const payload = {
    userId,
    role,
    tokenId: randomUUID(),
  }

  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)
  await saveRefreshToken({
    userId: payload.userId,
    tokenId: payload.tokenId,
    refreshToken,
  })

  return { accessToken, refreshToken, payload }
}

type Data = {
  userId: string
  tokenId?: string
  refreshToken: string
}
export const saveRefreshToken = async (data: Data) => {
  const { tokenId, refreshToken, userId } = data
  await refreshTokenRepository().save({
    id: tokenId,
    userId,
    hashedToken: bcrypt.hashSync(refreshToken, 10),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
}

export type Tokens = {
  accessToken?: string
  refreshToken?: string
}
