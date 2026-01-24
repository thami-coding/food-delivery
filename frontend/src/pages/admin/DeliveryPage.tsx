import { TfiDropboxAlt } from "react-icons/tfi"
import { useFetchOrders, useUpdateOrder } from "../../hooks/useOrder"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import LoadingSpinner from "../../components/LoadingSpinner"
import { ErrorAlert } from "../../components/ErrorAlert"
import ConfirmModal from "../../components/ConfirmModal"
import { useDeleteDialog } from "../../store/deleteModalStore"


const DeliveryPage = () => {
  const filters = { dateRange: null, status: "delivery" }
  const {
    isPending,
    isError,
    data,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage
  } = useFetchOrders(filters)
  const { mutate } = useUpdateOrder(filters)
  const queryClient = useQueryClient()
  const bottomRef = useRef<HTMLDivElement>(null)
  const { toggleDialog } = useDeleteDialog()
  const [orderId, setOrderId] = useState("")

  const markAsDone = (id: string) => {
    toggleDialog()
    setOrderId(id)
  }

  const title = "Confirm Delivery"
  const message = "Confirm Order was delivered successfully"
  useEffect(() => {
    const realtimeAuth = async () => {
      try {
        await supabase.realtime.setAuth()

      } catch (error) {
        console.log(error)
      }
    }
    realtimeAuth()

    const changes = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["deliveries"] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(changes)
    }
  }, [])

  useEffect(() => {
    if (!hasNextPage || !bottomRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        threshold: 1,
      }
    )
    observer.observe(bottomRef.current)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  if (isPending) {
    return <div className="grid place-content-center mt-30">
      <LoadingSpinner />
    </div>
  }

  if (isError) {
    return <ErrorAlert refetch={refetch} retry={true} />
  }

  if (data.pages[0].orders.length === 0) {
    return <div className="text-center text-3xl grid place-content-center min-h-screen">
      <TfiDropboxAlt className="text-9xl  mb-3" />
      <span >No Orders</span></div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold capitalize  mb-10">Orders for delivey</h1>
      <div className="space-y-4">
        {data.pages.map((page) => (
          page.orders.map((order) => (<div
            key={order.id}
            className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl"
          >
            <div>
              <div className="grid gap-y-1.5">
                <p className="text-yellow-300 text-[1.2rem]">Noma {order.user.name}</p>
                <p className="text-yellow-300 text-[1.2rem]"> {order.user.phoneNumber}</p>
                <p className="text-[1rem]">{order.user.streetAddress}</p>
                <p className="text-[1rem]">{order.user.suburb}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-sm px-4 py-1.5 rounded-full ${order.status === "delivery"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
                  }`}
              >
                {order.status}
              </span>

              {order.status === "delivery" && (
                <button
                  onClick={() => markAsDone(order.id)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-[#202020] px-4 py-1.5 rounded-lg font-medium cursor-pointer"
                >
                  Mark Done
                </button>
              )}
            </div>
          </div>
          ))
        ))}
      </div>

      <ConfirmModal
        id={orderId}
        title={title}
        message={message}
        mutate={mutate}
        status="done" />

      <div ref={bottomRef} className="h-10" />
      {isFetchingNextPage && <div className="grid place-content-center">
        <LoadingSpinner />
      </div>}
    </div>
  )
}

export default DeliveryPage