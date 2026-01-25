import { useDeleteDialog } from "../store/deleteModalStore";


export default function ConfirmModal({ id, title, message, mutate, btnText = "Yes", status }) {
  const { isDialogOpen, toggleDialog } = useDeleteDialog()

  const handleDelete = () => {
    if (status) {
      mutate({ id, status })
    } else if (id) {
      mutate(id)
    } else {
      mutate()
    }
    toggleDialog()
  }

  return (
    <div className="p-6">

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-200 ${isDialogOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={toggleDialog}
        />
        <div className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 p-5 shadow-xl transition-transform duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={toggleDialog}
              className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-gray-500">
            {message}
          </p>

          <div className="mt-10 flex justify-end gap-2">
            <button
              onClick={toggleDialog}
              className="rounded border px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="rounded bg-yellow-300 hover:bg-yellow-400 px-4 py-2 text-black cursor-pointer"
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}