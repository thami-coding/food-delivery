import { ErrorAlert } from "../../../components/ErrorAlert"
import { ErrorBoundary } from "react-error-boundary"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import DeliveryList from "../components/DeliveryList"

const DeliveryPage = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold capitalize  mb-10">
        Orders for delivey
      </h1>
      <div className="space-y-4">
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorAlert retry refetch={() => resetErrorBoundary()} />
          )}
        >
          <DeliveryList />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default DeliveryPage
