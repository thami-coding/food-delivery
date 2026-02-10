import LoadingSpinner from "../components/LoadingSpinner"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { ErrorAlert } from "../components/ErrorAlert"
import { useOrder } from "../features/order/hooks"
import { supabase } from "../lib/supabaseClient"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

const OrderStatusPage = () => {
  const { isPending, isError, data:order } = useOrder()

   const queryClient = useQueryClient()
 
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
       .channel("schema-db-changes")
       .on(
         "postgres_changes",
         {
           event: "UPDATE",
           schema: "public",
         },
         (payload) => {
           console.log(payload)
           console.log("realtime")
           queryClient.invalidateQueries({ queryKey: ["order"] })
         },
       )
       .subscribe((__, error) => {
         console.log(error)
       })
 
     return () => {
       supabase.removeChannel(changes)
     }
   }, [queryClient])

  const statusAnimation = {
    done: <DotLottieReact src="/animation/success.lottie" loop autoplay />,
    preparing: (
      <div className="mt-20 mb-10">
        <LoadingSpinner />
      </div>
    ),
    delivery: <DotLottieReact src="/animation/scooter.lottie" loop autoplay />,
  }
  const orderStatus = {
    done: "Your order has arrived",
    preparing: "We’ve received your order and our team is preparing it.",
    delivery: "Your order is on it's way be on the look out",
  }
  const orderStatusHeading = {
    done: "Your Food Is Here!",
    preparing: "Order Being Prepared",
    delivery: "Order Out For Delivery",
  }

  if (isPending) {
    return (
      <div className="grid h-dvh place-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="grid h-dvh place-content-center">
        <ErrorAlert />
      </div>
    )
  }
  console.log(order)

  const status = order.status as "done" | "delivery" | "preparing"

  return (
    <div className="min-h-screen bg-[#202020] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center">{statusAnimation[status]}</div>
        <h2 className="text-2xl font-semibold text-white mb-2 mt-6 ">
          {orderStatusHeading[status]}
        </h2>
        <p className="text-gray-400 mb-6">{orderStatus[status]}</p>
        <div className="inline-flex items-center gap-2 bg-[#202020] px-4 py-2 rounded-full border border-gray-700">
          {status === "done" ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">{status}</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-[#ffb900] animate-pulse" />
              <span className="text-sm text-gray-300">{status}</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Order#{order.id.slice(0, 6)}
        </p>
      </div>
    </div>
  )
}

export default OrderStatusPage
