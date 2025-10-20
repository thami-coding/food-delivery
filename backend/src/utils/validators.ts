import { NextFunction, Request, Response } from "express";
import { body, ContextRunner, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

interface IValidationError {
  type?: string;
  msg?: string;
  path?: string;
  location?: string;
}
export const validateUserInput = [
  body("username")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("invalid username"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .escape()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    // .isLength({ min: 6, max: 12 })
    .isLength({ min: 5})
    .withMessage("Password must be at least 5 characters long")
    // .isStrongPassword({
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minSymbols: 1,
    //   minNumbers: 1,
    // })
    // .withMessage(
    //   "It should include at least one uppercase letter, one lowercase letter, one special symbol, and one numerical digit."
    // ),
];
export const validatePasswords = [
  body("oldPassword").trim().notEmpty().withMessage("Please enter your old password"),
  body("newPassword")
    .isLength({ min: 5 })
    // .isStrongPassword({
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minSymbols: 1,
    //   minNumbers: 1,
    // })
    // .withMessage(
    //   "Password Must have uppercase, lowercase, number, and symbol."
    // ),
];
export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    const errorMessages = errors.array().map((error: IValidationError) => {
      const obj = {};
      obj[error.path] = error.msg;
      return obj;
    });
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages });
  };
};
