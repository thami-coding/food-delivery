import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";

import Login from "./Login";
import { useEffect, useState } from "react";

import CartTotal from "./CartTotal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
<<<<<<< Updated upstream
=======
  const { data, isError, isPending } = useCart();
>>>>>>> Stashed changes

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
<<<<<<< Updated upstream


  return (
    <nav
      className={`py-3 px-12 fixed top-0  w-full z-10 ${scrolled && "bg-[#1b1919]"
=======
  const totalItems = data ? calculateTotalItems(data) : 0;

  return (
    <nav
      className={`py-3 px-12 fixed top-0  w-full z-40 ${scrolled && "bg-[#1b1919]"
>>>>>>> Stashed changes
        }`}
    >
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="text-white flex  items-center border-amber-300">
          <NavLink to="/" className="mr-5 cursor-pointer">
            Home
          </NavLink>

          <NavLink to="/products" className="mr-5 cursor-pointer">
            Menu
          </NavLink>
<<<<<<< Updated upstream
          <CartTotal />
=======

          <NavLink to="/cart" className="mr-5 relative cursor-pointer">
            <IoCartOutline className="text-2xl" />
            {!isPending && !isError && <span className="text-gray-950 bg-yellow-400 px-1.5  h-5 text-center  rounded-full font-bold absolute -top-3 left-3">
              {totalItems}
            </span>}
          </NavLink>
>>>>>>> Stashed changes
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
