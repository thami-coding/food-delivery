import { TfiDropboxAlt } from "react-icons/tfi"

import { InfiniteScrollTrigger } from "../../../components/InfiniteScrollTrigger"
import { useInfiniteOrders } from "../hooks"
import LoadingSpinner from "../../../components/LoadingSpinner"
import OrderDetails from "./OrderDetails"

type OrdersProps = {
  searchParams: URLSearchParams
}

export default function Orders({ searchParams }: OrdersProps) {
  const { isPending, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteOrders(searchParams)

  if (isPending) {
    return (
      <div className="grid place-content-center mt-30">
        <LoadingSpinner />
      </div>
    )
  }

  const orders = data?.pages[0]?.orders

  if (orders.length === 0) {
    return (
      <div className="text-center text-3xl grid place-content-center min-h-screen">
        <TfiDropboxAlt className="text-9xl mb-3" />
        <span>No Orders</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 pt-20">
      {orders.map((order) => {
        const { status, id, createdAt, items } = order
        const props = {
          status,
          createdAt,
          searchParams,
          orderId: id,
          orderedItems: items,
        }
        return <OrderDetails key={id} {...props} />
      })}

      <InfiniteScrollTrigger
        disabled={!hasNextPage}
        onIntersect={fetchNextPage}
      />

      {isFetchingNextPage && (
        <div className="grid place-content-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
