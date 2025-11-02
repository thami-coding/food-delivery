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
  private authBasePoint = "/api/auth";

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

      // Auhthentication routes
    app.route(this.authBasePoint +"/login").post(controller.login);
    app.route(this.authBasePoint +"/logout").post(controller.logout);
    app
      .route(this.authBasePoint +"/refresh_token")
      .get(controller.getAccessTokenFromRefreshToken);
    app
      .route(this.authBasePoint + "/change_password/:id")
      .post(validate(validatePasswords), controller.changePassword);
    app.route(this.authBasePoint +"/forgot_password").post(controller.forgotPassword);
    app.route(this.authBasePoint +"/reset_password").post(controller.resetPasword);
  }
}
