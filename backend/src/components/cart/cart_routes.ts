// import { Express } from "express"
// import { CartController } from "./cart_controllers"
// import { authenticate } from "../../utils/auth_util"
// import { validate } from "../../validator/validate"
// import asyncHandler from "express-async-handler"
// import { cartItemValidator } from "../../schemas/validationSchemas"
// export class CartRoutes {
//   private baseEndPoint = "/api/cart"
//   constructor(app: Express) {
//     const controller = new CartController()

//     app.route(this.baseEndPoint + "/seed").post(controller.seedHandler)
//     app
//       .route(this.baseEndPoint)
//       .all(authenticate)
//       .get(controller.getOneHandler)
//       .post(validate(cartItemValidator), asyncHandler(controller.addHandler))
//       .put(asyncHandler(controller.updateHandler))
//       .delete(asyncHandler(controller.clearCartHandler))

//     app
//       .route(this.baseEndPoint + "/:id")
//       .delete(authenticate, asyncHandler(controller.deleteHandler))
//   }
// }
