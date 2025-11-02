import { Request, Response } from "express";
import { BaseController } from "../../utils/base_controller";
import { CartService } from "./cart_services";
import { DatabaseUtil } from "../../utils/db";
import { CartItem } from "./cart_item_entity";
import { Products } from "../products/products_entity";
import { In } from "typeorm";

export class CartController implements BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    const userId = req.session.userId;

    if (userId) {
      const cartRepo = new DatabaseUtil().getRepository(CartItem);
      const { productId, userId, quantity } = req.body;

      const exists = await cartRepo.findOne({
        where: {
          productId,
          userId,
        },
      });

      if (exists) {
        await cartRepo.update({ productId, userId }, { quantity });
        res
          .status(200)
          .json({ status: "success", message: "Item Updated In Database" });
        return;
      }

      const cartItem = cartRepo.create(req.body);
      await cartRepo.save(cartItem);

      res
        .status(201)
        .json({ status: "success", message: "Item Added to Database" });
    } else {
      const { productId, quantity } = req.body;
      const sessionCart = req.session.cart || [];
      if (sessionCart.length === 0) {
        sessionCart.push({ productId, quantity });
      } else {
        const existing = sessionCart.find(
          (item: any) => item.productId === productId
        );
        if (existing) {
          existing.quantity = quantity;
        } else {
          sessionCart.push({ productId, quantity });
        }
      }

      res
        .status(200)
        .json({ status: "success", message: "Item Added to session storage" });
    }
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> { }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const userId = req.session.userId;
    let cartItems: { productId: string; quantity: number }[];
    const cartItemsRepo = new DatabaseUtil().getRepository(CartItem);
    const productRepo = new DatabaseUtil().getRepository(Products);



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
      


    } else {
      const sessionCartItems = req.session.cart || [];

      if (sessionCartItems.length === 0) {
        res.status(200).json({ status: "success", cart: [] });
        return;
      }

      const productIds = sessionCartItems.map((item) => item.productId);
      const products = await productRepo.findBy({ productId: In(productIds) });

      cartItems = sessionCartItems
        .map((item) => {
          const product = products.find((p) => p.productId === item.productId);
          if (!product) return null;

          return {
            productId: product.productId,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            imageUrl: product.imageUrl,
          };
        })
        .filter(Boolean);
    }

    res.status(200).json({ status: "success", cart: cartItems });
  }

  public async updateHandler(req: Request, res: Response): Promise<void> {
    const { productId, quantity } = req.body;
    const updatedCartItem = req.body;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.session.userId;
    const sessionCart = req.session.cart;
    console.log(updatedCartItem);

    if (userId) {
      await cartRepo.update({ productId, userId }, { quantity });
    } else {
      req.session.cart = sessionCart.map((item) => {
        if (item.productId === productId) {
          return { ...item, updatedCartItem };
        }
        return item;
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "Product Updated Successfully" });
  }

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const cartRepo = new DatabaseUtil().getRepository(CartItem);
    const userId = req.session.userId;
    const sessionCart = req.session.cart;
    console.log(req.params.id);

    if (userId) {
      await cartRepo.delete({
        userId,
        productId,
      });
    } else {
      req.session.cart = sessionCart.filter(
        (item) => item.productId !== productId
      );
    }

    res
      .status(200)
      .json({ status: "success", messeage: "product removed from cart" });
  }
}
