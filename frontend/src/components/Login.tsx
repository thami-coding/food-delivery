import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { Link, NavLink, useNavigate } from "react-router";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { logout } from "../lib/apiClient";
import { useGlobalState } from "../hooks/useGlobalState";

export default function Login() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = dropdownRef.current;
      if (element && !element.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div ref={dropdownRef}>
      <button
        className="text-2xl cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <VscAccount />
      </button>
      {open && (
        <div className="absolute right-0 w-35  bg-yellow-400 text-black rounded-md z-10">
          {state.user ? (
            <div className="grid p-3">
              <Link
                to="/profile/edit"
                className="flex items-center mb-3 hover:underline cursor-pointer"
              >
                <MdOutlineManageAccounts />
                <span className="ml-2.5 ">{state.user.username}</span>
              </Link>
              <button
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  dispatch({ type: "CLEAR_CART" });
                  logout();
                  navigate("/");
                }}
                className="flex items-center hover:underline cursor-pointer"
              >
                <MdExitToApp />
                <span className="ml-2.5">Logout</span>
              </button>
            </div>
          ) : (
            <ul className="py-1">
              <li className="px-4 py-2 hover:underline cursor-pointer">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="px-4 py-2 hover:underline cursor-pointer">
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
