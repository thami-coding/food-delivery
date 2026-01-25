import { useState, type ChangeEvent, type FormEvent } from "react"
import { useUpdateUser } from "../hooks/useUser"
import ProfileUpdated from "./ProfileUpdated"
import Loading from "./Loading"


export default function ProfileForm({ user }) {
 const { mutate, isSuccess, isPending, error } = useUpdateUser()
 const [formData, setFormData] = useState({
  fullName: user.data.fullName,
  phoneNumber: user.data.phoneNumber,
  streetAddress: user.data.streetAddress,
  city: user.data.city,
  suburb: user.data.suburb,
  postalCode: user.data.postalCode
 })


 if (isSuccess) {
  return <ProfileUpdated />
 }

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData((prev) => ({ ...prev, [name]: value }))
 }

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  mutate({ ...formData })
 }
 return (
  <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl shadow-lg p-8 mt-20 mx-auto ">
   <p className="text-red-500">{error?.message}</p>
   <h2 className="text-2xl font-semibold text-white my-10">
    User Profile
   </h2>
   <form onSubmit={handleSubmit} className="space-y-5">
    <div className="flex gap-x-8 mb-7">
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       Full Name
      </label>
      <input
       required
       onChange={handleChange}
       value={formData.fullName}
       name="fullName"
       type="text"
       placeholder="John Doe"
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       Phone Number
      </label>
      <input
       required
       onChange={handleChange}
       value={formData.phoneNumber}
       name="phoneNumber"
       type="tel"
       placeholder="+27 234 567 890"
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
    </div>
    <div className="flex gap-x-8 mb-7">
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       Street Address
      </label>
      <input

       onChange={handleChange}
       value={formData.streetAddress}
       name="streetAddress"
       type="text"
       placeholder="123 Main Street"
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       City
      </label>
      <input
       required
       onChange={handleChange}
       name="city"
       type="text"
       placeholder="City"
       value={formData.city}
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
    </div>

    <div className="flex gap-x-8 mb-7">
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       Suburb
      </label>
      <input
       required
       onChange={handleChange}
       value={formData.suburb}
       name="suburb"
       type="text"
       placeholder="Suburb"
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
     <div>
      <label className="block text-sm text-gray-300 mb-1">
       Post Code
      </label>
      <input
       required
       onChange={handleChange}
       value={formData.postalCode}
       name="postalCode"
       type="text"
       placeholder="Post Code"
       className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
     </div>
    </div>
    <button
     disabled={isPending}
     type="submit"
     className="w-full bg-yellow-300 text-[#202020] font-semibold py-2.5 rounded-lg hover:bg-yellow-400 cursor-pointer disabled:opacity-50 mt-4"
    >
     {isPending ? <Loading /> : "Update Profile"}
    </button>
   </form>
  </div>
 )
}
