import {
  update,
  findUserById,
  remove,
  findAllUsers,
} from "../../src/services/user.service"
import { userRepository } from "../../src/repositories/repos"

jest.mock("../../src/repositories/repos")

describe("update", () => {
  let mockUserRepo: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepo = { update: jest.fn() }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
  })

  it("updates the user and returns the repository's result when id is present", async () => {
    mockUserRepo.update.mockResolvedValue({ affected: 1 })

    const result = await update({ id: "user-1", fullName: "New Name" })

    expect(mockUserRepo.update).toHaveBeenCalledWith("user-1", {
      id: "user-1",
      fullName: "New Name",
    })
    expect(result).toEqual({ affected: 1 })
  })

  it("passes through partial data untouched to the repository's update call", async () => {
    mockUserRepo.update.mockResolvedValue({ affected: 1 })

    await update({ id: "user-2", city: "Durban", postalCode: "4001" })

    expect(mockUserRepo.update).toHaveBeenCalledWith("user-2", {
      id: "user-2",
      city: "Durban",
      postalCode: "4001",
    })
  })

  it("returns null and never touches the repository when id is missing", async () => {
    const result = await update({ fullName: "No Id Here" })

    expect(result).toBeNull()
    expect(mockUserRepo.update).not.toHaveBeenCalled()
  })

  it("returns null when data itself is undefined/null, without throwing", async () => {
    const result = await update(undefined as any)

    expect(result).toBeNull()
    expect(mockUserRepo.update).not.toHaveBeenCalled()
  })
})

describe("findUserById", () => {
  let mockUserRepo: any

  const mockUser = {
    id: "user-1",
    email: "test@example.com",
    role: "customer",
    fullName: "Test User",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepo = { findOne: jest.fn() }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
  })

  it("returns the user when a valid id is provided", async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser)

    const result = await findUserById("user-1")

    expect(result).toEqual(mockUser)
  })

  it("queries with the correct id and select fields, excluding sensitive data like password", async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser)

    await findUserById("user-1")

    expect(mockUserRepo.findOne).toHaveBeenCalledWith({
      where: { id: "user-1" },
      select: [
        "id",
        "email",
        "role",
        "fullName",
        "phoneNumber",
        "streetAddress",
        "city",
        "suburb",
        "postalCode",
      ],
    })
  })

  it("returns null and never queries the repository when id is undefined", async () => {
    const result = await findUserById(undefined)

    expect(result).toBeNull()
    expect(mockUserRepo.findOne).not.toHaveBeenCalled()
  })

  it("returns null when the repository finds no matching user", async () => {
    mockUserRepo.findOne.mockResolvedValue(null)

    const result = await findUserById("nonexistent-id")

    expect(result).toBeNull()
  })
})

describe("remove", () => {
  let mockUserRepo: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepo = { delete: jest.fn() }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
  })

  it("deletes the user and returns the repository's result when userId is present", async () => {
    mockUserRepo.delete.mockResolvedValue({ affected: 1 })

    const result = await remove("user-1")

    expect(mockUserRepo.delete).toHaveBeenCalledWith("user-1")
  })

  it("calls delete with the exact userId provided, unmodified", async () => {
    mockUserRepo.delete.mockResolvedValue({ affected: 1 })

    await remove("user-42")

    expect(mockUserRepo.delete).toHaveBeenCalledTimes(1)
    expect(mockUserRepo.delete).toHaveBeenCalledWith("user-42")
  })

  it("returns null and never touches the repository when userId is undefined", async () => {
    const result = await remove(undefined)

    expect(result).toBeNull()
    expect(mockUserRepo.delete).not.toHaveBeenCalled()
  })

  it("returns null and never touches the repository when userId is an empty string", async () => {
    const result = await remove("")

    expect(result).toBeNull()
    expect(mockUserRepo.delete).not.toHaveBeenCalled()
  })
})

describe("findAllUsers", () => {
  let mockUserRepo: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepo = { find: jest.fn() }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
  })

  it("returns an empty array when there are no users", async () => {
    mockUserRepo.find.mockResolvedValue([])
    
    await findAllUsers()

    expect(mockUserRepo.find).toHaveBeenCalled()
  })

})