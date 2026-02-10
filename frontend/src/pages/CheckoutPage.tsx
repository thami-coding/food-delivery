import { useNavigate } from "react-router"
import { calculateCartTotal } from "../lib/calculateTotal"
import LoadingSpinner from "../components/LoadingSpinner"
import { formatCurrency, toCents } from "../lib/formatCurrency"
import { useEffect, useState } from "react"
import { useStep } from "../store/stepsStore"
import { ErrorAlert } from "../components/ErrorAlert"
import Address from "../features/checkout/components/Address"
import { useUser } from "../features/user/hooks"
import ChangeAddress from "../features/checkout/components/ChangeAddress"
import PaymentMethod from "../features/checkout/components/PaymentMethod"
import Button from "../components/Button"
import { useCart } from "../features/cart/hooks"
import { useCreateOrder } from "../features/order/hooks"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("online")
  const userQuery = useUser()
  const order = useCreateOrder()
  const { setCurrentStep } = useStep()
  const navigate = useNavigate()
  const {
    data: cart,
    isPending: isPendingCart,
    isError: isErrorCart,
  } = useCart()

  useEffect(() => {
    if (order.isSuccess) {
      setCurrentStep(3)

      if (paymentMethod !== "online") {
        navigate("/order-status", { replace: true })
        return
      }
      navigate("/payment", { replace: true })
    }
  }, [navigate, order.isSuccess, paymentMethod, setCurrentStep])

  if (isPendingCart) {
    return (
      <div className="h-dvh grid place-content-center ">
        <LoadingSpinner />
      </div>
    )
  }

  if (isErrorCart || order.isError) {
    return (
      <ErrorAlert
        title="Error Placing Order"
        message="We’re sorry, an unexpected error occurred. Please try again later."
      />
    )
  }

  const deliveryPrice = toCents(20)
  const orderTotal = formatCurrency(calculateCartTotal(cart) + deliveryPrice)

  const handleClick = async () => {
    const address = userQuery?.data?.user?.streetAddress
    if (!address) {
      navigate("/profile")
      return
    }
    order.mutate(paymentMethod)
  }

  return (
    <section className="grid mt-10 justify-center">
      <div className="border text-gray-100 mx-auto w-lg px-5 py-8">
        <div className="flex justify-between">
          <h2 className=" tracking-wide text-gray font-bold">
            Delivery Address
          </h2>
          <ChangeAddress {...userQuery} />
        </div>
        <Address {...userQuery} />
        <PaymentMethod
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
        <p className="flex justify-between font-extrabold text-yellow-400 border-t border-white mt-5 pt-3">
          Total Payment <span>{orderTotal}</span>
        </p>
        <div className="flex justify-between pt-2">
          <span className="py-1.5">Discount</span>
          <span className="font-bold">R 0,00</span>
        </div>
        <Button
          handleClick={handleClick}
          buttonText="Place Order"
          isPending={order.isPending}
          loadingText="Creating Order"
        />
      </div>
    </section>
  )
}
