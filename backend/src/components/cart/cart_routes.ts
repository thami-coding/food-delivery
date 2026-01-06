import { Express } from "express";
import { CartController } from "./cart_controllers";
import { authenticate } from "../../utils/auth_util";

export class CartRoutes {
  private baseEndPoint = "/api/cart";
  constructor(app: Express) {
    const controller = new CartController();
    app
      .route(this.baseEndPoint)
      .all(authenticate)
      .get(controller.getOneHandler)
      .post(controller.addHandler)
      .patch(controller.updateHandler)
      .delete(controller.clearCartHandler)

    app.route(this.baseEndPoint + "/:id").delete(authenticate, controller.deleteHandler);
  }
}
