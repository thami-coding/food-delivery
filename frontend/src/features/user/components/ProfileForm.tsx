import { useState, type ChangeEvent, type FormEvent } from "react"
import ProfileUpdated from "./ProfileUpdated"
import { useUpdateUser } from "../hooks"
import FormInput from "./FormInput"
import Button from "../../../components/Button"
import ValidationError from "./ValidationError"

export default function ProfileForm({ user }) {
  const { mutate, isSuccess, isPending, error, isError } = useUpdateUser()
  const [formData, setFormData] = useState({
    fullName: user?.fullName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    streetAddress: user?.streetAddress ?? "",
    city: user?.city ?? "",
    suburb: user?.suburb ?? "",
    postalCode: user?.postalCode ?? "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ ...formData })
  }

  if (isSuccess) {
    return <ProfileUpdated  />
  }

  return (
    <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl shadow-lg p-8 mt-20 mx-auto">
      <div className="h-24">
        <h2 className="text-2xl font-semibold text-white">User Profile</h2>
        {isError && <ValidationError error={error} />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mt-2">
        <div className="flex gap-x-8 mb-7">
          <FormInput
            handleChange={handleChange}
            value={formData.fullName}
            name="fullName"
            type="text"
            placeholder="John Doe"
            labelText="Full Name"
          />
          <FormInput
            handleChange={handleChange}
            value={formData.phoneNumber}
            name="phoneNumber"
            type="tel"
            placeholder="+27"
            labelText="Phone Number"
          />
        </div>
        <div className="flex gap-x-8 mb-7">
          <FormInput
            handleChange={handleChange}
            value={formData.streetAddress}
            name="streetAddress"
            type="text"
            placeholder="123 Main Street"
            labelText="Street Address"
          />
          <FormInput
            handleChange={handleChange}
            value={formData.city}
            name="city"
            type="text"
            placeholder="City"
            labelText="city"
          />
        </div>
        <div className="flex gap-x-8 mb-7">
          <FormInput
            handleChange={handleChange}
            value={formData.suburb}
            name="suburb"
            type="text"
            placeholder="Suburb"
            labelText="Suburb"
          />
          <FormInput
            handleChange={handleChange}
            value={formData.postalCode}
            name="postalCode"
            type="text"
            placeholder="Post Code"
            labelText="Post Code"
          />
        </div>
        <Button
          handleClick={handleSubmit}
          isPending={isPending}
          buttonText="Update Profile"
          loadingText="Updating"
        />
      </form>
    </div>
  )
}
