import express from "express"
import { authenticate, authorize } from "../../../utils/auth.utils"
import * as orderControllers from "../controllers/order.controller"
const router = express.Router()

router.use(authenticate)

router.post("/", orderControllers.createOrder)
router.get("/",authorize("admin"), orderControllers.getAllOrders)
router.get("/me", orderControllers.getUserOrders)
router.get("/new", orderControllers.getLatestOrder)
router.patch("/",authorize("admin"), orderControllers.updateOrder)

export default router
