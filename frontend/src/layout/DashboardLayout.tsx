import { CiGrid41 } from "react-icons/ci"
import { GrHistory } from "react-icons/gr"
import { MdExitToApp } from "react-icons/md"
import { TbNotes } from "react-icons/tb"
import { NavLink, Outlet } from "react-router"
import { useLogout } from "../hooks/useAuth"
import { RiEBikeLine } from "react-icons/ri"
import { MdOutlineInventory } from "react-icons/md"

const DashboardLayout = () => {
  const { mutate } = useLogout()
  const size = 20

  return (
    <div className="min-h-screen flex bg-[#202020] text-white relative">
      <aside className="w-64 bg-[#1a1a1a] p-6 fixed h-dvh">
        <h2 className="text-xl font-bold text-[#ffb900] mb-6">
          Admin Dashboard
        </h2>
        <nav className="space-y-4 ">
          <NavLink
            to="/dashboard"
            className=" hover:text-[#ffb900] flex items-center gap-x-1.5"
          >
            <CiGrid41 size={size} /> <span>Overview</span>
          </NavLink>
          <NavLink
            to="/dashboard/products/new"
            className="hover:text-[#ffb900] flex items-center gap-x-1.5"
          >
            <TbNotes size={size} /> <span>Add Product</span>
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className="hover:text-[#ffb900] flex items-center gap-x-1.5"
          >
            <MdOutlineInventory size={size} /> <span>Products</span>
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className="hover:text-[#ffb900] flex items-center gap-x-1.5"
          >
            <GrHistory size={size} /> <span>Orders</span>
          </NavLink>
          <NavLink
            to="/dashboard/delivery"
            className="hover:text-[#ffb900] flex items-center gap-x-1.5"
          >
            <RiEBikeLine size={size} /> <span>Delivery</span>
          </NavLink>
          <button
            onClick={() => mutate()}
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
// Make sure your computer has an active internet connection.
export default DashboardLayout
