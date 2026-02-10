import { useEffect, useRef, useState } from "react"
import { VscAccount } from "react-icons/vsc"
import { Link, NavLink, useNavigate } from "react-router"
import { MdOutlineManageAccounts } from "react-icons/md"
import { MdExitToApp } from "react-icons/md"
import { CiGrid41 } from "react-icons/ci"
import { GrHistory } from "react-icons/gr"
import { useUser } from "../hooks"
import { useLogout } from "../../auth/hooks"
import { useQueryClient } from "@tanstack/react-query"

export default function Login() {
  const [open, setOpen] = useState(false)
  const { data } = useUser()
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logout } = useLogout()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = dropdownRef.current
      if (element && !element.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    queryClient.setQueryData(["user"], null)
    queryClient.setQueryData(["cart"], null)
    queryClient.cancelQueries()
    queryClient.clear()
    navigate("/login")
    logout()
  }
  const user = data?.user
  // const user = undefined
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
          {user ? (
            <div className="grid p-3">
              <Link
                to="/profile"
                className="flex items-center mb-3 hover:underline cursor-pointer"
              >
                <MdOutlineManageAccounts />
                <span className="ml-2.5 capitalize">Profile</span>
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center mb-3 hover:underline cursor-pointer"
                >
                  <CiGrid41 />
                  <span className="ml-2.5">Dashboard</span>
                </Link>
              )}
              <Link
                to="/order/history"
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
      )}
    </div>
  )
}
