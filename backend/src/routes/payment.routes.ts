import express from "express"
import * as paymentController from "../controllers/payment.controller"
const router = express.Router()

router.post("/signature", paymentController.generatePaymentSignature)
router.post("/complete", paymentController.completePayment)

export default router
