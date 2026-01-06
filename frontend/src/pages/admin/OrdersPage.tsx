import { useFetchOrders } from "../../hooks/useOrder";
import { TfiDropboxAlt } from "react-icons/tfi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Error } from "../../components/Error";

const OrdersPage = () => {
  const { isPending, isError, data, error } = useFetchOrders()
  // const [orders, setOrders] = useState([
  //   { id: "001", customer: "John Doe", status: "pending" },
  //   { id: "002", customer: "Jane Smith", status: "done" },
  // ]);

  const markAsDone = (id: string) => {
    // setOrders((prev) =>
    //   prev.map((order) =>
    //     order.id === id ? { ...order, status: "done" } : order
    //   )
    // );
  };

  if (isPending) {
    return <div className="grid place-content-center mt-30 ml-40">
      <LoadingSpinner />
    </div>
  }

  if (isError) {
    return <Error />
  }

  if (data.orders.length === 0) {
    return <div className="text-center text-3xl grid place-content-center ml-40">
      <TfiDropboxAlt className="text-9xl mt-35 mb-3" />
      <span >No Orders</span></div>
  }
  const allOrders = data?.orders
  console.log(allOrders);
  
  return (
    <div className="ml-62">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <div className="space-y-4">
        {allOrders.map((orders) => (
         orders.items.map((order)=>(
           <div
             key={order.id}
             className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl"
           >
             <div className="grid gap-y-1.5">
               <p className="font-medium">Order #{order.id.slice(0, 4)}</p>
               <p className="text-sm text-gray-400">
                 Meal: {order.product.name}
               </p>
               <p className="text-sm text-gray-400">
                 Sides: None
               </p>
               <p className="text-sm text-gray-400">
                 Quantity: x{order.quantity}
               </p>
             </div>

             <div className="flex items-center gap-4">
               <span
                 className={`text-sm px-4 py-1.5 rounded-full ${orders.status === "pending"
                   ? "bg-yellow-500/20 text-yellow-400"
                   : "bg-green-500/20 text-green-400"
                   }`}
               >
                 {orders.status}
               </span>

               {orders.status === "pending" && (
                 <button
                   onClick={() => markAsDone(order.id)}
                   className="bg-[#ffb900] text-[#202020] px-4 py-1.5 rounded-lg font-medium"
                 >
                   Mark Done
                 </button>
               )}
             </div>
           </div>
         ))
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;