import { useUpdateOrder } from "../hooks"
import { useConfirm } from "../store/confirmStore"

type OrderButtonsProps = {
  searchParams: URLSearchParams
  status: string
  orderId: string
}
export default function OrderButtons({
  status,
  orderId,
  searchParams,
}: OrderButtonsProps) {
  const { mutate } = useUpdateOrder(searchParams)
  const { openConfirm } = useConfirm()

  const openDialog = () => {
    openConfirm({
      title: "Order Completion",
      message: "Confirm Completetion of order",
      btnText: "Done",
      onConfirm: () => {
        mutate({ id: orderId, status: "delivery" })
      },
    })
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <span
          className={`text-sm px-4 py-1.5 rounded-full ${
            status === "preparing"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {status != "preparing" ? "done" : "pending"}
        </span>

        {status === "preparing" && (
          <button
            onClick={openDialog}
            className="bg-yellow-300 hover:bg-yellow-400 text-[#202020] px-4 py-1.5 rounded-lg font-medium cursor-pointer"
          >
            Mark Done
          </button>
        )}
      </div>
    </>
  )
}
