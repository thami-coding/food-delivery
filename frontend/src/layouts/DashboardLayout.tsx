import { CiGrid41 } from "react-icons/ci"
import { GrHistory } from "react-icons/gr"
import { MdExitToApp } from "react-icons/md"
import { TbNotes } from "react-icons/tb"
import { NavLink, Outlet, useNavigate } from "react-router"
import { RiEBikeLine } from "react-icons/ri"
import { MdOutlineInventory } from "react-icons/md"
import { useLogout } from "../features/auth/hooks"
import { useQueryClient } from "@tanstack/react-query"

const DashboardLayout = () => {
  const { mutate } = useLogout()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const size = 20
  const navlinks = [
    {
      link: "/admin",
      icon: <CiGrid41 size={size} />,
      linkText: "Overview",
    },
    {
      link: "/admin/products/new",
      icon: <TbNotes size={size} />,
      linkText: "Add Product",
    },
    {
      link: "/admin/products",
      icon: <MdOutlineInventory size={size} />,
      linkText: "Products",
    },
    {
      link: "/admin/orders",
      icon: <GrHistory size={size} />,
      linkText: "Orders",
    },
    {
      link: "/admin/deliveries",
      icon: <RiEBikeLine size={size} />,
      linkText: "Delivery",
    },
  ]

  const logout = () => {
    queryClient.cancelQueries()
    queryClient.clear()
    navigate("/login")
    mutate()
  }
  return (
    <div className="min-h-screen flex bg-[#202020] text-white relative">
      <aside className="w-64 bg-[#1a1a1a] p-6 fixed h-dvh">
        <h2 className="text-xl font-bold text-[#ffb900] mb-6">
          Admin Dashboard
        </h2>
        <nav className="space-y-4 ">
          {navlinks.map((navlink) => {
            const { link, icon, linkText } = navlink
            return (
              <NavLink
                key={linkText}
                to={link}
                className=" hover:text-[#ffb900] flex items-center gap-x-1.5"
              >
                {icon} <span>{linkText}</span>
              </NavLink>
            )
          })}
          <button
            onClick={logout}
            className="hover:text-[#ffb900] flex items-center gap-x-1.5 absolute bottom-5 cursor-pointer"
          >
            <MdExitToApp size={size} /> <span>Exit</span>
          </button>
        </nav>
      </aside>
      <main className="ml-64 p-8 w-[calc(100vw-256px)]">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
