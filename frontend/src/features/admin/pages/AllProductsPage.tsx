import { ErrorBoundary } from "react-error-boundary"
import ProductsCatalog from "../components/ProductsCatalog"
import { ErrorAlert } from "../../../components/ErrorAlert"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"

export default function AllProductsPage() {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <>
      <h1 className="text-2xl font-semibold mb-12">All Products</h1>
      <section className="px-6 ">
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorAlert retry refetch={() => resetErrorBoundary()} />
          )}
        >
          <ProductsCatalog />
        </ErrorBoundary>
      </section>
    </>
  )
}
