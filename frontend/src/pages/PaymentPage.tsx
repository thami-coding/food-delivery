import LoadingSpinner from "../components/LoadingSpinner"
import Payment from "../features/payment/components/Payment"
import { ErrorAlert } from "../components/ErrorAlert"
import log from "loglevel"
import { useOrder } from "../features/order/hooks"

export default function PaymentPage() {
  const { data: order, isPending, isError, error } = useOrder()
  
  if (isPending) {
    return (
      <div className="h-dvh grid place-content-center ">
        <LoadingSpinner />
      </div>
    )
  }
  
  if (isError) {
    log.error(error)
    return (
      <div className="mt-20">
        <ErrorAlert />
      </div>
    )
  }

  return <Payment order={order} />
}
