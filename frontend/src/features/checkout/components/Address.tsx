import LoadingSpinner from "../../../components/LoadingSpinner"

export default function Address({ isLoading, data }) {
  if (isLoading) {
    return <LoadingSpinner />
  }
  const user = data.user
  return (
    <>
      {user.streetAddress ? (
        <div className="text-sm tracking-wide py-2">
          <span className="block mb-1 p-1">{user.streetAddress}</span>
          <span className="block mb-1 p-1">{user.suburb}</span>
          <span className="block mb-1 p-1">{user.city}</span>
          <span className="block p-1">{user.postalCode}</span>
        </div>
      ) : (
        "Please Add Addresss for delivery"
      )}
    </>
  )
}
