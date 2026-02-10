import { InfiniteScrollTrigger } from "../../../components/InfiniteScrollTrigger"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { useInfiniteProducts } from "../../products/hooks"
import SingleProduct from "./SingleProduct"

export default function ProductsCatalog() {
  const { isPending, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteProducts()

  if (isPending) {
    return (
      <div className="grid place-content-center w-full h-56">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-3 gap-x-14 text-white max-w-6xl justify-between gap-y-12 min-h-125`}
    >
      {data?.pages.flatMap((page) => {
        return page.products.map((product) => {
          const id = product.id as string
          return <SingleProduct key={id} {...product} />
        })
      })}
      <InfiniteScrollTrigger
        disabled={!hasNextPage}
        onIntersect={fetchNextPage}
      />
      {isFetchingNextPage && (
        <div className="mt-25">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
