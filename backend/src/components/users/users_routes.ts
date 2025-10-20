import { Express } from "express";
import { usersController } from "./users_controller";
import { authenticate, authorize } from "../../utils/auth_util";
import {
  validate,
  validatePasswords,
  validateUserInput,
} from "../../utils/validators";

export class UserRoutes {
  private baseEndPoint = "/api/users";

  constructor(app: Express) {
    const controller = new usersController();

    app
      .route(this.baseEndPoint)
      .get(authenticate, authorize("admin"), controller.getAllHandler)
      .post(validate(validateUserInput), controller.addHandler);

    app
      .route(this.baseEndPoint + "/me")
      .get(controller.getOneHandler);

    app
      .route(this.baseEndPoint + "/profile")
      .all(authenticate)
      .put(controller.updateHandler)
      .delete(controller.deleteHandler);

    app.route("/api/auth/login").post(controller.login);
    app.route("/api/auth/logout").post(controller.logout);

    app
      .route("/api/auth/refresh_token")
      .get(controller.getAccessTokenFromRefreshToken);

    app
      .route(this.baseEndPoint + "/auth/changePassword/:id")
      .post(validate(validatePasswords), controller.changePassword);

    app.route("/api/auth/forgot_password").post(controller.forgotPassword);

    app.route("/api/auth/reset_password").post(controller.resetPasword);
  }
}
