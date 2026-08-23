import { getUser } from "../src/api/v1/controllers/user.controller"
import * as userServices from "../src/api/v1/services/user.service"

jest.mock("../src/api/v1/services/user.service")
jest.mock("../src/utils/auth.utils")

describe("getUser controller", () => {
  it("returns user data with 200", async () => {
    const req = { user: { id: "26d001bb-0a87-44f6-8c78-812dcf7e0810" } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
    const mockUser = {
      id: "26d001bb-0a87-44f6-8c78-812dcf7e0810",
      role: "user",
      email: "test@test.com",
    }
    ;(userServices.findUserById as jest.Mock).mockResolvedValue(mockUser)

    await getUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      user: mockUser,
    })
  })

  it("returns 404 when user not found", async () => {
    const req = {
      params: { id: "26d001bb-0a87-44f6-8c78-812dcf7e0810" },
    } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
    ;(userServices.findUserById as jest.Mock).mockResolvedValue(null)

    await getUser(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "User not found",
    })
  })
})
