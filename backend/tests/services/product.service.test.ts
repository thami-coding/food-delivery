import {
  getPaginatedProducts,
  getProduct,
  PaginationQuery,
} from "../../src/services/product.service"
import * as productModule from "../../src/repositories/repos"
import { Product, Categories } from "../../src/entities/product.entity"

jest.mock("../../src/repositories/repos")

describe("getProduct", () => {
  let mockRepository: jest.Mocked<any>
  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository = {
      findOneBy: jest.fn(),
    }
    ;(productModule.productRepository as jest.Mock).mockReturnValue(
      mockRepository,
    )
  })

  it("should return product when valid id is provided", async () => {
    const mockProduct: Product = {
      id: "123",
      name: "Burger",
      category: Categories.BURGERS,
      price: 9.99,
      description: "Delicious burger",
      imageUrl: "https://example.com/burger.jpg",
      ingredients: "beef, bread, lettuce",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderItems: [],
      cart: [],
    }

    mockRepository.findOneBy.mockResolvedValue(mockProduct)

    const result = await getProduct("123")

    expect(result).toEqual(mockProduct)
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: "123" })
    expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1)
  })

  it("should return null when id is undefined", async () => {
    const result = await getProduct(undefined)

    expect(result).toBeNull()
    expect(mockRepository.findOneBy).not.toHaveBeenCalled()
  })

  it("should return null when id is empty string", async () => {
    const result = await getProduct("")

    expect(result).toBeNull()
    expect(mockRepository.findOneBy).not.toHaveBeenCalled()
  })

  it("should return null when product not found", async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    const result = await getProduct("non-existent-id")

    expect(result).toBeNull()
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      id: "non-existent-id",
    })
  })
})

describe("getPaginatedProducts", () => {
  let mockRepository: jest.Mocked<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository = {
      findAndCount: jest.fn(),
    }
    ;(productModule.productRepository as jest.Mock).mockReturnValue(
      mockRepository,
    )
  })

  it("should return paginated products with default pagination", async () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Burger",
        category: Categories.BURGERS,
        price: 9.99,
        description: "Delicious burger",
        imageUrl: "https://example.com/burger.jpg",
        ingredients: "beef, bread, lettuce",
        createdAt: new Date(),
        updatedAt: new Date(),
        orderItems: [],
        cart: [],
      },
    ]

    mockRepository.findAndCount.mockResolvedValue([mockProducts, 1])

    const query: PaginationQuery = {}
    const result = await getPaginatedProducts(query)

    expect(result.products).toEqual(mockProducts)
    expect(result.page).toBe(1)
    expect(result.totalPages).toBe(1)
    expect(result.totalProducts).toBe(1)
  })

  it("should call findAndCount with correct default parameters", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = {}
    await getPaginatedProducts(query)

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: { category: "all" },
      skip: 0,
      take: 10,
    })
  })

  it("should return paginated products with custom page and limit", async () => {
    const mockProducts: Product[] = Array(5).fill({
      id: "1",
      name: "Product",
      category: Categories.PIZZAS,
      price: 15.99,
      description: "Test",
      imageUrl: "url",
      ingredients: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderItems: [],
      cart: [],
    })

    mockRepository.findAndCount.mockResolvedValue([mockProducts, 25])

    const query: PaginationQuery = { page: "2", limit: "5" }
    const result = await getPaginatedProducts(query)

    expect(result.page).toBe(2)
    expect(result.totalPages).toBe(5)
    expect(result.totalProducts).toBe(25)
    expect(result.products.length).toBe(5)
  })

  it("should calculate correct skip value based on page and limit", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = { page: "3", limit: "10" }
    await getPaginatedProducts(query)

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: { category: "all" },
      skip: 20,
      take: 10,
    })
  })

  it("should use provided category when not 'all'", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = { category: Categories.BURGERS }
    await getPaginatedProducts(query)

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: { category: Categories.BURGERS },
      skip: 0,
      take: 10,
    })
  })

  it("should default to page 1 when page is invalid", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = { page: "invalid" }
    const result = await getPaginatedProducts(query)

    expect(result.page).toBe(1)
  })

  it("should default to limit 10 when limit is invalid", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = { limit: "invalid" }
    await getPaginatedProducts(query)

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: { category: "all" },
      skip: 0,
      take: 10,
    })
  })

  it("should handle zero page as default 1", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = { page: "0" }
    const result = await getPaginatedProducts(query)

    expect(result.page).toBe(1)
  })

  it("should calculate totalPages correctly when total not divisible by limit", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 25])

    const query: PaginationQuery = { limit: "10" }
    const result = await getPaginatedProducts(query)

    expect(result.totalPages).toBe(3)
  })

  it("should calculate totalPages as 1 when total equals limit", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 10])

    const query: PaginationQuery = { limit: "10" }
    const result = await getPaginatedProducts(query)

    expect(result.totalPages).toBe(1)
  })

  it("should handle empty results", async () => {
    mockRepository.findAndCount.mockResolvedValue([[], 0])

    const query: PaginationQuery = {}
    const result = await getPaginatedProducts(query)

    expect(result.products).toEqual([])
    expect(result.totalPages).toBe(0)
    expect(result.totalProducts).toBe(0)
  })
})
