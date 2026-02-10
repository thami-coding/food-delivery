import { Request, Response } from "express"
import * as paymentService from "../services/payment.service"
import { StatusCodes } from "http-status-codes"

export const generatePaymentSignature = async (req: Request, res: Response) => {
  const signature = paymentService.generatePaymentSignature(req.body)
  res.status(StatusCodes.OK).json({ status: "success", signature })
}

export const completePayment = async (req, res: Response) => {
  const isPaymentComplete = paymentService.completePayment(req)

  if (isPaymentComplete) {
    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Payment Successful" })
    return
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ status: "error", message: "Payment unSuccessful" })
}
