import { randomUUID } from "crypto"

import { User } from "../../src/entities/user.entity"
import { setupTestDB, teardownTestDB, TestDataSource } from "./setup"
import { LoginResponseSchema } from "../../src/schemas/response/auth.response.schema"
import { SignupResponseSchema } from "../../src/schemas/response/signup.schema.response"
import { newUser } from "./helpers/dummy-users"
import {
  logout,
  login,
  seedUser,
  signup,
  generateAccessTokens,
} from "./helpers/auth.helper"

describe("Authentication", () => {
  beforeAll(async () => {
    await setupTestDB()
  })

  afterAll(async () => {
    await teardownTestDB()
  })

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await seedUser(newUser)
    })

    afterEach(async () => {
      await TestDataSource.getRepository(User).clear()
    })

    it("logs in a user successfully", async () => {
      const response = await login(newUser)
      const cookieHeader = response.headers["set-cookie"]
      const cookies = Array.isArray(cookieHeader)
        ? cookieHeader
        : [cookieHeader]
      const refreshToken = cookies.find((c) => c.startsWith("refreshToken="))

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
      expect(cookieHeader).toBeDefined()
      expect(refreshToken).toBeDefined()
      expect(() => LoginResponseSchema.parse(response.body)).not.toThrow()
    })
  })

  describe("POST /api/v1/auth/register", () => {
    afterEach(async () => {
      await TestDataSource.getRepository(User).clear()
    })
    it("creates a new user successfully", async () => {
      const response = await signup(newUser)

      expect(response.status).toBe(201)
      expect(response.get("Content-Type")).toMatch(/json/)
      expect(() => SignupResponseSchema.parse(response.body)).not.toThrow()
    })
  })

  describe("POST /api/v1/auth/logout", () => {
    beforeEach(async () => {
      await seedUser(newUser)
    })

    afterEach(async () => {
      await TestDataSource.getRepository(User).clear()
    })

    it("logs out a user and clears the refresh token cookie", async () => {
      const userId = randomUUID()
      const data = await generateAccessTokens(userId)

      const response = await logout(data)

      const cookies = response.headers["set-cookie"]
      const cookieArray = Array.isArray(cookies) ? cookies : [cookies]
      const refreshCookie = cookieArray.find((c: string) =>
        c.startsWith("refreshToken="),
      )
      expect(refreshCookie).toBeDefined()
      expect(refreshCookie).toMatch(/refreshToken=;/)
      expect(response.status).toBe(204)
    })
  })
})
