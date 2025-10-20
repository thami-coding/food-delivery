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
import NotFoundPage from "./pages/NotFoundPage";

function App() {

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
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
