import { useEffect } from "react"
import { fromCents, toCents } from "../../../lib/formatCurrency"
import PaymentHiddenInputs from "./PaymentHiddenInputs"
import { useStep } from "../../../store/stepsStore"
import PaymentSummary from "./PaymentSummary"
import { usePaymentSignature } from "../hooks"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { ErrorAlert } from "../../../components/ErrorAlert"

export default function Payment({ order }) {
  const { isPending, isError, data: signature } = usePaymentSignature(order)
  const { setCurrentStep } = useStep()
  const delivery = toCents(20)
  const totalAmount = fromCents(order.totalAmount).toString()

  useEffect(() => {
    setCurrentStep(3)
  }, [setCurrentStep])

  if (isError) {
    return <ErrorAlert />
  }

  return (
    <div className="min-h-[70vh] grid place-content-center px-4 mt-10">
      <form action="https://sandbox.payfast.co.za/eng/process" method="post">
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <PaymentHiddenInputs
              totalAmount={totalAmount}
              signature={signature}
              order={order}
            />
            <PaymentSummary order={order} delivery={delivery} />
          </>
        )}
      </form>
    </div>
  )
}
