import { Request, Response } from "express"
import * as cartService from "../services/cart.service"
import { StatusCodes } from "http-status-codes"

export const createCartItem = async (req: Request, res: Response) => {
  const userId = req.user.id

  const productId = req.body.productId
  const quantity = req.body.quantity
  const cart = await cartService.addCartItem({ userId, productId, quantity })
  res.status(StatusCodes.CREATED).json({ status: "success", cart })
}

export const getDetailedCart = async (req: Request, res: Response) => {
  const userId = req.user.id
  const cart = await cartService.getDetailedCart(userId)
  res.status(StatusCodes.OK).json({ status: "success", cart })
}

export const updateCart = async (req: Request, res: Response) => {
  const userId = req.user.id
  const productId = req.body.productId
  const quantity = req.body.quantity
  const cart = await cartService.updateCart({ userId, productId, quantity })
  res.status(StatusCodes.OK).json({ status: "success", cart })
}

export const deleteCartItem = async (req: Request, res: Response) => {
  const userId = req.user.id
  const productId = req.params.productId
  const cart = await cartService.deleteCartItem({ productId, userId })
  res.status(StatusCodes.OK).json({ status: "success", cart })
}

export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user.id
  await cartService.clearCart(userId)
  res.status(StatusCodes.NO_CONTENT).json(null)
}
