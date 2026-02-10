import { UserResponseSchema } from "../../src/schemas/response/user.response.schema"
import { generateAccessTokens } from "./helpers/auth.helper"
import { getDetailedUser, seedDeailedUser } from "./helpers/user.helper"
import { setupTestDB, teardownTestDB } from "./setup"

describe("User API Integration Tests", () => {
  let accessToken
  let refreshToken

  beforeAll(async () => {
    await setupTestDB()

    const { id } = await seedDeailedUser("user")
    const tokens = await generateAccessTokens(id)
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
  })

  afterAll(async () => {
    await teardownTestDB()
  })

  describe("GET /api/v1/users", () => {
    it("gets logged in user", async () => {
      const response = await getDetailedUser({ accessToken, refreshToken })

      expect(response.status).toBe(200)
      expect(response.get("Content-Type")).toMatch(/json/)
      expect(() => UserResponseSchema.parse(response.body)).not.toThrow()
    })

    it("returns 401 if no token is provided", async () => {
      const response = await getDetailedUser()

      expect(response.status).toBe(401)
      expect(response.get("Content-Type")).toMatch(/json/)
    })
  })
})
