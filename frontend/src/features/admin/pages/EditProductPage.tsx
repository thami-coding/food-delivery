import LoadingSpinner from "../../../components/LoadingSpinner"
import { useParams } from "react-router"
import { useProduct } from "../hooks"
import { ErrorAlert } from "../../../components/ErrorAlert"
import EditProductForm from "../components/EditProductForm"

export default function EditProductPage() {
  const params = useParams()
  const { isError, isPending, data } = useProduct(params.id!)

  if (isPending) {
    return (
      <div className="grid h-full place-content-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) return <ErrorAlert />
  
  return (
    <>
      <div className="grid  justify-center">
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
        <EditProductForm data={data} />
      </div>
    </>
  )
}
