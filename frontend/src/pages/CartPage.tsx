import { calculateCartTotal } from "../lib/calculateTotal"
import { useStep } from "../store/stepsStore"
import { useEffect } from "react"
import EmptyCart from "../features/cart/components/EmptyCart"
import OrderSummarry from "../features/cart/components/OrderSummarry"
import CartItems from "../features/cart/components/CartItems"
import { useCart } from "../features/cart/hooks"
import { ErrorAlert } from "../components/ErrorAlert"
import CartTotal from "../features/cart/components/CartTotal"

export default function CartPage() {
  const { data: cart, isPending, error, isError } = useCart()
  const { setCurrentStep } = useStep()

  useEffect(() => {
    setCurrentStep(2)
  }, [setCurrentStep])

  if (isPending) {
    return
  }

  if (isError && error?.statusCode >= 500) {
    return <ErrorAlert />
  }

  if (cart === undefined || cart?.length === 0) {
    return <EmptyCart />
  }

  const cartTotal = calculateCartTotal(cart)

  return (
    <section className="mt-30 w-screen flex px-2.5 flex-col gap-y-10 lg:flex-row md:px-5 md:gap-x-10 items-center lg:justify-between lg:items-start">
      <div className="text-white overflow-y-auto rounded-md max-w-140">
        <h2 className="text-2xl font-bold  fixed top-20">Cart Items</h2>
        <CartItems cart={cart} />
        <CartTotal cartTotal={cartTotal} />
      </div>
      <OrderSummarry cartTotal={cartTotal} />
    </section>
  )
}
