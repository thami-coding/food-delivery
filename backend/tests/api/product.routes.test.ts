import { randomUUID } from "crypto"
import { Product } from "../../src/entities/product.entity"
import {
  ProductResponseSchema,
  ProductsResponseSchema,
} from "../../src/schemas/response/product.response.schema"
import {
  createProduct,
  deleteProduct,
  getPaginatedProducts,
  seedProducts,
  updateProduct,
} from "./helpers/product.helper"
import { setupTestDB, teardownTestDB, TestDataSource } from "./setup"
import { generateAccessTokens } from "./helpers/auth.helper"
import { productRepository } from "../../src/repositories/repos"

describe("User API Integration Tests ", () => {
  beforeAll(async () => {
    await setupTestDB()
  })

  afterAll(async () => {
    await teardownTestDB()
  })

  describe("Public Routes", () => {
    describe("GET /api/v1/products", () => {
      it("gets a list of paginated products", async () => {
        const response = await getPaginatedProducts()

        expect(response.status).toBe(200)
        expect(response.get("Content-Type")).toMatch(/json/)
        expect(() => ProductsResponseSchema.parse(response.body)).not.toThrow()
      })
    })
  })

  describe("Admin Routes", () => {
    let accessToken = null
    let refreshToken = null

    beforeAll(async () => {
      const userId = randomUUID()
      const tokens = await generateAccessTokens(userId, "admin")
      accessToken = tokens.accessToken
      refreshToken = tokens.refreshToken
    })

    afterAll(() => {
      accessToken = null
      refreshToken = null
    })

    describe("POST /api/v1/products", () => {
      it("creates a new product", async () => {
        const tokens = { accessToken, refreshToken }

        const response = await createProduct(tokens)

        expect(response.status).toBe(201)
        expect(response.get("Content-Type")).toMatch(/json/)
        expect(() => ProductResponseSchema.parse(response.body)).not.toThrow()
      })
    })

    describe("PUT /api/v1/products", () => {
      beforeEach(async () => {
        await seedProducts()
      })

      it("updates a products details", async () => {
        const { id: productId } = (await productRepository().find())[0]
        const tokens = { accessToken, refreshToken }
        
        const response = await updateProduct(tokens, productId)

        expect(response.status).toBe(200)
        expect(response.get("Content-Type")).toMatch(/json/)
        expect(() => ProductResponseSchema.parse(response.body)).not.toThrow()
      })
    })

    describe("DELETE /api/v1/products (Protected)", () => {
    beforeEach(async () => {
      await seedProducts()
    })

      it("deletes a product", async () => {
        const { id: productId } = (await productRepository().find())[0]
        const tokens = { accessToken, refreshToken }
      
        const response = await deleteProduct(tokens,productId)

        expect(response.status).toBe(204)
      })
    })
  })
})
