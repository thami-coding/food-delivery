import { useEffect, useState } from "react"

import { ErrorAlert } from "../../../components/ErrorAlert"
import DateRangeFilter from "../components/DateFilter"
import {
  useQueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import Orders from "../components/Orders"
import { useSearchParams } from "react-router"
import { supabase } from "../../../lib/supabaseClient"

const OrdersPage = () => {
  const [open, setOpen] = useState(false)
  const { reset } = useQueryErrorResetBoundary()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams({
    dateRange: "today",
    status: "preparing",
  })

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
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          console.log(payload)
          console.log("realtime")
          queryClient.invalidateQueries({
            queryKey: ["orders", { dateRange: "today", status: "preparing" }],
          })
        },
      )
      .subscribe((__, error) => {
        console.log(error)
      })

    return () => {
      supabase.removeChannel(changes)
    }
  }, [queryClient])
  const dateRangeProps = {
    open,
    setOpen,
    setSearchParams,
    searchParams,
  }

  return (
    <div>
      <div className="fixed right-0">
        <DateRangeFilter {...dateRangeProps} />
      </div>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorAlert retry refetch={() => resetErrorBoundary()} />
        )}
      >
        <Orders searchParams={searchParams} />
      </ErrorBoundary>
    </div>
  )
}

export default OrdersPage
