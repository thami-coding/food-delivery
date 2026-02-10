// import { Request, Response } from "express"
// import { BaseController } from "../../utils/base_controller"
// import { CartItem } from "../cart/cart_item_entity"
// import { OrderServices } from "./order_services"
// import { DatabaseUtil } from "../../db/database"
// import { getDateRange } from "../../utils/date_filter"
// import { DateRange } from "../../utils/date_filter"
// import { OrderStatus } from "./order_status.enum"
// import { UserServices } from "../users/user_services"
// import { StatusCodes } from "http-status-codes"
// import { Orders } from "./order_entity"
// import { toCents } from "../../utils/cents_converter"
// import { Users } from "../users/user_entity"

// export class OrderControllers extends BaseController {
//   public async seedHandler(req: Request, res: Response): Promise<void> {
//     const cartItemRepository = new DatabaseUtil().getRepository(CartItem)
//     const orderService = new OrderServices()
//     const userService = new UserServices()

//     const users = await userService.findAll({})

//     for (const user of users.data) {
//       const userId = user.id
//       const cartItems = await cartItemRepository.find({
//         where: { userId },
//         relations: {
//           product: true,
//         },
//       })
//       if (!cartItems) {
//         res.status(StatusCodes.BAD_REQUEST).json({
//           status: "error",
//           message: "There are no items in your cart to place order",
//         })
//         return
//       }
//       const totalAmountInCents: number = cartItems.reduce(
//         (sum, item) => sum + toCents(item.product.price) * item.quantity,
//         0,
//       )

//       const deliveryPrice = toCents(20)
//       const order = await orderService.create({
//         items: cartItems,
//         user,
//         totalAmount: totalAmountInCents + deliveryPrice,
//         status: OrderStatus.PREPARING,
//         paymentMethod: "online",
//         paymentStatus: "paid",
//       })
//     }
//     res.status(StatusCodes.CREATED).json({
//       status: "success",
//       message: "orders seeded",
//     })
//   }

//   public async addHandler(req: Request, res: Response): Promise<void> {
//     const cartItemRepository = new DatabaseUtil().getRepository(CartItem)
//     const orderRepository = new DatabaseUtil().getRepository(Orders)
//     const userRepository = new DatabaseUtil().getRepository(Users)
//     const userId = req.user.id
//     const { paymentMethod } = req.body

//     const user = await userRepository.findOne({
//       where: { id: userId },
//       select: [
//         "id",
//         "fullName",
//         "email",
//         "phoneNumber",
//         "streetAddress",
//         "city",
//         "suburb",
//         "postalCode",
//       ],
//     })

//     const cartItems = await cartItemRepository
//       .createQueryBuilder("cart")
//       .leftJoin("cart.product", "product")
//       .select([
//         "cart.userId",
//         "cart.productId",
//         "cart.quantity",
//         "product.price",
//       ])
//       .where("cart.userId = :userId", { userId })
//       .getMany()

//     const deliveryPrice = toCents(20)
//     const totalAmountInCents: number = cartItems.reduce(
//       (sum, item) => sum + toCents(item.product.price) * item.quantity,
//       0,
//     )
//     const totalAmount =
//       totalAmountInCents === 0 ? 0 : totalAmountInCents + deliveryPrice
//     console.log("cartItems: ", cartItems)

//     const items = cartItems.map((c) => ({
//       productId: c.productId,
//       userId: c.userId,
//       quantity: c.quantity,
//     }))

//     const order = await orderRepository.create({
//       items,
//       user,
//       totalAmount,
//       status: OrderStatus.PREPARING,
//       deliveryAddress: user.streetAddress,
//       paymentMethod,
//     })

//     const savedOrder = await orderRepository.save({ ...order })
//     await cartItemRepository.delete({ userId })

//     res
//       .status(StatusCodes.CREATED)
//       .json({ status: "success", order: savedOrder })
//   }

//   public async getAllHandler(req: Request, res: Response): Promise<void> {
//     const orderRepository = new DatabaseUtil().getRepository(Orders)
//     const dateRange = req.query.dateRange as DateRange
//     const status = req.query.status as string
//     const page = Math.max(Number(req.query.page) || 1, 1)
//     const limit = Math.min(Number(req.query.limit) || 10, 100)

//     const orders = await OrdersUtil.getPaginatedOrders(
//       page,
//       limit,
//       dateRange,
//       status,
//     )
//     const totalPendingOrders = await orderRepository.count({
//       where: {
//         status: "preparing",
//       },
//     })

//     res
//       .status(StatusCodes.OK)
//       .json({ status: "success", ...orders, totalPendingOrders })
//   }

//   public async getAllUserOrders(req: Request, res: Response): Promise<void> {
//     const oderRepository = new DatabaseUtil().getRepository(Orders)
//     const userId = req.user.id
//     const orders = await oderRepository.findBy({ userId })

//     res.status(StatusCodes.OK).json({ status: "success", orders })
//   }

//   public async getOneHandler(req: Request, res: Response): Promise<void> {
//     const oderRepository = new DatabaseUtil().getRepository(Orders)
//     const userId = req.user.id
//     const order = await oderRepository.find({
//       where: { userId },
//       order: {
//         createdAt: "DESC",
//       },
//       take: 1,
//     })

//     res.status(StatusCodes.OK).json({ status: "success", order: order[0] })
//   }

//   public async updateHandler(req: Request, res: Response): Promise<void> {
//     const oderRepository = new DatabaseUtil().getRepository(Orders)
//     const { status, id } = req.body
//     await oderRepository.update({ id }, { status })

//     const order = await oderRepository.find({ where: { id } })
//     res.status(StatusCodes.OK).json({
//       status: "success",
//       order,
//     })
//   }

//   public deleteHandler(req: Request, res: Response): void {
//     throw new Error("Method not implemented.")
//   }
// }

// export class OrdersUtil {
//   public static async getPaginatedOrders(
//     page: number,
//     limit: number,
//     range?: DateRange,
//     status?: string,
//   ) {
//     const orderRepository = new DatabaseUtil().getRepository(Orders)
//     const dateRange = getDateRange(range)
//     console.log(dateRange)

//     const query = orderRepository
//       .createQueryBuilder("order")
//       .leftJoinAndSelect("order.user", "user")
//       .leftJoinAndSelect("order.items", "items")
//       .leftJoinAndSelect("items.product", "product")
//       .orderBy("order.createdAt", "ASC")

//     if (dateRange) {
//       query.andWhere("order.createdAt BETWEEN :start AND :end", {
//         start: dateRange.start,
//         end: dateRange.end,
//       })
//     }

//     if (status) {
//       query.andWhere("order.status = :status", {
//         status,
//       })
//     }

//     const [orders, totalOrders] = await query.getManyAndCount()
//     console.log(orders)

//     return {
//       orders,
//       page,
//       limit,
//       totalOrders,
//       totalPages: Math.ceil(totalOrders / limit),
//     }
//   }
// }
