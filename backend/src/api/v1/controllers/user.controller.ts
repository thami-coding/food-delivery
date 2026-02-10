import { StatusCodes } from "http-status-codes"
import * as userServices from "../services/user.service"
import { Request, Response } from "express"

export const updateUser = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.user.id
  const updateData = { id, ...body }
   await userServices.update(updateData)
   const user = await userServices.findUserById(id)
  res.status(StatusCodes.OK).json({ status: "success", user })
}

export const deleteUser = async (req: Request, res: Response) => {
  await userServices.remove(req.user.id)
  res.status(StatusCodes.OK).json(null)
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userServices.findAllUsers()
  res.status(StatusCodes.OK).json({ status: "success", users })
}

export const getUser = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const user = await userServices.findUserById(userId)
  res.status(StatusCodes.OK).json({ status: "success", user })
}
