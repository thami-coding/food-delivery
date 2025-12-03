import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { CartService } from "./cart_services";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity";
import { Products } from "../products/products_entity";

export class CartController implements BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
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

  }

  public async getAllHandler(req: Request, res: Response): Promise<void> { }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
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
  }



  public async updateHandler(req: Request, res: Response): Promise<void> {
    const { productId, quantity } = req.body;
    const updatedCartItem = req.body;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.user.userId;

    if (userId) {
      await cartRepo.update({ productId, userId }, { quantity });
    }

    res
      .status(200)
      .json({ status: "success", message: "Product Updated Successfully" });
  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.user.userId;
  

    if (userId) {
      await cartRepo.delete({
        userId,
        productId,
      });
    }
    res
      .status(200)
      .json({ status: "success", messeage: "product removed from cart" });
  }
}
