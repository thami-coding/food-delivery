import { Express } from "express";
import { authenticate, authorize } from "../../utils/auth_util";
import { OrderControllers } from "./order_controllers";

export class OrderRoutes {
  private baseEndPoint = "/api/orders";
  constructor(app: Express) {
    const controller = new OrderControllers();

    app.route(this.baseEndPoint)
      .all(authenticate)
      .get(authorize("admin"), controller.getAllHandler)
      .post(controller.addHandler)
      .delete(controller.deleteHandler);

    app.route(this.baseEndPoint + "/me")
      .get(authenticate, controller.getOneHandler)
  }
}