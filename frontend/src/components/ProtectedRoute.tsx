import { Navigate, Outlet } from "react-router"
import LoadingSpinner from "./LoadingSpinner"
import { useUser } from "../features/user/hooks"

export default function ProtectedRoute() {
  const { data, isPending, isError } = useUser()

  if (isPending) {
    return (
      <div className="grid place-items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError || !data.user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
