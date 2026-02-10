import { Cart } from "../../src/entities/cart.entity"
import { Product } from "../../src/entities"
import { newUser } from "./helpers/dummy-users"
import { generateAccessTokens, seedUser } from "./helpers/auth.helper"
import { newProduct, seedProduct, seedProducts } from "./helpers/product.helper"
import { setupTestDB, teardownTestDB, TestDataSource } from "./setup"
import {
  AddCartItem,
  deleteCartItem,
  getUsersCart,
  seedCart,
  updateCartItemQuantity,
} from "./helpers/cart.helper"

describe("Cart Integration", () => {
  let accessToken = null
  let refreshToken = null
  let productId = null
  let userId = null

  beforeAll(async () => {
    await setupTestDB()
    const [user, product] = await Promise.all([
      seedUser(newUser),
      seedProduct(),
    ])
    await seedCart(productId, user.id)
    const tokens = await generateAccessTokens(user.id)
    productId = product.id
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
    userId = tokens.payload.userId
  })

  afterAll(async () => {
    await teardownTestDB()
  })

  describe("POST /api/v1/cart", () => {
    afterEach(async () => {
      await TestDataSource.getRepository(Cart).clear()
    })
    it("adds an item to the authenticated user’s cart", async () => {
      const data = {
        productId,
        quantity: 1,
        accessToken,
        refreshToken,
      }

      const response = await AddCartItem(data)

      expect(response.status).toBe(201)
      expect(response.get("Content-Type")).toMatch(/json/)
    })
  })

  describe("GET /api/v1/cart", () => {
    it("should return an authenticated users cart", async () => {
      const data = {
        accessToken,
        refreshToken,
      }
      const response = await getUsersCart(data)

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
    })
  })

  describe("PATCH /api/v1/cart", () => {
    beforeAll(async () => {
      await seedCart(productId, userId)
    })
    afterAll(async () => {
      await TestDataSource.getRepository(Cart).clear()
    })
    it("should update cartItem quantity by increasing it", async () => {
      const data = {
        productId,
        quantity: 2,
        accessToken,
        refreshToken,
      }

      const response = await updateCartItemQuantity(data)

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
      const quantity = response.body.cart[0].quantity
      expect(quantity).toBe(2)
    })
  })

  describe("DELETE /api/v1/cart", () => {
    beforeAll(async () => {
      await seedCart(productId, userId)
    })

    afterAll(async () => {
      await TestDataSource.getRepository(Cart).clear()
    })
    
    it("should delete cartItem from cart", async () => {
      const data = {
        productId,
        accessToken,
        refreshToken,
      }

      const response = await deleteCartItem(data)

      expect(response.status).toBe(200)
      expect(response.body.cart).toEqual([])
    })
  })
})
