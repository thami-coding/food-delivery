import { useEffect, useRef, useState, type MouseEvent } from "react";
import { VscAccount } from "react-icons/vsc";
<<<<<<< Updated upstream
import UserProfile from "./UserProfile";

=======
import { Link, NavLink, useNavigate } from "react-router";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import {  useUser } from "../hooks/useUser";
import { CiGrid41 } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";
import { useLogout } from "../hooks/useAuth";
>>>>>>> Stashed changes

export default function Login() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
<<<<<<< Updated upstream
=======
  const { data: user, isPending, error, isError } = useUser();
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  if (isError) {
    console.log(error);
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    logout()
    navigate('/')
  }
  
>>>>>>> Stashed changes
  return (
    <div ref={dropdownRef}>
      <button
        className="text-2xl cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <VscAccount />
      </button>
      {open && (
<<<<<<< Updated upstream
      <UserProfile />
=======
        <div className="absolute right-0 w-35  bg-yellow-400 text-black rounded-md z-10">
          {!isPending && user ? (
            <div className="grid p-3">
              <Link
                to="/profile/edit"
                className="flex items-center mb-3 hover:underline cursor-pointer"
              >
                <MdOutlineManageAccounts />
                <span className="ml-2.5 capitalize">Profile</span>
              </Link>
              {user?.role === "admin" && <Link
                to="/dashboard"
                className="flex items-center mb-3 hover:underline cursor-pointer"
              >
                <CiGrid41 />
                <span className="ml-2.5">Dashboard</span>
              </Link>}
              <Link
                to="/history"
                className="flex items-center mb-3 hover:underline cursor-pointer"
              >
                <GrHistory />
                <span className="ml-2.5">Orders</span>
              </Link>
              <button
                onClick={handleClick}
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
>>>>>>> Stashed changes
      )}
    </div>
  );
}
