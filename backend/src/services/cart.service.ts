import { NotFoundError } from "../errors/AppError"
import { cartRepository } from "../repositories/repos"

export const getDetailedCart = async (userId: string | undefined) => {
  if (!userId) return []

  const cartRepo = cartRepository()
  const detailedCart = await cartRepo.find({
    where: { userId },
    relations: {
      product: true,
    },
  })
  return detailedCart
}

export interface AddCartItemInput {
  productId: string
  userId: string | undefined
  quantity: number
}
export const addCartItem = async ({
  productId,
  userId,
  quantity,
}: AddCartItemInput) => {
  const cartRepo = cartRepository()
  if (!userId || !productId) return []
  const exists = await cartRepo.findOne({
    where: {
      productId,
      userId,
    },
  })

  if (exists) {
    await cartRepo.update({ productId, userId }, { quantity })
    const cart = await cartRepo.find({ where: { userId } })
    return cart
  }

  const cartItem = cartRepo.create({ userId, productId, quantity })
  await cartRepo.save(cartItem)
  const cart = await cartRepo.find({ where: { userId } })
  return cart
}

export const deleteCartItem = async ({ userId, productId }) => {
  const cartRepo = cartRepository()
  await cartRepo.delete({
    userId,
    productId,
  })
  return await cartRepo.findBy({ userId })
}

export const updateCart = async ({ productId, userId, quantity }) => {
  const cartRepo = cartRepository()
  const cartItem = await cartRepo.findOneBy({ productId, userId })

  if (!cartItem) {
    throw new NotFoundError()
  }

  cartItem.quantity = quantity
  await cartRepo.save(cartItem)
  const cart = await cartRepo.find({ where: { userId } })
  return cart
}

export const clearCart = async (userId: string) => {
  const cartRepo = cartRepository()
  await cartRepo.delete({ userId })
}
