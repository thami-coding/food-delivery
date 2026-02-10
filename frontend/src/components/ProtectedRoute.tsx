import { Navigate, Outlet } from "react-router"
import { ErrorAlert } from "./ErrorAlert"
import LoadingSpinner from "./LoadingSpinner"
import { useUser } from "../features/user/hooks"

export default function ProtectedRoute() {
  const { data, isPending, isError, error } = useUser()

  if (isPending) {
    return (
      <div className="grid place-items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }
  
  if (isError && error?.statusCode >= 500) {
    return <ErrorAlert />
  }

  if (isError || !data.user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
