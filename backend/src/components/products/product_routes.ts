import { Express } from "express";
import { ProductControllers } from "./product_controllers";
import { authenticate, authorize } from "../../utils/auth_util";

export class PoductRoutes {
  private baseEndPoint = "/api/products";
  constructor(app: Express) {
    const controller = new ProductControllers();
    app.route(this.baseEndPoint + "/seed").post(controller.seedHandler);
    app
      .route(this.baseEndPoint)
      .get(controller.getAllHandler)
      .post(authenticate, authorize("admin"), controller.addHandler);

      app
      .route(this.baseEndPoint + "/:id")
      .get(controller.getOneHandler)
      .put(authenticate, authorize("admin"), controller.updateHandler)
      .delete(authenticate, authorize("admin"), controller.deleteHandler);
      
    }
}
