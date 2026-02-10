import DashboardLayout from "../../layouts/DashboardLayout"
import DashboardPage from "./pages/DashboardPage"
import AllProductsPage from "./pages/AllProductsPage"
import AddProductsPage from "./pages/AddProductPage"
import EditProductPage from "./pages/EditProductPage"
import OrdersPage from "./pages/OrdersPage"
import DeliveryPage from "./pages/DeliveryPage"

export const adminRoutes = [
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <AllProductsPage /> },
      { path: "products/new", element: <AddProductsPage /> },
      { path: "products/edit/:id", element: <EditProductPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "deliveries", element: <DeliveryPage /> },
      // { path: "*", element: <NotFound /> },
    ],
  },
]
