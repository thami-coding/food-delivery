import express from "express"
import * as userController from "../controllers/user.controller"
import asyncHandler from "express-async-handler"
import { validate } from "../../../validator/validate"
import { authenticate, authorize } from "../../../utils/auth.utils"
import { UserSchema } from "../../../schemas/validation/user.schema"

const router = express.Router()

router.get("/me", authenticate, asyncHandler(userController.getUser))
router.delete("/", authenticate, asyncHandler(userController.deleteUser))

router.get(
  "/",
  authenticate,
  authorize("admin"),
  asyncHandler(userController.getAllUsers),
)

router.patch(
  "/me",
  authenticate,
  validate(UserSchema),
  asyncHandler(userController.updateUser),
)

export default router
