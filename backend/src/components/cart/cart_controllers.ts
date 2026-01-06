import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity";
<<<<<<< Updated upstream
import { Products } from "../products/products_entity";
=======
import { Products } from "../products/product_entity";
import { StatusCodes } from "http-status-codes";
>>>>>>> Stashed changes

export class CartController implements BaseController {

  public async addHandler(req: Request, res: Response): Promise<void> {
<<<<<<< Updated upstream
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const { productId, userId, quantity } = req.body;

    const exists = await cartRepo.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (!exists) {
      const cartItem = cartRepo.create(req.body);
      await cartRepo.save(cartItem);
      res
        .status(201)
        .json({ status: "success", message: "Item Added to Database" });
      return
    }

    await cartRepo.update({ productId, userId }, { quantity });
    res
      .status(200)
      .json({ status: "success", message: "Item Updated In Database" });

=======
    const userId = req.user.id;

    if (!userId) {
      res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "user not found" })
      return;
    }
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const { productId, quantity } = req.body;
    const cartItem = cartRepo.create({ userId, productId, quantity });
    await cartRepo.save(cartItem);

    res
      .status(201)
      .json({ status: "success", message: "Item Added to Database" });
>>>>>>> Stashed changes
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> { }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
<<<<<<< Updated upstream
    const userId = req.user.userId;
    let cartItems: { productId: string; quantity: number }[];
    const cartItemsRepo = new DatabaseUtil().getRepository(CartItem);

    if (userId) {
      cartItems = await cartItemsRepo
        .createQueryBuilder("cartItem")
        .innerJoin(
          Products,
          "product",
          "product.productId = cartItem.productId"
        )
        .where("cartItem.userId = :userId", { userId })
        .select([
          `product.productId AS "productId"`,
          `product.name AS name`,
          `product.price AS price`,
          `product.imageUrl AS "imageUrl"`,
          `cartItem.quantity AS quantity`,
        ])
        .getRawMany();
      console.log("###################################");
      console.log(cartItems);
      console.log(`user id: ${userId}`);
    }
    res.status(200).json({ status: "success", cart: cartItems });
=======
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
>>>>>>> Stashed changes
  }



  public async updateHandler(req: Request, res: Response): Promise<void> {
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
<<<<<<< Updated upstream
    const userId = req.user.userId;

    if (userId) {
      await cartRepo.update({ productId, userId }, { quantity });
    }

=======
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
>>>>>>> Stashed changes
    res
      .status(200)
      .json({ status: "success", message: "Item count Updated" });
    return;

  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
<<<<<<< Updated upstream
    const userId = req.user.userId;
  
=======
    const userId = req.user.id;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
    } catch (error) {
      console.log(error);

>>>>>>> Stashed changes
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
