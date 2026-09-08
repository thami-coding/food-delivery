import { getProduct } from "../../src/services/product.service"
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
})
