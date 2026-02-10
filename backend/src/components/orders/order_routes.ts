// import { Express } from "express"
// import { authenticate, authorize } from "../../utils/auth_util"
// import { OrderControllers } from "./order_controllers"
// import asyncHandler from "express-async-handler"

// export class OrderRoutes {
//   private baseEndPoint = "/api/orders"
//   constructor(app: Express) {
    
//     const controller = new OrderControllers()
//     app
//       .route(this.baseEndPoint + "/seed")
//       .post(asyncHandler(controller.seedHandler))

//     app
//       .route(this.baseEndPoint)
//       .all(authenticate)
//       .get(authorize("admin"), asyncHandler(controller.getAllHandler))
//       .post(asyncHandler(controller.addHandler))
//       .patch(authorize("admin"), asyncHandler(controller.updateHandler))
//       .delete(authorize("admin"), asyncHandler(controller.deleteHandler))
//     app
//       .route(this.baseEndPoint + "/new")
//       .get(authenticate, asyncHandler(controller.getOneHandler))
//     app
//       .route(this.baseEndPoint + "/all")
//       .get(authenticate, asyncHandler(controller.getAllUserOrders))
//   }
// }
