// import { Express } from "express"
// import { UserControllers } from "./user_controllers"
// import { authenticate, authorize } from "../../utils/auth_util"
// import asyncHandler from "express-async-handler"
// import { validate } from "../../middleware/validate"
// import {
//   loginValidator,
//   registerValidator,
//   userValidator,
// } from "../../validators/validationSchemas"
// import { loginRateLimiter } from "../../middleware/loginRateLimiter"

// export class UserRoutes {
//   private baseEndPoint = "/api/users"

//   constructor(app: Express) {
//     const controller = new UserControllers()

//     app
//       .route(this.baseEndPoint + "/seed")
//       .post(asyncHandler(controller.seedHandler))
      
//     app
//       .route(this.baseEndPoint)
//       .get(
//         authenticate,
//         authorize("admin"),
//         asyncHandler(controller.getAllHandler),
//       )
//       .post(validate(registerValidator), asyncHandler(controller.addHandler))

//     app
//       .route(this.baseEndPoint + "/me")
//       .get(authenticate, asyncHandler(controller.getOneHandler))
//       .put(
//         authenticate,
//         validate(userValidator),
//         asyncHandler(controller.updateHandler),
//       )

//     app
//       .route("/api/auth/login")
//       .post(
//         validate(loginValidator),
//         loginRateLimiter,
//         asyncHandler(controller.login),
//       )
//     app.route("/api/auth/logout").post(asyncHandler(controller.logout))

//     app
//       .route("/api/auth/refresh_token")
//       .get(asyncHandler(controller.getAccessTokenFromRefreshToken))

//     app
//       .route(this.baseEndPoint + "/auth/changePassword/:id")
//       .post(asyncHandler(controller.changePassword))

//     app
//       .route("/api/auth/forgot-password")
//       .post(asyncHandler(controller.forgotPassword))

//     app
//       .route("/api/auth/reset-password")
//       .post(asyncHandler(controller.resetPasword))
//   }
// }
