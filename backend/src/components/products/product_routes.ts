// import { Express } from "express";
// import { ProductControllers } from "./product_controllers";
// import { authenticate, authorize } from "../../utils/auth_util";
// import asyncHandler from "express-async-handler";
// export class PoductRoutes {
//   private baseEndPoint = "/api/products";
//   constructor(app: Express) {
//     const controller = new ProductControllers();
//     app.route(this.baseEndPoint + "/seed").post(asyncHandler(controller.seedHandler))
//     app
//       .route(this.baseEndPoint)
//       .get(asyncHandler(controller.getAllHandler))
//       .post(authenticate, authorize("admin"), asyncHandler(controller.addHandler))

//     app
//       .route(this.baseEndPoint + "/:id")
//       .all(authenticate, authorize("admin"))
//       .get(asyncHandler(controller.getOneHandler))
//       .put(asyncHandler(controller.updateHandler))
//       .delete(asyncHandler(controller.deleteHandler))


//   }
// }
