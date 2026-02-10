import { Database } from "../db/database"
import { Cart } from "../entities/cart.entity"
import { Order } from "../entities/order.entity"
import { Product } from "../entities/product.entity"
import { RefreshToken } from "../entities/refresh-token.entity"
import { User } from "../entities/user.entity"

export const userRepository = () => {
  return Database.getRepository(User)
}

export const productRepository = () => {
  return Database.getRepository(Product)
}

export const cartRepository = () => {
  return Database.getRepository(Cart)
}

export const orderRepository = () => {
  return Database.getRepository(Order)
}
export const refreshTokenRepository = () => {
  return Database.getRepository(RefreshToken)
}
