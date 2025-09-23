"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoductsRoutes = void 0;
const products_controller_1 = require("./products_controller");
const auth_util_1 = require("../../utils/auth_util");
class PoductsRoutes {
    baseEndPoint = "/api/products";
    constructor(app) {
        const controller = new products_controller_1.ProductsController();
        app.route(this.baseEndPoint + "/seed").post(controller.seedHandler);
        app
            .route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(auth_util_1.authenticate, (0, auth_util_1.authorize)("admin"), controller.addHandler);
        app
            .route(this.baseEndPoint + "/:id")
            .get(controller.getOneHandler)
            .put(auth_util_1.authenticate, (0, auth_util_1.authorize)("admin"), controller.updateHandler)
            .delete(auth_util_1.authenticate, (0, auth_util_1.authorize)("admin"), controller.deleteHandler);
    }
}
exports.PoductsRoutes = PoductsRoutes;
