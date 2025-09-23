"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesRoutes = void 0;
const auth_util_1 = require("../../utils/auth_util");
const addresses_controller_1 = require("./addresses_controller");
class AddressesRoutes {
    baseEndPoint = "/api/address";
    constructor(app) {
        const controller = new addresses_controller_1.AddressController();
        app.route(this.baseEndPoint).all(auth_util_1.authenticate).post(controller.addHandler);
        app
            .route(this.baseEndPoint + "/:id")
            .all(auth_util_1.authenticate)
            .get(controller.getOneHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.AddressesRoutes = AddressesRoutes;
