// import { TfiDropboxAlt } from "react-icons/tfi";
// import { ErrorAlert } from "../components/ErrorAlert";
// import LoadingSpinner from "../components/LoadingSpinner";
// import { useFetchUserOrders } from "../hooks/useOrder";
// import { formatCurrency } from "../lib/formatCurrency";
// import moment from "moment";
// const statusStyles = {
//   paid: "bg-green-100 text-green-700",
//   pending: "bg-yellow-100 text-yellow-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// const OrderHistoryPage = () => {

//   const { isPending, isError, refetch, data, isFetching } = useFetchUserOrders()

//   if (isPending) {
//     return <div className="grid place-content-center mt-30 ml-40">
//       <LoadingSpinner />
//     </div>
//   }

//   if (isError) {
//     return <ErrorAlert refetch={refetch} isFetching={isFetching} />
//   }

//   const prevOrders = data.orders

//   if (prevOrders.length === 0) {
//     return <div className="flex  justify-center mt-32 text-3xl text-white ">
//       <div className="flex flex-col items-center">
//         <TfiDropboxAlt className="text-9xl mb-3" />
//         <span>No Previous Orders</span>
//       </div>
//     </div>
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 mt-15">

//       <div className="space-y-4 mt-15">
//         {prevOrders.map((orders) => (
//           <div
//             key={orders.id}
//             className="bg-neutral-800 rounded-lg shadow-sm  py-6 px-8"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <div>
//                 <p className="font-medium text-neutral-50">
//                   Order #{orders.id.slice(0, 6)}
//                 </p>
//                 <p className=" text-neutral-50"> {moment(orders.createdAt).format("MMMM Do, YYYY")}</p>
//               </div>

//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[orders.paymentStatus]
//                   }`}
//               >
//                 {orders.paymentStatus
//                 }
//               </span>
//             </div>

//             <h3 className="font-medium text-neutral-50">Meal Ordered</h3>
//             <ul className="text-sm text-neutral-50 mb-6 space-y-0.5">
//               {orders.items.map((item) => {
//                 return <li key={item.id} className="flex justify-between">
//                   <span>
//                     {item.product.name} × {item.quantity}
//                   </span>
//                 </li>
//               }
//               )}
//             </ul>

//             <div className="flex justify-between items-center border-t text-neutral-200 pt-3">
//               <span className="font-semibold text-neutral-50">
//                 Total
//               </span>
//               <span className="font-semibold text-neutral-200">
//                 {formatCurrency(orders.totalAmount)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryPage;