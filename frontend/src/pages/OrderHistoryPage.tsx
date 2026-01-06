import { Error } from "../components/Error";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetchUserOrders } from "../hooks/useOrder";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const orders = [
  {
    id: "ORD-1023",
    date: "2025-01-12",
    status: "Delivered",
    total: 24.99,
    items: [
      { name: "Burger", qty: 1 },
      { name: "Fries", qty: 2 },
      { name: "Coke", qty: 1 },
    ],
  },
  {
    id: "ORD-1024",
    date: "2025-01-20",
    status: "Pending",
    total: 18.5,
    items: [
      { name: "Pizza", qty: 1 },
      { name: "Garlic Bread", qty: 1 },
    ],
  },
  {
    id: "ORD-1024",
    date: "2025-01-20",
    status: "Pending",
    total: 18.5,
    items: [
      { name: "Pizza", qty: 1 },
      { name: "Garlic Bread", qty: 1 },
    ],
  },
  {
    id: "ORD-1024",
    date: "2025-01-20",
    status: "Pending",
    total: 18.5,
    items: [
      { name: "Pizza", qty: 1 },
      { name: "Garlic Bread", qty: 1 },
    ],
  },
];

   
const OrderHistoryPage = () => {

  const { isPending, isError,refetch,isFetching} = useFetchUserOrders()

  if (isPending) {
    return <div className="grid place-content-center mt-30 ml-40">
      <LoadingSpinner />
    </div>
  }

  if (isError) {
    return <Error refetch={refetch} isFetching={isFetching}/>
  }
  return (
    <div className="max-w-4xl mx-auto p-4 mt-15">

      <div className="space-y-4 mt-15">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-neutral-800 rounded-lg shadow-sm  p-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-medium text-neutral-50">
                  Order #{order.id}
                </p>
                <p className="text-sm text-neutral-50">{order.date}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]
                  }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <ul className="text-sm text-neutral-50 mb-3">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="flex justify-between items-center border-t text-neutral-200 pt-3">
              <span className="font-semibold text-neutral-50">
                Total
              </span>
              <span className="font-semibold text-neutral-200">
                R{" "}{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;