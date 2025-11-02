import { IoCartOutline } from "react-icons/io5";
import { calculateTotalItems } from "../lib/calculateTotal";
import { useCart } from "../hooks/useCart";
import { NavLink } from "react-router";

const CartTotal = () => {
 const { data, isError, isPending } = useCart();

 if (isPending) {
  return
 }

 const totalItems = data.cart ? calculateTotalItems(data.cart) : 0;
 return (
  <NavLink to="/cart" className="mr-5 relative cursor-pointer">
   <IoCartOutline className="text-2xl" />
   <span className="text-gray-950 bg-yellow-400 px-1.5  h-5 text-center  rounded-full font-bold absolute -top-3 left-3">
    {isError ? 0 : totalItems}
   </span>
  </NavLink>
 )
}

export default CartTotal