import { createOrder } from "../../src/services/order.service"
import { OrderStatus } from "../../src/entities/order.entity"
import {
  cartRepository,
  userRepository,
  orderRepository,
} from "../../src/repositories/repos"

jest.mock("../../src/repositories/repos")

describe("createOrder", () => {
  let mockUserRepo: any
  let mockCartRepo: any
  let mockOrderRepo: any
  let mockQueryBuilder: any

  const mockUser = { id: "user-1", name: "Test User" }

  beforeEach(() => {
    jest.clearAllMocks()

    mockQueryBuilder = {
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    }

    mockUserRepo = { findOneBy: jest.fn() }
    mockCartRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      delete: jest.fn(),
    }
    mockOrderRepo = {
      create: jest.fn((data) => data),
      save: jest.fn(),
    }
    ;(userRepository as jest.Mock).mockReturnValue(mockUserRepo)
    ;(cartRepository as jest.Mock).mockReturnValue(mockCartRepo)
    ;(orderRepository as jest.Mock).mockReturnValue(mockOrderRepo)
  })

  it("creates an order with correct total amount when cart has items", async () => {
    mockUserRepo.findOneBy.mockResolvedValue(mockUser)
    mockQueryBuilder.getMany.mockResolvedValue([
      {
        userId: "user-1",
        productId: "p1",
        quantity: 2,
        product: { price: 10 },
      },
      { userId: "user-1", productId: "p2", quantity: 1, product: { price: 5 } },
    ])
    mockOrderRepo.save.mockResolvedValue({ id: "order-1", totalAmount: 4500 })

    const result = await createOrder({
      paymentMethod: "card",
      userId: "user-1",
    })

    expect(mockOrderRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        totalAmount: 4500,
        status: OrderStatus.PREPARING,
        paymentMethod: "card",
        user: mockUser,
        items: [
          { productId: "p1", userId: "user-1", quantity: 2 },
          { productId: "p2", userId: "user-1", quantity: 1 },
        ],
      }),
    )
    expect(mockCartRepo.delete).toHaveBeenCalledWith({ userId: "user-1" })
    expect(result).toEqual({ id: "order-1", totalAmount: 4500 })
  })


  it("deletes the user's cart after successfully saving the order", async () => {
    mockUserRepo.findOneBy.mockResolvedValue(mockUser)
    mockQueryBuilder.getMany.mockResolvedValue([])
    mockOrderRepo.save.mockResolvedValue({ id: "order-3" })

    await createOrder({ paymentMethod: "card", userId: "user-1" })

    expect(mockCartRepo.delete).toHaveBeenCalledTimes(1)
    expect(mockCartRepo.delete).toHaveBeenCalledWith({ userId: "user-1" })
  })
})
