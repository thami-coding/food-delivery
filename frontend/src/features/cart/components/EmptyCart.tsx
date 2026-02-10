import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="text-center mt-60 border-yellow-50 ">
      <h2 className="text-4xl text-zinc-500">Your Cart Is Empty</h2>
      <TiShoppingCart
        size={90}
        className="text-zinc-500 mr-auto ml-auto my-2.5"
      />
      <Link
        className="text-white hover:underline hover:text-yellow-400 "
        to="/products"
      >
        View Menu
      </Link>
    </div>
  )
}
