import {
  getDetailedCart,
  addCartItem,
  AddCartItemInput,
  deleteCartItem,
} from "../../src/services/cart.service"
import * as cartModule from "../../src/repositories/repos"
import { Cart } from "../../src/entities/cart.entity"
import { Product, Categories } from "../../src/entities/product.entity"

jest.mock("../../src/repositories/repos")

describe("getDetailedCart", () => {
  let mockRepository: jest.Mocked<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository = {
      find: jest.fn(),
    }
    ;(cartModule.cartRepository as jest.Mock).mockReturnValue(mockRepository)
  })

  it("should return detailed cart items with products", async () => {
    const mockCart: Cart[] = [
      {
        id: "cart-1",
        userId: "user-123",
        productId: "prod-1",
        quantity: 2,
        product: {
          id: "prod-1",
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
      },
      {
        id: "cart-2",
        userId: "user-123",
        productId: "prod-2",
        quantity: 1,
        product: {
          id: "prod-2",
          name: "Pizza",
          category: Categories.PIZZAS,
          price: 15.99,
          description: "Cheese pizza",
          imageUrl: "https://example.com/pizza.jpg",
          ingredients: "dough, cheese, tomato",
          createdAt: new Date(),
          updatedAt: new Date(),
          orderItems: [],
          cart: [],
        },
      },
    ]

    mockRepository.find.mockResolvedValue(mockCart)

    const result = await getDetailedCart("user-123")

    expect(result).toEqual(mockCart)
    expect(result.length).toBe(2)
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { userId: "user-123" },
      relations: { product: true },
    })
    expect(mockRepository.find).toHaveBeenCalledTimes(1)
  })

  it("should return empty array when cart is empty", async () => {
    mockRepository.find.mockResolvedValue([])

    const result = await getDetailedCart("user-123")

    expect(result).toEqual([])
    expect(result.length).toBe(0)
  })

  it("should return empty array when userId is empty string", async () => {
    mockRepository.find.mockResolvedValue([])

    const result = await getDetailedCart("")

    expect(result).toEqual([])
  })

  it("should handle undefined userId gracefully", async () => {
    mockRepository.find.mockResolvedValue([])

    const result = await getDetailedCart(undefined as any)

    expect(result).toEqual([])
  })
})

describe("addCartItem", () => {
  let mockRepository: jest.Mocked<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    }
    ;(cartModule.cartRepository as jest.Mock).mockReturnValue(mockRepository)
  })

  it("should create and save new cart item when it does not exist", async () => {
    const mockProduct: Product = {
      id: "prod-1",
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
    const newCartItem: Cart = {
      id: "cart-1",
      userId: "user-123",
      productId: "prod-1",
      quantity: 2,
      product: mockProduct,
    }

    const cartItems: Cart[] = [newCartItem]

    mockRepository.findOne.mockResolvedValue(null)
    mockRepository.create.mockReturnValue(newCartItem)
    mockRepository.save.mockResolvedValue(newCartItem)
    mockRepository.find.mockResolvedValue(cartItems)

    const input: AddCartItemInput = {
      productId: "prod-1",
      userId: "user-123",
      quantity: 2,
    }
    const result = await addCartItem(input)

    expect(result).toEqual(cartItems)
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { productId: "prod-1", userId: "user-123" },
    })
    expect(mockRepository.create).toHaveBeenCalledWith({
      userId: "user-123",
      productId: "prod-1",
      quantity: 2,
    })
    expect(mockRepository.save).toHaveBeenCalledWith(newCartItem)
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { userId: "user-123" },
    })
  })

  it("should return all cart items after creating new item", async () => {
    const newCartItem: Cart = {
      id: "cart-1",
      userId: "user-123",
      productId: "prod-1",
      quantity: 2,
      product: {} as Product,
    }

    const allCartItems: Cart[] = [newCartItem]

    mockRepository.findOne.mockResolvedValue(null)
    mockRepository.create.mockReturnValue(newCartItem)
    mockRepository.save.mockResolvedValue(newCartItem)
    mockRepository.find.mockResolvedValue(allCartItems)
    const input: AddCartItemInput = {
      productId: "prod-1",
      userId: "user-123",
      quantity: 2,
    }

    const result = await addCartItem(input)

    expect(result.length).toBe(1)
    expect(result[0].id).toBe("cart-1")
  })

  it("should update quantity when item already exists", async () => {
    const existingItem: Cart = {
      id: "cart-1",
      userId: "user-123",
      productId: "prod-1",
      quantity: 1,
      product: {} as Product,
    }

    const updatedItems: Cart[] = [
      {
        ...existingItem,
        quantity: 3,
      },
    ]
    mockRepository.findOne.mockResolvedValue(existingItem)
    mockRepository.update.mockResolvedValue({ affected: 1 })
    mockRepository.find.mockResolvedValue(updatedItems)

    const input: AddCartItemInput = {
      productId: "prod-1",
      userId: "user-123",
      quantity: 3,
    }
    const result = await addCartItem(input)

    expect(result).toEqual(updatedItems)
    expect(mockRepository.update).toHaveBeenCalledWith(
      { productId: "prod-1", userId: "user-123" },
      { quantity: 3 },
    )
    expect(mockRepository.create).not.toHaveBeenCalled()
    expect(mockRepository.save).not.toHaveBeenCalled()
  })

  it("should return all cart items after updating existing item", async () => {
    const existingItem: Cart = {
      id: "cart-1",
      userId: "user-123",
      productId: "prod-1",
      quantity: 1,
      product: {} as Product,
    }

    const allCartItems: Cart[] = [
      { ...existingItem, quantity: 5 },
      {
        id: "cart-2",
        userId: "user-123",
        productId: "prod-2",
        quantity: 2,
        product: {} as Product,
      },
    ]

    mockRepository.findOne.mockResolvedValue(existingItem)
    mockRepository.update.mockResolvedValue({ affected: 1 })
    mockRepository.find.mockResolvedValue(allCartItems)

    const input: AddCartItemInput = {
      productId: "prod-1",
      userId: "user-123",
      quantity: 5,
    }

    const result = await addCartItem(input)

    expect(result.length).toBe(2)
  })

  it("should handle empty productId", async () => {
    mockRepository.findOne.mockResolvedValue(null)
    mockRepository.create.mockReturnValue({} as Cart)
    mockRepository.save.mockResolvedValue({} as Cart)
    mockRepository.find.mockResolvedValue([])

    const input: AddCartItemInput = {
      productId: "",
      userId: "user-123",
      quantity: 1,
    }

    await addCartItem(input)

    expect(mockRepository.findOne).not.toHaveBeenCalled()
  })
})

interface DeleteCartItemInput {
  userId: string
  productId: string
}

describe("deleteCartItem", () => {
  let mockRepository: jest.Mocked<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockRepository = {
      delete: jest.fn(),
      findBy: jest.fn(),
    }
    ;(cartModule.cartRepository as jest.Mock).mockReturnValue(mockRepository)
  })

  it("should delete cart item and return remaining items", async () => {
    const remainingItems: Cart[] = [
      {
        id: "cart-2",
        userId: "user-123",
        productId: "prod-2",
        quantity: 1,
        product: {} as Product,
      },
    ]
    mockRepository.delete.mockResolvedValue({ affected: 1 })
    mockRepository.findBy.mockResolvedValue(remainingItems)

    const input: DeleteCartItemInput = {
      userId: "user-123",
      productId: "prod-1",
    }

    const result = await deleteCartItem(input)

    expect(result).toEqual(remainingItems)
    expect(mockRepository.delete).toHaveBeenCalledWith({
      userId: "user-123",
      productId: "prod-1",
    })
    expect(mockRepository.findBy).toHaveBeenCalledWith({
      userId: "user-123",
    })
    expect(mockRepository.delete).toHaveBeenCalledTimes(1)
    expect(mockRepository.findBy).toHaveBeenCalledTimes(1)
  })
  it("should call delete with correct userId and productId", async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 })
    mockRepository.findBy.mockResolvedValue([])

    const input: DeleteCartItemInput = {
      userId: "user-456",
      productId: "prod-789",
    }

    await deleteCartItem(input)

    expect(mockRepository.delete).toHaveBeenCalledWith({
      userId: "user-456",
      productId: "prod-789",
    })
  })
  it("should call findBy with correct userId", async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 })
    mockRepository.findBy.mockResolvedValue([])

    const input: DeleteCartItemInput = {
      userId: "user-123",
      productId: "prod-1",
    }

    await deleteCartItem(input)

    expect(mockRepository.findBy).toHaveBeenCalledWith({
      userId: "user-123",
    })
  })

  it("should return empty array when last item is deleted", async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 })
    mockRepository.findBy.mockResolvedValue([])

    const input: DeleteCartItemInput = {
      userId: "user-123",
      productId: "prod-1",
    }

    const result = await deleteCartItem(input)

    expect(result).toEqual([])
    expect(result.length).toBe(0)
  })
  it("should return all items when item does not exist", async () => {
    const cartItems: Cart[] = [
      {
        id: "cart-1",
        userId: "user-123",
        productId: "prod-1",
        quantity: 2,
        product: {} as Product,
      },
    ]

    mockRepository.delete.mockResolvedValue({ affected: 0 })
    mockRepository.findBy.mockResolvedValue(cartItems)

    const input: DeleteCartItemInput = {
      userId: "user-123",
      productId: "prod-999",
    }

    const result = await deleteCartItem(input)

    expect(result).toEqual(cartItems)
    expect(result.length).toBe(1)
  })

  it("should delete one item from cart with multiple items", async () => {
    const remainingItems: Cart[] = [
      {
        id: "cart-1",
        userId: "user-123",
        productId: "prod-1",
        quantity: 2,
        product: {} as Product,
      },
      {
        id: "cart-3",
        userId: "user-123",
        productId: "prod-3",
        quantity: 1,
        product: {} as Product,
      },
    ]

    mockRepository.delete.mockResolvedValue({ affected: 1 })
    mockRepository.findBy.mockResolvedValue(remainingItems)

    const input: DeleteCartItemInput = {
      userId: "user-123",
      productId: "prod-2",
    }

    const result = await deleteCartItem(input)

    expect(result.length).toBe(2)
    expect(result).toEqual(remainingItems)
  })

  it("should handle both empty userId and productId", async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 })
    mockRepository.findBy.mockResolvedValue([])

    const input: DeleteCartItemInput = {
      userId: "",
      productId: "",
    }

    await deleteCartItem(input)

    expect(mockRepository.delete).not.toHaveBeenCalledWith()
  })
})
