import { useEffect } from "react"
import { SalesChart } from "../../components/SalesChart"
import { useFetchOrders } from "../../hooks/useOrder"
import { supabase } from "../../lib/supabaseClient"
import { useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "../../components/LoadingSpinner"

const AdminPage = () => {
  const { isPending, data } = useFetchOrders()

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
          queryClient.invalidateQueries({ queryKey: ["orders"] })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(changes)
    }
  }, [queryClient])

  if (isPending) {
    return (
      <div className="grid mt-10 place-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  const totalOrders = data?.pages[0].totalOrders
  const totalOrdersPending = data?.pages[0]?.totalPendingOrders
  console.log( data?.pages[0].totalOrders)
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Pending Orders" value={totalOrdersPending} />
        <StatCard title="Products" value="42" />
      </div>
      <div className=" mt-10">
        <SalesChart />
      </div>
    </div>
  )
}

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-[#1a1a1a] rounded-xl p-6">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-3xl font-bold text-yellow-400 mt-2">{value}</p>
  </div>
)

export default AdminPage
