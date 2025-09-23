"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validatePasswords = exports.validateUserInput = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
exports.validateUserInput = [
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .escape()
        .withMessage("It should be required"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .isEmail()
        .escape()
        .withMessage("It should be valid email address"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .isLength({ min: 6, max: 12 })
        .withMessage("It must be between  and 12 characters in length")
        .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    })
        .withMessage("It should include at least one uppercase letter, one lowercase letter, one special symbol, and one numerical digit."),
];
exports.validatePasswords = [
    (0, express_validator_1.body)("oldPassword").trim().notEmpty().withMessage("It should be required"),
    (0, express_validator_1.body)("newPassword")
        .isLength({ min: 6, max: 12 })
        .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    })
        .withMessage("Password Must have uppercase, lowercase, number, and symbol."),
];
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            next();
            return;
        }
        const errorMessages = errors.array().map((error) => {
            const obj = {};
            obj[error.path] = error.msg;
            return obj;
        });
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errorMessages });
    };
};
exports.validate = validate;
