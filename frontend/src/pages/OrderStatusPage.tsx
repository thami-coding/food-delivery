import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useCreateOrder } from "../hooks/useOrder";
import LoadingSpinner from "../components/LoadingSpinner";
import { Error } from "../components/Error";

const OrderStatusPage = () => {
  const [status, setStatus] = useState<"preparing" | "done">("preparing");

  const { mutate, isPending, isError } = useCreateOrder()
  useEffect(() => {
    mutate()
  }, [])

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <Error />
  }
  return (
    <div className="min-h-screen bg-[#202020] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          {status === "preparing" ? (
            <div className="h-14 w-14 border-4 border-[#ffb900]/30 border-t-[#ffb900] rounded-full animate-spin" />
          ) : (
            <FaCheckCircle className="h-16 w-16 text-green-500" />

          )}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          {status === "preparing"
            ? "Order Being Prepared"
            : "Order Ready"}
        </h2>

        <p className="text-gray-400 mb-6">
          {status === "preparing"
            ? "We’ve received your order and our team is preparing it."
            : "Your order is ready!"}
        </p>

        <div className="inline-flex items-center gap-2 bg-[#202020] px-4 py-2 rounded-full border border-gray-700">
          {status === "preparing" ? (
            <>
              <span className="h-2 w-2 rounded-full bg-[#ffb900] animate-pulse" />
              <span className="text-sm text-gray-300">Preparing</span>
            </>
          ) : (
            <span className="text-sm text-green-400">Done</span>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Order #001
        </p>
      </div>
    </div>
  );
};

export default OrderStatusPage;