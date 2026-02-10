import { SalesChart } from "../components/SalesChart"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { useInfiniteOrders, useRealTime } from "../hooks"
import StatCard from "../components/StatCard"

export default function DashboardPage() {
  const { isPending, data } = useInfiniteOrders()
  useRealTime()

  if (isPending) {
    return (
      <div className="grid mt-10 place-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  const totalOrders = data?.pages[0].totalOrders
  const totalOrdersPending = data?.pages[0]?.totalPendingOrders

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
