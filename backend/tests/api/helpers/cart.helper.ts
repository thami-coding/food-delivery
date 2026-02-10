import request from "supertest"
import { app } from "../../../src/server"
import { cartRepository } from "../../../src/repositories/repos"

const baseUrl = "/api/v1/cart"
export const AddCartItem = async (data) => {
  const { refreshToken, accessToken, productId, quantity } = data
  return request(app)
    .post(baseUrl)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      productId,
      quantity,
    })
}

export const getUsersCart = (data) => {
  const { refreshToken, accessToken } = data
  return request(app)
    .get(baseUrl)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
}

export const deleteCartItem = async (data) => {
  const { refreshToken, accessToken, productId } = data

  return request(app)
    .delete(baseUrl + `/${productId}`)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send()
}

export const updateCartItemQuantity = async (data) => {
  const { refreshToken, accessToken, productId, quantity } = data

  return request(app)
    .patch(baseUrl)
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      productId,
      quantity: 2,
    })
}

export const seedCart = async (productId: string, userId: string) => {
  return await cartRepository().save({
    productId,
    userId,
    quantity: 1,
  })
}
