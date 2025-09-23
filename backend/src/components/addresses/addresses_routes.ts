import { Express } from "express";
import { authenticate } from "../../utils/auth_util";
import { AddressController } from "./addresses_controller";

export class AddressesRoutes {
  private baseEndPoint = "/api/address";
  constructor(app: Express) {
    const controller = new AddressController();

    app.route(this.baseEndPoint).all(authenticate).post(controller.addHandler);
    
    app
      .route(this.baseEndPoint + "/:id")
      .all(authenticate)
      .get(controller.getOneHandler)
      .put(controller.updateHandler)
      .delete(controller.deleteHandler);
  }
}
