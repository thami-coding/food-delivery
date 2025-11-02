import { Link, NavLink } from "react-router";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";

import { useUser } from "../hooks/useAuth";

function UserProfile() {
 const { user, isPending, isError } = useUser();

 if (isPending) {
  return <div className="absolute right-0 w-35  bg-yellow-400 text-black rounded-md z-10 p-3 flex justify-center items-center">
   <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent"></div>
  </div>

 }

 if (isError) {
  return <div className="absolute right-0 w-35  bg-yellow-400 text-red-600 rounded-md z-10 p-3">
   <p>Error occured </p>
  </div>
  

 }
 return (
  <div className="absolute right-0 w-35  bg-yellow-400 text-black rounded-md z-10">
   {user ? (
    <div className="grid p-3">
     <Link
      to="/profile/edit"
      className="flex items-center mb-3 hover:underline cursor-pointer"
     >
      <MdOutlineManageAccounts />
      <span className="ml-2.5 ">{isPending ? 'Loading...' : user.username}</span>
     </Link>
     <button
      onClick={() => { }}
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
 )
}

export default UserProfile