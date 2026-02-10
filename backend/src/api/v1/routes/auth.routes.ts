import express from "express"
import * as authController from "../controllers/auth.controller"
import { validate } from "../../../validator/validate"
import asyncHandler from "express-async-handler"
import { loginRateLimiter } from "../../../middleware/loginRateLimiter"
import {
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  RegisterSchema,
} from "../../../schemas/validation/auth.validation.schema"

const router = express.Router()

router.post(
  "/register",
  validate(RegisterSchema),
  asyncHandler(authController.signup),
)

router.post(
  "/login",
  validate(LoginSchema),
  loginRateLimiter,
  asyncHandler(authController.login),
)

router.post("/refresh", authController.refreshToken)

router.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  asyncHandler(authController.forgotPassword),
)

router.post(
  "/reset-password",
  validate(ResetPasswordSchema),
  asyncHandler(authController.resetPassword),
)

router.post("/logout", asyncHandler(authController.logout))

export default router
