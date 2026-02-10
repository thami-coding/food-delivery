import { Navigate, Outlet } from "react-router"
import { ErrorAlert } from "../../../components/ErrorAlert"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { useUser } from "../../user/hooks"

export default function AdminProtectedRoutes() {
  const { data, isPending, isError, error } = useUser()
  const user = data?.user
  
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

  if (user?.role !== "admin") {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
