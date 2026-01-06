import { Route, BrowserRouter as Router, Routes } from "react-router";
// import OrderDetails from "./components/AddItem";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/ProfilePage";
import ProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import AdminPage from "./pages/admin/AdminPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductsListPage from "./pages/ProductsPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {

  return (
    <Router>
      <ToastContainer theme="dark" autoClose={2000} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/status" element={<OrderStatusPage />} />
            <Route path="/order/history" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<AdminPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
