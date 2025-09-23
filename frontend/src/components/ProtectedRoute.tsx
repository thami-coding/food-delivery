import { Navigate, Outlet } from "react-router";
import { useGlobalState } from "../hooks/useGlobalState";

export default function ProtectedRoute() {
  const { state } = useGlobalState();
  console.log(state.user);

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
