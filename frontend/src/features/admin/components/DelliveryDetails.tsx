import { useRealTime, useUpdateOrder } from "../hooks"

export default function DelliveryDetails({
  user,
  status,
  orderId,
  searchParams,
}) {
  const { mutate } = useUpdateOrder(searchParams)
  const markAsDone = () => {
    mutate({ id: orderId, status: "done" })
  }

  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl">
      <div>
        <div className="grid gap-y-1.5">
          <p className="text-yellow-300 text-[1.2rem]">Noma {user.name}</p>
          <p className="text-yellow-300 text-[1.2rem]">{user.phoneNumber}</p>
          <p className="text-[1rem]">{user.streetAddress}</p>
          <p className="text-[1rem]">{user.suburb}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-sm px-4 py-1.5 rounded-full ${
            status === "delivery"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {status}
        </span>

        {status === "delivery" && (
          <button
            onClick={markAsDone}
            className="bg-yellow-300 hover:bg-yellow-400 text-[#202020] px-4 py-1.5 rounded-lg font-medium cursor-pointer"
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  )
}
