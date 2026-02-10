import express from "express"
import { authenticate, authorize } from "../../../utils/auth.utils"
import * as productController from "../controllers/product.controller"
import { validate } from "../../../validator/validate"
import { ProductSchema } from "../../../schemas/validation/product.validation.schema"

const router = express.Router()

router.post("/seed", productController.seedProducts)
router.get("/", productController.getAllProducts)

router
  .route("/")
  .all(authenticate, authorize("admin"))
  .post(validate(ProductSchema), productController.addProduct)

router
  .route("/:id")
  .all(authenticate, authorize("admin"))
  .get(productController.getProduct)
  .delete(productController.removeProduct)
  .put(validate(ProductSchema), productController.editProduct)

export default router
