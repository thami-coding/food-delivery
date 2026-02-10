import { OrderStatus } from "../../../entities/order.entity"
import { convertToCents } from "../../../utils/cents-converter"
import { DateRange, getDateRange } from "../../../utils/date-filter"
import {
  cartRepository,
  orderRepository,
  userRepository,
} from "../../../repositories/repos"

export const createOrder = async (body) => {
  const cartRepo = cartRepository()
  const orderRepo = orderRepository()
  const userRepo = userRepository()

  const { paymentMethod, userId } = body
  const user = await userRepo.findOneBy({ id: userId })

  const cartItems = await cartRepo
    .createQueryBuilder("cart")
    .leftJoin("cart.product", "product")
    .select([
      "cart.userId",
      "cart.productId",
      "cart.quantity",
      "product.price",
    ])
    .where("cart.userId = :userId", { userId })
    .getMany()
  const deliveryPrice = convertToCents(20)
  const totalAmountInCents: number = cartItems.reduce(
    (sum, item) => sum + convertToCents(item.product.price) * item.quantity,
    0,
  )
  const totalAmount =
    totalAmountInCents === 0 ? 0 : totalAmountInCents + deliveryPrice

  const items = cartItems.map((c) => ({
    productId: c.productId,
    userId: c.userId,
    quantity: c.quantity,
  }))

  const order = orderRepo.create({
    items,
    user,
    totalAmount,
    status: OrderStatus.PREPARING,
    paymentMethod,
  })

  const newOrder = await orderRepo.save({ ...order })
  await cartRepo.delete({ userId })

  return newOrder
}

export const getAllOrders = async (query) => {
  const orderRepo = orderRepository()

  const range = query.dateRange as DateRange
  const status = query.status as string
  const page = Math.max(Number(query.page) || 1, 1)
  const limit = Math.min(Number(query.limit) || 10, 100)
  const dateRange = getDateRange(range)

  const queryBuilder = orderRepo
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.items", "items")
    .leftJoinAndSelect("items.product", "product")
    .orderBy("order.createdAt", "ASC")

  if (dateRange) {
    queryBuilder.andWhere("order.createdAt BETWEEN :start AND :end", {
      start: dateRange.start,
      end: dateRange.end,
    })
  }

  if (status) {
    queryBuilder.andWhere("order.status = :status", {
      status,
    })
  }

  const [orders, totalOrders] = await queryBuilder.getManyAndCount()
  const totalPendingOrders = await orderRepo.count({
    where: {
      status: OrderStatus.PREPARING,
    },
  })

  return {
    orders,
    page,
    limit,
    totalOrders,
    totalPages: Math.ceil(totalOrders / limit),
    totalPendingOrders,
  }
}

export const getUserOrders = async (userId: string) => {
  const oderRepo = orderRepository()
  const orders = await oderRepo.findBy({ userId })
  return orders
}

export const updateOrder = async (body) => {
  const oderRepo = orderRepository()
  const { status, id } = body
  const order = await oderRepo.findOneBy({ id })
  order.status = status
  const updatedOrder = await oderRepo.save(order)
  return updatedOrder
}

export const getLatestOrder = async (userId: string) => {
  const oderRepo = orderRepository()
  const order = await oderRepo.find({
    where: { userId },
    order: {
      createdAt: "DESC",
    },
    take: 1,
  })
  return order
}
