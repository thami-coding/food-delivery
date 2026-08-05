import { Navigate, Outlet } from "react-router"
import { ErrorAlert } from "../../../components/ErrorAlert"
import { useUser } from "../../user/hooks"
import type { HttpError } from "../../../lib/errors/HttpError"

export default function AdminProtectedRoutes() {
  const { data, isPending, isError, error } = useUser()
  const user = data?.user
  const err = error as HttpError

  if (isPending) {
    return null
  }

  if (isError && err.statusCode >= 500) {
    return <ErrorAlert />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== "admin") {
    return <Navigate to="/access-denied" />
  }

  return <Outlet />
}
