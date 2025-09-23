"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUtil = exports.usersController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const base_controller_1 = require("../../utils/base_controller");
const auth_util_1 = require("../../utils/auth_util");
const users_service_1 = require("./users_service");
const common_1 = require("../../utils/common");
const server_config_json_1 = __importDefault(require("../../../server_config.json"));
const notification_util_1 = require("../../utils/notification_util");
const CacheUtil_1 = require("../../utils/CacheUtil");
class usersController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        try {
            const user = req.body;
            const isEmailRegistered = await UsersUtil.getUserByEmail(user.email);
            console.log(isEmailRegistered);
            if (isEmailRegistered) {
                res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    status: "error",
                    msg: "This email is already in use. Please try logging in or use a different email address.",
                });
                return;
            }
            user.email = user?.email?.toLowerCase();
            user.username = user.username?.toLowerCase();
            user.password = await (0, auth_util_1.encryptString)(user.password);
            const service = new users_service_1.UsersService();
            const createdUser = await service.create(user);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(createdUser);
        }
        catch (error) {
            console.log(`Error while adding User: ${error.message}`);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
            });
        }
    }
    async getAllHandler(req, res) {
        const service = new users_service_1.UsersService();
        const { data } = await service.findAll(req.query);
        if (data.length > 0) {
            data.forEach((user) => delete user.password);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", users: data });
    }
    async getOneHandler(req, res) {
        const userId = req.session.userId;
        console.log(userId);
        if (!userId) {
            res.status(200).json({ status: "success", user: null });
            return;
        }
        try {
            const service = new users_service_1.UsersService();
            const user = await service.findOne(userId);
            if (!user) {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ status: "error", message: "User Not Found", user: null });
                return;
            }
            const userInfo = {
                userId: user.userId,
                username: user.username,
                email: user.email,
                role: user.role,
            };
            res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", user: userInfo });
        }
        catch (error) {
            console.log(error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: "error", message: error.message });
        }
    }
    updateHandler(req, res) {
    }
    async deleteHandler(req, res) {
        const service = new users_service_1.UsersService();
        const result = await service.delete(req.params.id);
        if (!result) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: "errror",
                message: "Something went wrong.Couldn't delete user",
            });
            return;
        }
        CacheUtil_1.CacheUtil.remove("User", req.params.id);
        res
            .status(http_status_codes_1.StatusCodes.NO_CONTENT)
            .json({ status: "success", message: "user successfully deleted" });
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await UsersUtil.getUserByEmail(email);
        if (!user) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND) });
            return;
        }
        const isMatch = await (0, auth_util_1.comparePasswords)(password, user.password);
        if (!isMatch) {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ error: "Password is not valid" });
            return;
        }
        const userDetails = {
            email: user.email,
            username: user.username,
            userId: user.userId,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(userDetails, common_1.SERVER_CONST.JWTSECRET, {
            expiresIn: common_1.SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS,
        });
        const refreshToken = jsonwebtoken_1.default.sign(userDetails, common_1.SERVER_CONST.JWTSECRET, {
            expiresIn: common_1.SERVER_CONST.REFRESH_TOKEN_EXPIRY_TIME_SECONDS,
        });
        res.cookie("Authorization", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        req.session.userId = user.userId;
        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "success",
            message: "successfully logged in",
            data: userDetails,
        });
    }
    async getAccessTokenFromRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        jsonwebtoken_1.default.verify(refreshToken, common_1.SERVER_CONST.JWTSECRET, (err, user) => {
            if (err) {
                res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ status: "error", message: "Invalid Refesh Token" });
                return;
            }
            const accessToken = jsonwebtoken_1.default.sign(user, common_1.SERVER_CONST.JWTSECRET, {
                expiresIn: common_1.SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS,
            });
            res.cookie("Authorization", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                message: "logged back in from refresh token",
            });
        });
    }
    async changePassword(req, res) {
        const { oldPassword, newPassword } = req.body;
        const service = new users_service_1.UsersService();
        const user = await service.findOne(req.params.id);
        if (!user) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ status: "error", message: "User Not Found" });
            return;
        }
        try {
            const isMatch = await (0, auth_util_1.comparePasswords)(oldPassword, user.password);
            if (!isMatch) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: "Incorrect old password. Please try again.",
                });
                return;
            }
            user.password = await (0, auth_util_1.encryptString)(newPassword);
            await service.update(req.params.id, user);
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ status: "success", message: "Password updated successfully" });
        }
        catch (error) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: "error", message: error.message });
        }
    }
    async forgotPassword(req, res) {
        const { email } = req.body;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
            });
            return;
        }
        const user = await UsersUtil.getUserByEmail(email);
        if (!user) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ status: "error", message: "Invalid Email" });
        }
        const resetToken = jsonwebtoken_1.default.sign({ email: email }, common_1.SERVER_CONST.JWTSECRET, {
            expiresIn: "1h",
        });
        const resetLink = `${server_config_json_1.default.front_app_url}/reset-password?token=${resetToken}`;
        const mailOptions = {
            to: email,
            subject: "Password Reset",
            html: ` Hello ${user.username},<p>We received a request to reset your password. If you didn't initiate this request, please ignore this email.</p>
           <p>To reset your password, please click the link below:</p>
           <p><a href="${resetLink}" style="background-color: #fcc800; color: #030712; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Password</a></p>
           <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
           <p>${resetLink}</p>
           <p>This link will expire in 1 hour</p>
           <p>If you didn't request a password reset, you can safely ignore this email.</p>
           <p>Best regards,<br>GRILL 'N GO</p>`,
        };
        const emailStatus = await notification_util_1.NotificationUtil.enqueueEmail(mailOptions.to, mailOptions.subject, mailOptions.html);
        if (emailStatus) {
            res.status(200).json({
                status: "success",
                message: "Password reset link has been sent to your email",
                resetToken,
            });
        }
        else {
            res
                .status(400)
                .json({ status: "error", message: "something went wrong try again" });
        }
    }
    async resetPasword(req, res) {
        const { newPassword, resetToken } = req.body;
        const service = new users_service_1.UsersService();
        let email;
        try {
            const decode = jsonwebtoken_1.default.verify(resetToken, common_1.SERVER_CONST.JWTSECRET);
            if (!decode) {
                throw new Error("Invalid Reset Token");
            }
            email = decode["email"];
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                status: "error",
                message: "Reset Token is invalid or expired",
            });
            return;
        }
        try {
            const user = await UsersUtil.getUserByEmail(email);
            if (!user) {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ status: "error", message: "user not found" });
                return;
            }
            user.password = await (0, auth_util_1.encryptString)(newPassword);
            const updatedUser = await service.update(user.userId, user);
            if (!updatedUser) {
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ status: "error", message: "Invalid data" });
                return;
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ status: "success", message: "Password updated successfully" });
        }
        catch (error) {
            console.log(error.message);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: "error", message: "Internal Server error" });
        }
    }
    async logout(req, res) {
        res.clearCookie("Authorization");
        res.clearCookie("refreshToken");
        if (req.session.userId) {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Session destruction error:", err);
                }
                else {
                    console.log("Session destroyed successfully");
                }
            });
        }
        res
            .status(http_status_codes_1.StatusCodes.NO_CONTENT)
            .json({ status: "success", message: "logged out" });
    }
}
exports.usersController = usersController;
class UsersUtil {
    static async getUserByEmail(email) {
        try {
            if (email) {
                const service = new users_service_1.UsersService();
                const users = await service.customQuery(`email = '${email}'`);
                if (users && users.length > 0) {
                    return users[0];
                }
            }
        }
        catch (error) {
            console.log(error.message);
        }
        return null;
    }
    static async cacheAllUsers() {
        const usersService = new users_service_1.UsersService();
        try {
            const { data } = await usersService.findAll({});
            console.log(data);
            if (data.length > 0) {
                data.forEach((user) => {
                    CacheUtil_1.CacheUtil.set("User", user.userId, user);
                });
                console.log(`All users successfully cached`);
            }
            else {
                console.log(`There are no users in database`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.UsersUtil = UsersUtil;
