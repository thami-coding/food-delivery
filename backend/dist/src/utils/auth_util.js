"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.authenticate = exports.authorize = exports.encryptString = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("./common");
const encryptString = async (password) => {
    const encryptedString = await bcrypt_1.default.hash(password, 8);
    return encryptedString;
};
exports.encryptString = encryptString;
const authorize = (role) => async (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== role) {
        res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ status: "error", message: "Unauthorized" });
        return;
    }
    next();
};
exports.authorize = authorize;
const authenticate = async (req, res, next) => {
    const token = req.cookies.Authorization;
    if (!token) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "token is required",
            user: null,
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, common_1.SERVER_CONST.JWTSECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "Invalid or expired token",
        });
    }
};
exports.authenticate = authenticate;
const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
