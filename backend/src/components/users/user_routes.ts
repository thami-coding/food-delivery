import { Express } from "express";
import { UserControllers } from "./user_controllers";
import { authenticate, authorize } from "../../utils/auth_util";
import {
  validate,
  validatePasswords,
  validateUserInput,
} from "../../utils/validators";

export class UserRoutes {
  private baseEndPoint = "/api/users";

  constructor(app: Express) {
    const controller = new UserControllers();

    app
      .route(this.baseEndPoint)
      .get(authenticate, authorize("admin"), controller.getAllHandler)
      .post(controller.addHandler);

    app
      .route(this.baseEndPoint + "/me")
      .get(authenticate, controller.getOneHandler)
      .put(authenticate, controller.updateHandler);

    app.route("/api/auth/login").post(controller.login);
    app.route("/api/auth/logout").post(controller.logout);

    app
      .route("/api/auth/refresh_token")
      .get(controller.getAccessTokenFromRefreshToken);

    app
      .route(this.baseEndPoint + "/auth/changePassword/:id")
      .post(validate(validatePasswords), controller.changePassword);

    app.route("/api/auth/forgot-password").post(controller.forgotPassword);

    app.route("/api/auth/reset-password").post(controller.resetPasword);
  }
}
