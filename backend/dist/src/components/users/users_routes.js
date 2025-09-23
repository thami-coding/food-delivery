"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_controller_1 = require("./users_controller");
const auth_util_1 = require("../../utils/auth_util");
const validators_1 = require("../../utils/validators");
class UserRoutes {
    baseEndPoint = "/api/users";
    constructor(app) {
        const controller = new users_controller_1.usersController();
        app
            .route(this.baseEndPoint)
            .get(auth_util_1.authenticate, (0, auth_util_1.authorize)("admin"), controller.getAllHandler)
            .post((0, validators_1.validate)(validators_1.validateUserInput), controller.addHandler);
        app
            .route(this.baseEndPoint + "/me")
            .get(controller.getOneHandler);
        app
            .route(this.baseEndPoint + "/profile")
            .all(auth_util_1.authenticate)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
        app.route("/api/login").post(controller.login);
        app.route("/api/logout").post(controller.logout);
        app
            .route("/api/refresh_token")
            .get(controller.getAccessTokenFromRefreshToken);
        app
            .route(this.baseEndPoint + "/changePassword/:id")
            .post((0, validators_1.validate)(validators_1.validatePasswords), controller.changePassword);
        app.route("/api/forgot_password").post(controller.forgotPassword);
        app.route("/api/reset_password").post(controller.resetPasword);
    }
}
exports.UserRoutes = UserRoutes;
