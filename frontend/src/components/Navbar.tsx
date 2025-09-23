import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { IoCartOutline } from "react-icons/io5";
import Login from "./Login";
import { useEffect, useState } from "react";
import { useGlobalState } from "../hooks/useGlobalState";
import { calculateTotalItems } from "../lib/calculateTotal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { state } = useGlobalState();
  
const totalItems = calculateTotalItems(state.cart)
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

  return (
    <nav
      className={`py-3 px-12 fixed top-0  w-full z-10 ${
        scrolled && "bg-[#1b1919]"
      }`}
    >
      <div className="flex justify-between items-center">
        <img src={logo} alt="logo" />

        <div className="text-white flex  items-center border-amber-300">
          <NavLink to="/" className="mr-5 cursor-pointer">
            Home
          </NavLink>

          <NavLink to="/about" className="mr-5 cursor-pointer">
            About
          </NavLink>

          <NavLink to="/cart" className="mr-5 relative cursor-pointer">
            <IoCartOutline className="text-2xl" />
            <span className="text-gray-950 bg-yellow-400 px-1.5  h-5 text-center  rounded-full font-bold absolute -top-3 left-3">
              {totalItems}
            </span>
          </NavLink>
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
