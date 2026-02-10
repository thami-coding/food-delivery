import { TfiDropboxAlt } from "react-icons/tfi"
import LoadingSpinner from "../../../components/LoadingSpinner"
import DelliveryDetails from "./DelliveryDetails"
import { useInfiniteOrders, useRealTime } from "../hooks"
import { InfiniteScrollTrigger } from "../../../components/InfiniteScrollTrigger"
import { useSearchParams } from "react-router"

export default function DeliveryList() {
  const [searchParams, setSeachParams] = useSearchParams({
    dateRange: "today",
    status: "delivery",
  })
  useRealTime()
  const { isPending, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteOrders(searchParams)

  if (isPending) {
    return (
      <div className="grid place-content-center mt-30">
        <LoadingSpinner />
      </div>
    )
  }

  const orders = data?.pages[0].orders
  if (orders?.length === 0) {
    return (
      <div className="text-center text-3xl grid place-content-center min-h-screen">
        <TfiDropboxAlt className="text-9xl  mb-3" />
        <span>No Orders</span>
      </div>
    )
  }

  return (
    <>
      {orders.map((order) => {
        const { status, user, id } = order
        const deliveryProps = { status, user, searchParams, orderId: id }
        return <DelliveryDetails key={id} {...deliveryProps} />
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
    </>
  )
}
