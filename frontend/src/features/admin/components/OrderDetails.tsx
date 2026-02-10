import moment from "moment"
import OrderButtons from "./OrderButtons"

type OrderDetailsProps = {
  orderId: string
  orderedItems: [] // TODO come backe to type this
  status: string
  createdAt: string
  searchParams: URLSearchParams
}
export default function OrderDetails({
  orderId,
  orderedItems,
  status,
  createdAt,
  searchParams,
}: OrderDetailsProps) {
  const orderButtonsProps = {
    status,
    orderId,
    searchParams,
  }

  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl">
      <div>
        <div className="grid gap-y-1.5">
          <p className="text-yellow-300 text-[1.2rem]">
            Order #{orderId.slice(0, 4)}
          </p>
          <p className="text-[1rem]">
            <span className="mr-2">
              {moment(createdAt).format("DD MMM YYYY")}
            </span>
            <span> {moment(createdAt).format("h:mm A")}</span>
          </p>

          {orderedItems?.map((item) => (
            <p key={item.id} className="text-sm text-gray-400">
              {item.product.name} x {item.quantity}
            </p>
          ))}
        </div>
      </div>

      <OrderButtons {...orderButtonsProps} />
    </div>
  )
}
