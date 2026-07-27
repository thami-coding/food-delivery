import LoadingSpinner from "../../../components/LoadingSpinner"
import { Link } from "react-router"
import { useUser } from "../../user/hooks"
import { ErrorAlert } from "../../../components/ErrorAlert"

export default function ChangeAddress() {
  const { isLoading, isError, data } = useUser()
  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorAlert />

  const user = data?.user
  return (
    <Link
      to="/profile?checkout"
      state={{ from: location.pathname }}
      className="text-yellow-400 cursor-pointer hover:underline"
    >
      {user?.streetAddress ? "change" : "+ Add Address"}
    </Link>
  )
}
