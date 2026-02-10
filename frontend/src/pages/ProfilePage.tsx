import LoadingSpinner from "../components/LoadingSpinner"
import ProfileForm from "../features/user/components/ProfileForm"
import { useUser } from "../features/user/hooks"

export default function ProfilePage() {
  const { isPending, data } = useUser()

  if (isPending) {
    return <LoadingSpinner />
  }

  return <ProfileForm user={data?.user} />
}
