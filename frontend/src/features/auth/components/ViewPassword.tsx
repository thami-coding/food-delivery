import React, { type SetStateAction } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

type viewPasswordProps = { setIsView: React.Dispatch<SetStateAction<boolean>>, isView: boolean }
export default function ViewPassword({ setIsView, isView }: viewPasswordProps) {
 
 return (
  <button className="absolute right-5 cursor-pointer mt-10" type='button' onClick={() => setIsView(!isView)}>
   {isView ? <IoEyeOutline /> : <FaRegEyeSlash />}
  </button>
 )
}
