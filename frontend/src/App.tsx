import { Route, BrowserRouter as Router, Routes } from "react-router";
// import OrderDetails from "./components/AddItem";
import AdminPage from "./components/Dashboard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/CheckoutPage";
import AddressPage from "./pages/AddressPage";
import { useUser } from "./hooks/useAuth";
import { useGlobalState } from "./hooks/useGlobalState";
import { useCart } from "./hooks/useCart";
import { useEffect } from "react";

function App() {
  const { data: user, isPending, isSuccess: isUserSuccess, error } = useUser();
  const {
    data: cart,
    isSuccess,
    error: cartError,
  } = useCart();

  const { dispatch } = useGlobalState();

  useEffect(() => {
    if (isSuccess && isUserSuccess) {
      console.log(user);

      dispatch({ type: "SET_CART", payload: cart });
      dispatch({ type: "SET_USER", payload: user });
    }
  }, [cart, dispatch, isSuccess, isUserSuccess, user]);

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (error || cartError) {
    if (error) {
      return <div>{error.message}</div>;
    }
    return <div>{cartError?.message}</div>;
  }

  return (
    <Router>
      <ToastContainer theme="dark" autoClose={2000} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<ProtectedRoute  />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/address" element={<AddressPage />} />
          </Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
