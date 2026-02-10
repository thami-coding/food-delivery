import { StatusCodes } from "http-status-codes"
import * as orderSercive from "../services/order.service"
import { Request, Response } from "express"

export const createOrder = async (req: Request, res: Response) => {
  const body = req.body
  const userId = req.user.id
  const order = await orderSercive.createOrder({ ...body, userId })
  res.status(StatusCodes.CREATED).json({ status: "success", order })
}

export const getAllOrders = async (req: Request, res: Response) => {
  const { orders, ...rest } = await orderSercive.getAllOrders(req.query)
  res.status(StatusCodes.OK).json({ status: "success", orders, ...rest })
}

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await orderSercive.getUserOrders(req.user.id)
  res.status(StatusCodes.OK).json({ status: "success", orders })
}

export const getLatestOrder = async (req: Request, res: Response) => {
  const latestOrder = await orderSercive.getLatestOrder(req.user.id)
  const order = latestOrder[0]
  res.status(StatusCodes.OK).json({ status: "success", order })
}

export const updateOrder = async (req: Request, res: Response) => {
  const order = await orderSercive.updateOrder(req.body)
  res.status(StatusCodes.OK).json({ status: "success", order })
}
