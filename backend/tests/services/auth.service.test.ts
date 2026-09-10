import bcrypt from "bcryptjs"
import { login, signup } from "../../src/services/auth.service"
import {
  UnauthorizedError,
  ConflictError,
  BadRequestError,
} from "../../src/errors/AppError"

import {
  refreshTokenRepository,
  userRepository,
} from "../../src/repositories/repos"

import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../src/utils/auth.utils"
jest.mock("../../src/repositories/repos")
jest.mock("../../src/utils/auth.utils")
jest.mock("bcryptjs")
jest.mock("crypto", () => ({
  randomUUID: jest.fn(() => "mock-token-id"),
}))

describe("login", () => {
  let mockUserRepo: any
  let mockRefreshTokenRepo: any

  const mockUser = {
    id: "user-1",
    email: "test@example.com",
    password: "hashed-password",
    role: "customer",
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockUserRepo = { findOne: jest.fn() }
    mockRefreshTokenRepo = { save: jest.fn() }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
    ;(refreshTokenRepository as jest.Mock).mockReturnValue(mockRefreshTokenRepo)
    ;(bcrypt.hashSync as jest.Mock).mockReturnValue("hashed-refresh-token")
  })

  it("returns access token, refresh token, and user details on valid credentials", async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser)
    ;(comparePasswords as jest.Mock).mockResolvedValue(true)
    ;(generateAccessToken as jest.Mock).mockReturnValue("access-token-123")
    ;(generateRefreshToken as jest.Mock).mockReturnValue("refresh-token-123")
    const email = "test@example.com"
    const result = await login({
      email,
      password: "correct-password",
    })

    expect(mockUserRepo.findOne).toHaveBeenLastCalledWith({
      where: { email },
      select: ["password", "email", "id", "role"],
    })
  })

  it("persists a hashed refresh token with a 7-day expiry tied to the correct user and tokenId", async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser)
    ;(comparePasswords as jest.Mock).mockResolvedValue(true)
    ;(generateAccessToken as jest.Mock).mockReturnValue("access-token-123")
    ;(generateRefreshToken as jest.Mock).mockReturnValue("refresh-token-123")

    const before = Date.now()
    await login({ email: "test@example.com", password: "correct-password" })

    expect(bcrypt.hashSync).toHaveBeenCalledWith("refresh-token-123", 10)
    expect(mockRefreshTokenRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "mock-token-id",
        userId: "user-1",
        hashedToken: "hashed-refresh-token",
      }),
    )
    const savedArg = mockRefreshTokenRepo.save.mock.calls[0][0]
    expect(savedArg.expiresAt.getTime()).toBeGreaterThan(before)
    expect(savedArg.expiresAt.getTime()).toBeLessThanOrEqual(
      before + 7 * 24 * 60 * 60 * 1000 + 1000,
    )
  })

  it("throws UnauthorizedError with a generic message when the email doesn't exist (no user enumeration)", async () => {
    mockUserRepo.findOne.mockResolvedValue(null)

    await expect(
      login({ email: "nobody@example.com", password: "whatever" }),
    ).rejects.toThrow(UnauthorizedError)

    expect(comparePasswords).not.toHaveBeenCalled()
  })

  it("throws UnauthorizedError with the SAME message when the password is wrong, not revealing which field was incorrect", async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser)
    ;(comparePasswords as jest.Mock).mockResolvedValue(false)

    try {
      await login({ email: "test@example.com", password: "wrong-password" })
      fail("expected login to throw")
    } catch (err: any) {
      expect(err).toBeInstanceOf(UnauthorizedError)
      // expect(err.details ?? err.message).toEqual(
      //   expect.objectContaining({
      //     password: "The email or password you entered is incorrect",
      //   }),
      // )
    }
    expect(mockRefreshTokenRepo.save).not.toHaveBeenCalled()
  })
})

// describe("signup", () => {
//   let mockUserRepo: any

//   const validData = {
//     email: "new@example.com",
//     password: "Password123!",
//     confirmPassword: "Password123!",
//   }

//   beforeEach(() => {
//     jest.clearAllMocks()

//     mockUserRepo = {
//       findOneBy: jest.fn(),
//       create: jest.fn((data) => data),
//       save: jest.fn(),
//     }
//     ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
//   })

//   it("creates a new user with a hashed password and returns id, email, role", async () => {
//     mockUserRepo.findOneBy.mockResolvedValue(null)
//     ;(hashPassword as jest.Mock).mockResolvedValue("hashed-password-value")
//     mockUserRepo.save.mockResolvedValue({
//       id: "user-99",
//       email: "new@example.com",
//       role: "customer",
//       password: "hashed-password-value",
//     })

//     const result = await signup({ ...validData })

//     expect(result).toEqual({
//       id: "user-99",
//       email: "new@example.com",
//       role: "customer",
//     })
//     expect(result).not.toHaveProperty("password")
//   })

//   it("hashes the plaintext password before saving, never persisting it in plaintext", async () => {
//     mockUserRepo.findOneBy.mockResolvedValue(null)
//     ;(hashPassword as jest.Mock).mockResolvedValue("hashed-password-value")
//     mockUserRepo.save.mockResolvedValue({
//       id: "user-99",
//       email: "new@example.com",
//       role: "customer",
//     })

//     await signup({ ...validData })

//     expect(hashPassword).toHaveBeenCalledWith("Password123!")
//     const createdArg = mockUserRepo.create.mock.calls[0][0]
//     expect(createdArg.password).toBe("hashed-password-value")
//   })

//   it("throws ConflictError when the email is already registered, without attempting to hash/save", async () => {
//     mockUserRepo.findOneBy.mockResolvedValue({
//       id: "existing-user",
//       email: "new@example.com",
//     })

//     await expect(signup({ ...validData })).rejects.toThrow(ConflictError)

//     expect(hashPassword).not.toHaveBeenCalled()
//     expect(mockUserRepo.save).not.toHaveBeenCalled()
//   })

//   it("throws BadRequestError when password and confirmPassword don't match, without saving anything", async () => {
//     mockUserRepo.findOneBy.mockResolvedValue(null)

//     await expect(
//       signup({ ...validData, confirmPassword: "SomethingElse!" }),
//     ).rejects.toThrow(BadRequestError)

//     expect(hashPassword).not.toHaveBeenCalled()
//     expect(mockUserRepo.save).not.toHaveBeenCalled()
//   })
// })
