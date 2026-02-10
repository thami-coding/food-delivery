import { FaRegTrashAlt } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { Link } from "react-router"
import { useDeleteProduct } from "../hooks"
import { useConfirm } from "../store/confirmStore"

type Props = {
  id: string
}

export function EditDelete({ id }: Props) {
  const size = 18
  const { mutate } = useDeleteProduct()
  const { openConfirm } = useConfirm()

  const openDialog = () => {
    openConfirm({
      title: "Delete Product",
      message: "Are you sure you want to delete this product ?",
      btnText: "Yes",
      onConfirm: () => {
        console.log("Deleted")
        mutate(id)
      },
    })
  }

  return (
    <div>
      <div className="inline-flex gap-4 items-center mt-10">
        <Link
          to={`/admin/products/edit/${id}`}
          title="Edit product"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-md cursor-pointer bg-white"
        >
          <MdModeEditOutline size={size} className="text-green-400" />
        </Link>

        <button
          type="button"
          onClick={openDialog}
          title="Delete product"
          className="text-red-500 w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-md cursor-pointer bg-white"
        >
          <FaRegTrashAlt size={size} />
        </button>
      </div>
    </div>
  )
}
