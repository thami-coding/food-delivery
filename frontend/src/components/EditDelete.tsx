import { FaRegTrashAlt } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { Link } from "react-router"
import { useDeleteDialog } from "../store/deleteModalStore"
import { useDeleteProduct } from "../hooks/useProducts"
import ConfirmModal from "./ConfirmModal"



type Props = {
  id: string
}

export function EditDelete({ id }: Props) {
  const { toggleDialog } = useDeleteDialog()
  const { mutate } = useDeleteProduct()
  const size = 18
  const title = "Delete Product"
  const message = "Are you sure you want to delete this product ?"
  return (
    <div>

      <div className="inline-flex gap-4 items-center mt-10">
        <Link to={`/dashboard/products/${id}`}
          type="button"
          title="Edit product"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-md cursor-pointer bg-white"
        >
          <MdModeEditOutline size={size} className="text-green-400" />
        </Link>

        <button
          type="button"
          onClick={toggleDialog}
          title="Delete product"
          className="text-red-500 w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-md cursor-pointer bg-white"
        >
          <FaRegTrashAlt size={size} />
        </button>
      </div>
      <ConfirmModal id={id} title={title} message={message} mutate={mutate} />
    </div>
  )
}

