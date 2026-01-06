import { CiGrid41 } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";
import { MdExitToApp } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { NavLink, Outlet } from "react-router";
import { useLogout } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { mutate: logout } = useLogout()
  return (
    <div className="min-h-screen flex bg-[#202020] text-white relative">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-6 fixed h-dvh">
        <h2 className="text-xl font-bold text-[#ffb900] mb-6">
          Admin Dashboard
        </h2>
        <nav className="space-y-4 ">
          <NavLink to="/dashboard" className=" hover:text-[#ffb900] flex items-center gap-x-1.5">
            <CiGrid41 size={20} />  <span>Overview</span>
          </NavLink>
          <NavLink to="/dashboard/products" className="hover:text-[#ffb900] flex items-center gap-x-1.5">
            <TbNotes size={20} /> <span>Products</span>
          </NavLink>
          <NavLink to="/dashboard/orders" className="hover:text-[#ffb900] flex items-center gap-x-1.5">
            <GrHistory size={20} /> <span>Orders</span>
          </NavLink>
          <button onClick={() => logout()} className="hover:text-[#ffb900] flex items-center gap-x-1.5 absolute bottom-5">
            <MdExitToApp size={22} /> <span>Exit</span>
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;