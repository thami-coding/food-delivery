"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const cart_item_entity_1 = require("./cart_item_entity");
class CartService extends base_service_1.BaseService {
    constructor() {
        let cartItemRepositpry = new db_1.DatabaseUtil().getRepository(cart_item_entity_1.CartItem);
        super(cartItemRepositpry);
    }
}
exports.CartService = CartService;
