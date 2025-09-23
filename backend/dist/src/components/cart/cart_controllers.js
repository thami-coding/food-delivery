"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const db_1 = require("../../utils/db");
const cart_item_entity_1 = require("./cart_item_entity");
const products_entity_1 = require("../products/products_entity");
const typeorm_1 = require("typeorm");
class CartController {
    async addHandler(req, res) {
        const userId = req.session.userId;
        console.log(req.body);
        if (userId) {
            const cartRepo = new db_1.DatabaseUtil().getRepository(cart_item_entity_1.CartItem);
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
        }
        else {
            const { productId, quantity } = req.body;
            const sessionCart = req.session.cart || [];
            if (sessionCart.length === 0) {
                sessionCart.push({ productId, quantity });
            }
            else {
                const existing = sessionCart.find((item) => item.productId === productId);
                if (existing) {
                    existing.quantity = quantity;
                }
                else {
                    sessionCart.push({ productId, quantity });
                }
            }
            res
                .status(200)
                .json({ status: "success", message: "Item Added to session storage" });
        }
    }
    async getAllHandler(req, res) { }
    async getOneHandler(req, res) {
        const userId = req.session.userId;
        let cartItems;
        const cartItemsRepo = new db_1.DatabaseUtil().getRepository(cart_item_entity_1.CartItem);
        const productRepo = new db_1.DatabaseUtil().getRepository(products_entity_1.Products);
        if (userId) {
            cartItems = await cartItemsRepo
                .createQueryBuilder("cartItem")
                .innerJoin(products_entity_1.Products, "product", "product.productId = cartItem.productId")
                .where("cartItem.userId = :userId", { userId })
                .select([
                `product.productId AS "productId"`,
                `product.name AS name`,
                `product.price AS price`,
                `product.imageUrl AS "imageUrl"`,
                `cartItem.quantity AS quantity`,
            ])
                .getRawMany();
        }
        else {
            const sessionCartItems = req.session.cart || [];
            if (sessionCartItems.length === 0) {
                res.status(200).json({ status: "success", cart: [] });
                return;
            }
            const productIds = sessionCartItems.map((item) => item.productId);
            const products = await productRepo.findBy({ productId: (0, typeorm_1.In)(productIds) });
            cartItems = sessionCartItems
                .map((item) => {
                const product = products.find((p) => p.productId === item.productId);
                if (!product)
                    return null;
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
    async updateHandler(req, res) {
        const { productId, quantity } = req.body;
        const updatedCartItem = req.body;
        const cartRepo = new db_1.DatabaseUtil().getRepository(cart_item_entity_1.CartItem);
        const userId = req.session.userId;
        const sessionCart = req.session.cart;
        console.log(updatedCartItem);
        if (userId) {
            await cartRepo.update({ productId, userId }, { quantity });
        }
        else {
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
    async deleteHandler(req, res) {
        const productId = req.params.id;
        const cartRepo = new db_1.DatabaseUtil().getRepository(cart_item_entity_1.CartItem);
        const userId = req.session.userId;
        const sessionCart = req.session.cart;
        console.log(req.params.id);
        if (userId) {
            await cartRepo.delete({
                userId,
                productId,
            });
        }
        else {
            req.session.cart = sessionCart.filter((item) => item.productId !== productId);
        }
        res
            .status(200)
            .json({ status: "success", messeage: "product removed from cart" });
    }
}
exports.CartController = CartController;
