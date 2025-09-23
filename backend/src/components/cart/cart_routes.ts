import { Express } from "express";
import { CartController } from "./cart_controllers";

export class CartRoutes {
  private baseEndPoint = "/api/cart";
  constructor(app: Express) {
    const controller = new CartController();
    app
      .route(this.baseEndPoint)
      .get(controller.getOneHandler)
      .post(controller.addHandler)
      .put(controller.updateHandler);
      
    app.route(this.baseEndPoint + "/:id").delete(controller.deleteHandler);
  }
}
