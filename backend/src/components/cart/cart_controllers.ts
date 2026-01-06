import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity"
import { Products } from "../products/product_entity";
import { StatusCodes } from "http-status-codes";


export class CartController implements BaseController {

  public async addHandler(req: Request, res: Response): Promise<void> {
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!userId) {
      res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "user not found" })
      return;
    }
    const cartItem = cartRepo.create({ userId, productId, quantity });
    await cartRepo.save(cartItem);

    res
      .status(201)
      .json({ status: "success", message: "Item Added to Database" });
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> { }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const cartItemsRepo = new DatabaseUtil().getRepository(CartItem);

    const cartItems: { productId: string; quantity: number }[] = await cartItemsRepo
      .createQueryBuilder("cartItem")
      .innerJoin(
        Products,
        "product",
        "product.id = cartItem.productId"
      )
      .where("cartItem.userId = :userId", { userId })
      .select([
        `product.id AS "productId"`,
        `product.name AS name`,
        `product.price AS price`,
        `product.imageUrl AS "imageUrl"`,
        `cartItem.quantity AS quantity`,
      ])
      .getRawMany();

    res.status(StatusCodes.OK).json({ status: "success", cart: cartItems });
  }



  public async updateHandler(req: Request, res: Response): Promise<void> {
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!userId) {
      res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "user not found" })
      return;
    }

    console.log(productId, quantity);
    const exists = await cartRepo.findOne({
      where: {
        productId,
        userId,
      },
    });
    if (!exists) {
      res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "cart item doesn't exist " })
      return;
    }
    await cartRepo.update({ productId, userId }, { quantity });
    res
      .status(200)
      .json({ status: "success", message: "Item count Updated" });
    return;

  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.user.id;

    if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "success", messeage: `user with userId: ${userId} not found!` });
      return
    }

    try {
      await cartRepo.delete({
        userId,
        productId,
      });
    } catch (error) {
      console.log(error);
    }
    res
      .status(StatusCodes.OK)
      .json({ status: "success", messeage: "product removed from cart" });
  }

  public async clearCartHandler(req: Request, res: Response): Promise<void> {
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.user.id;

    if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ messeage: `user with userId: ${userId} not found!` });
      return
    }

    try {
      await cartRepo.delete({ userId })
    } catch (error) {
      console.log(error);
    }
    res
      .status(StatusCodes.OK)
      .json({ messeage: "cart cleared" });
  }
}
