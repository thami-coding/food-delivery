import {
  generateSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
  pfValidSignature,
} from "../../../utils/payment.utiils"
import { orderRepository } from "../../../repositories/repos"

export const generatePaymentSignature = (body) => {
  const { totalAmount, name, orderId, email } = body

  const myData = {
    // Merchant details
    merchant_id: process.env.MERCHANT_ID,
    merchant_key: process.env.MERCHANT_KEY,
    return_url: process.env.RETURN_URL,
    notify_url: process.env.NOTIFY_URL,
    name_first: name,
    email_address: email,
    // Transaction details
    m_payment_id: orderId,
    amount: totalAmount.toString(),
    item_name: "food",
  }

  const passPhrase = process.env.PASS_PHRASE
  const signature = generateSignature(myData, passPhrase)
  return signature
}

export const completePayment = async (req) => {
  const orderRepo = orderRepository()
  const pfHost = "sandbox.payfast.co.za"
  const pfData = JSON.parse(JSON.stringify(req.body))

  let pfParamString = ""
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`
    }
  }

  // Remove last ampersand
  pfParamString = pfParamString.slice(0, -1)
  const passPhrase = process.env.PASS_PHRASE
  const amount = req.body.amount_gross
  const check1 = pfValidSignature(pfData, pfParamString, passPhrase)
  const check2 = await pfValidIP(req)
  const check3 = pfValidPaymentData(amount, pfData)
  const check4 = await pfValidServerConfirmation(pfHost, pfParamString)

  if (check1 && check2 && check3 && check4) {
    // All checks have passed, the payment is successful
    console.log("in success")
    const id = req.body.m_payment_id
    await orderRepo.update({ id }, { paymentStatus: "paid" })
    return true
  } else {
    console.log("in failure")
    // Some checks have failed, check payment manually and log for investigation
    return false
  }
}
