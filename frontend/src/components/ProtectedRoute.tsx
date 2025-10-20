import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isError, error, isPending } = useUser();

  if (isPending) {
    return <h2>Loading User Info</h2>;
  }

  if (isError) {
    <p>{error?.message}</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
