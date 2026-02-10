import { OrderStatus } from "../../../src/entities/order.entity"
import { newProduct } from "./product.helper"
import { seedDeailedUser } from "./user.helper"
import {
  orderRepository,
  productRepository,
} from "../../../src/repositories/repos"

export const seedOrder = async () => {
  const orderRepo = orderRepository()
  const product = await productRepository().save(newProduct)
  const adminUser = await seedDeailedUser("admin")
  const items = [
    {
      productId: product.id,
      userId: adminUser.id,
      quantity: 1,
    },
  ]

  return await orderRepo.save({
    items,
    user: adminUser,
    totalAmount: 23343,
    status: OrderStatus.PREPARING,
    paymentMethod: "online",
  })
}
