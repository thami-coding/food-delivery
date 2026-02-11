import { createBrowserRouter } from "react-router"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import MainLayout from "../layouts/MainLayout"
import CartPage from "../pages/CartPage"
import ProtectedRoute from "../components/ProtectedRoute"
import CheckoutPage from "../pages/CheckoutPage"
import ProfilePage from "../pages/ProfilePage"
import CheckoutLayout from "../layouts/CheckoutLayout"
import PaymentPage from "../pages/PaymentPage"
import { adminRoutes } from "../features/admin/adminRoutes"
import OrderStatusPage from "../pages/OrderStatusPage"
import ForgotPaswordPage from "../pages/ForgotPasswordPage"

export const router = createBrowserRouter([
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignupPage /> },
  { path: "forgot-password", element: <ForgotPaswordPage /> },
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <CheckoutLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "payment", element: <PaymentPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "order-status", element: <OrderStatusPage /> }],
  },
  ...adminRoutes,
])
