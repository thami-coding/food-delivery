import { ErrorAlert } from "../components/ErrorAlert"
import LoadingSpinner from "../components/LoadingSpinner"
import ProfileForm from "../features/user/components/ProfileForm"
import { useUser } from "../features/user/hooks"

export default function ProfilePage() {
  const { isPending, data, isError } = useUser()

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorAlert />
  }

  return <ProfileForm user={data.user} />
}
