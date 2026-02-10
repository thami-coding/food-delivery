import { Categories } from "../features/products/components/Categories"
import { useState } from "react"
import { useDialog } from "../features/products/dialogStore"
import { ErrorAlert } from "../components/ErrorAlert"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import Products from "../features/products/components/Products"
import type { Category } from "../features/products/types"
import { ErrorBoundary } from "react-error-boundary"
import Product from "../features/products/components/Product"

const ProductsPage = () => {
  const [category, setCategory] = useState<Category>("all")
  const isDialogOpen = useDialog((state) => state.isDialogOpen)
  const { reset } = useQueryErrorResetBoundary()
  
  return (
    <section className="grid place-items-center relative ">
      <div className="mt-30 z-30 w-full  ">
        <Categories setCategory={setCategory} selectedCategory={category} />
      </div>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorAlert retry refetch={() => resetErrorBoundary()} />
        )}
      >
        <Products category={category} />
      </ErrorBoundary>
      {isDialogOpen && <Product />}
    </section>
  )
}

export default ProductsPage
