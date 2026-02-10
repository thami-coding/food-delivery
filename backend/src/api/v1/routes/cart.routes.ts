import express from "express"
import * as cartController from "../controllers/cart.controller"
import { authenticate } from "../../../utils/auth.utils"
import { validate } from "../../../validator/validate"
import { CartSchema } from "../../../schemas/validation/cart.validation.schema"
const router = express.Router()

router.use(authenticate)
router.get("/", cartController.getDetailedCart)
router.post("/",validate(CartSchema), cartController.createCartItem)
router.patch("/", validate(CartSchema), cartController.updateCart)
router.delete("/:productId", cartController.deleteCartItem)
router.delete("/clear", cartController.clearCart)

export default router
