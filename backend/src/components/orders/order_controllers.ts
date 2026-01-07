import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { CartItem } from "../cart/cart_item_entity";
import { OrderServices } from "./order_services";
import { DatabaseUtil } from "../../utils/db";
import { OrderStatus } from "./order_status.enum";
import { UserServices } from "../users/user_services";
import { StatusCodes } from "http-status-codes";
import { Orders } from "./order_entity";

export class OrderControllers extends BaseController {
 public async addHandler(req: Request, res: Response): Promise<void> {
  const orderService = new OrderServices()
  const userService = new UserServices()
  const cartItemRepository = new DatabaseUtil().getRepository(CartItem);
  const userId = req.user.id;

  try {
   const user = await userService.findOne(userId)
   const cartItems = await cartItemRepository.find({
    where: { userId },
    relations: {
     product: true,
    }
   })

   const totalAmount: number = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
   );

   await orderService.create({
    items: cartItems,
    user,
    totalAmount: Number(totalAmount.toFixed(2)),
    status: OrderStatus.PENDING,
    deliveryAddress: user.streetAddress,
    paymentMethod: "card"
   })

   await cartItemRepository.createQueryBuilder()
    .delete()
    .where("userId = :userId", { userId })
    .execute()

   res.status(StatusCodes.CREATED).json({ message: "Order created" })

  } catch (error) {
   console.log(error);
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
  }

 }

 public async getAllHandler(req: Request, res: Response): Promise<void> {
  const ordersRepository = new DatabaseUtil().getRepository(Orders);
  const orders = await ordersRepository.find({})

  res.status(StatusCodes.OK).json({ orders })
 }

 public async getOneHandler(req: Request, res: Response): Promise<void> {
  const oderRepository = new DatabaseUtil().getRepository(Orders);
  const userId = req.user.id;

  const orders = await oderRepository.findBy({  })
  res.status(StatusCodes.OK).json({ orders })
 }
 public updateHandler(req: Request, res: Response): void {
  throw new Error("Method not implemented.");
 }
 public deleteHandler(req: Request, res: Response): void {
  throw new Error("Method not implemented.");
 }


}