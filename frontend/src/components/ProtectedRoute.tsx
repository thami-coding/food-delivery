import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute() {
  const { data: user, isError, error, isPending } = useUser();

  if (isPending) {
    return <h2>Loading user info...</h2>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
