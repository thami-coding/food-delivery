import React from "react"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Link } from "react-router"

export default function ChangeAddress({ isLoading, data }) {
  if (isLoading) {
    return <LoadingSpinner />
  }
  const user = data.user
  return (
    <Link
      to="/profile?checkout"
      state={{ from: location.pathname }}
      className="text-yellow-400 cursor-pointer hover:underline"
    >
      {user.streetAddress ? "change" : "+ Add Address"}
    </Link>
  )
}
