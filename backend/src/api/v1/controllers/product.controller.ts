import { StatusCodes } from "http-status-codes"
import * as productService from "../services/product.service"
import { Response, Request } from "express"

export const seedProducts = async (req: Request, res: Response) => {
  await productService.createProducts()
  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "products successfully seeded" })
}

export const getAllProducts = async (req: Request, res: Response) => {
  const paginatedData = await productService.getPaginatedProducts(req.query)
  res.status(StatusCodes.OK).json({ status: "success", ...paginatedData })
}
export const getProduct = async (req: Request, res: Response) => {
  const product = await productService.getProduct(req.params.id)
  res.status(StatusCodes.OK).json({ status: "success", product })
}

export const addProduct = async (req: Request, res: Response) => {
  const product = await productService.addProduct(req.body)
  res.status(StatusCodes.CREATED).json({ status: "success", product })
}

export const removeProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string
  await productService.removeProduct(productId)
  res.status(StatusCodes.NO_CONTENT).json(null)
}

export const editProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string
  const product = await productService.editProduct(productId, req.body)
  res.status(StatusCodes.OK).json({ status: "success", product })
}
