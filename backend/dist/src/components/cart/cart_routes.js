"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const cart_controllers_1 = require("./cart_controllers");
class CartRoutes {
    baseEndPoint = "/api/cart";
    constructor(app) {
        const controller = new cart_controllers_1.CartController();
        app
            .route(this.baseEndPoint)
            .get(controller.getOneHandler)
            .post(controller.addHandler)
            .put(controller.updateHandler);
        app.route(this.baseEndPoint + "/:id").delete(controller.deleteHandler);
    }
}
exports.CartRoutes = CartRoutes;
