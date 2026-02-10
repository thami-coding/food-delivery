// import { Request, Response } from "express"
// import { BaseController } from "../../utils/base_controller"
// import { DatabaseUtil } from "../../db/database"
// import { CartItem } from "./cart_item_entity"
// import { Products } from "../products/product_entity"
// import { StatusCodes } from "http-status-codes"
// import { Users } from "../users/user_entity"

// export class CartController implements BaseController {
//   public async seedHandler(req: Request, res: Response): Promise<void> {
//     const cartRepo = new DatabaseUtil().getRepository(CartItem)
//     const productRepo = new DatabaseUtil().getRepository(Products)
//     const userRepo = new DatabaseUtil().getRepository(Users)
//     // TODO: Finish seeding logic
//   }

//   public async addHandler(req: Request, res: Response): Promise<void> {
//     const cartRepo = new DatabaseUtil().getRepository(CartItem)
//     const { productId, quantity } = req.body
//     const userId = req.user.id

//     const exists = await cartRepo.findOne({
//       where: {
//         productId,
//         userId,
//       },
//     })

//     if (exists) {
//       await cartRepo.update({ productId, userId }, { quantity })
//       const cart = await cartRepo.find({ where: { userId } })
//       res.status(StatusCodes.OK).json({ status: "success", cart })
//       return
//     }

//     const cartItem = await cartRepo.create({ userId, productId, quantity })
//     await cartRepo.save(cartItem)
//     const cart = await cartRepo.find({ where: { userId } })
//     res.status(StatusCodes.CREATED).json({
//       status: "success",
//       cart,
//     })
//   }

//   public async getAllHandler(req: Request, res: Response): Promise<void> {}

//   public async getOneHandler(req: Request, res: Response): Promise<void> {
//     const userId = req.user.id
//     const cartItemsRepo = new DatabaseUtil().getRepository(CartItem)

//     const cartItems: { productId: string; quantity: number }[] =
//       await cartItemsRepo
//         .createQueryBuilder("cartItem")
//         .innerJoin(Products, "product", "product.id = cartItem.productId")
//         .where("cartItem.userId = :userId", { userId })
//         .select([
//           `product.id AS "productId"`,
//           `product.name AS name`,
//           `product.price AS price`,
//           `product.imageUrl AS "imageUrl"`,
//           `cartItem.quantity AS quantity`,
//         ])
//         .getRawMany()

//     res.status(StatusCodes.OK).json({
//       status: "success",
//       cart: cartItems,
//     })
//   }

//   public async updateHandler(req: Request, res: Response): Promise<void> {
//     const cartRepo = new DatabaseUtil().getRepository(CartItem)
//     const { productId, quantity } = req.body
//     const userId = req.user.id

//     await cartRepo.update({ productId, userId }, { quantity })
//     const cart = await cartRepo.find({ where: { userId } })

//     res.status(StatusCodes.OK).json({ status: "success", cart })
//   }

//   public async deleteHandler(req: Request, res: Response): Promise<void> {
//     const productId = req.params.id
//     const cartRepo = new DatabaseUtil().getRepository(CartItem)
//     const userId = req.user.id

//     await cartRepo.delete({
//       userId,
//       productId,
//     })
//     res.status(StatusCodes.NO_CONTENT).json()
//   }

//   public async clearCartHandler(req: Request, res: Response): Promise<void> {
//     const cartRepo = new DatabaseUtil().getRepository(CartItem)
//     const userId = req.user.id
//     await cartRepo.delete({ userId })
//     res.status(StatusCodes.NO_CONTENT).json()
//   }
// }
