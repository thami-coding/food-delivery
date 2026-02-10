import { InfiniteScrollTrigger } from "../../../components/InfiniteScrollTrigger"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ProductCard from "./ProductCard"
import { useInfiniteProducts } from "../hooks"
import type { Category } from "../types"
import ShimmerLoader from "./ShimmerLoader"

type ProductsProps = {
  category: Category
}
export default function Products({ category }: ProductsProps) {
  const { isPending, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteProducts(category)

  if (isPending) {
    return (
      <div className="grid place-content-center w-full h-56">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div
      className={`mt-30 grid grid-cols-3 gap-x-14 text-white max-w-6xl justify-between gap-y-12 min-h-125`}
    >
      {data?.pages.map((page) => {
        return page.products.map((product) => {
          return <ProductCard key={product.id} {...product} />
        })
      })}
      {isFetchingNextPage && <ShimmerLoader />}
      <InfiniteScrollTrigger
        disabled={!hasNextPage}
        onIntersect={fetchNextPage}
      />
    </div>
  )
}
