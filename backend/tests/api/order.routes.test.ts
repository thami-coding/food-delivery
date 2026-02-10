import { randomUUID } from "crypto"
import { Order } from "../../src/entities/order.entity"
import { User } from "../../src/entities/user.entity"
import { app } from "../../src/server"
import { generateAccessTokens } from "./helpers/auth.helper"
import { seedOrder } from "./helpers/order.helpers"
import { setupTestDB, teardownTestDB, TestDataSource } from "./setup"
import request from "supertest"

describe("User API Integration Tests ", () => {
  const tokens = {
    accessToken: null,
    refreshToken: null,
  }

  beforeAll(async () => {
    await setupTestDB()
    await seedOrder()
    const userId = randomUUID()
    const { refreshToken, accessToken } = await generateAccessTokens(
      userId,
      "admin",
    )
    tokens.accessToken = accessToken
    tokens.refreshToken = refreshToken
  })

  afterAll(async () => {
    await teardownTestDB()
  })

  describe("GET /api/v1/orders/all", () => {
    it("should get all orders", async () => {
      const { accessToken, refreshToken } = tokens
      const response = await request(app)
        .get("/api/v1/orders/all")
        .set("Authorization", `Bearer ${accessToken}`)
        .set("Cookie", refreshToken)

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
    })
  })

  describe("GET /api/v1/orders/all?dateRange=today&status=preparing", () => {
    it("should get all orders placed today", async () => {
      const { accessToken, refreshToken } = tokens
      const response = await request(app)
        .get("/api/v1/orders/all?dateRange=today&status=preparing")
        .set("Authorization", `Bearer ${accessToken}`)
        .set("Cookie", refreshToken)

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
    })
  })

  // describe("GET /api/v1/orders/me", () => {
  //   it("should get all orders by user", async () => {
  //     const cookie = await getAuthCookie("admin", user.id)
  //     const response = await request(app)
  //       .get("/api/v1/orders/me")
  //       .set("Cookie", cookie)
  //     expect(response.status).toBe(200)
  //     expect(response.get("Content-Type")).toMatch(/json/)
  //   })
  // })
})
