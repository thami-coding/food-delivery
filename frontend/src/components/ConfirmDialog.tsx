import { useConfirm } from "../features/admin/store/confirmStore"

export default function ConfirmDialog() {
  const { isOpen, options, closeConfirm, confirm } = useConfirm()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={closeConfirm} />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {options.title ?? "Confirm"}
          </h2>
          <button
            onClick={closeConfirm}
            className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-gray-500">
          {options.message ?? "Are you sure?"}
        </p>

        <div className="mt-10 flex justify-end gap-2">
          <button
            onClick={closeConfirm}
            className="rounded border px-4 py-2 cursor-pointer text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="rounded bg-yellow-300 hover:bg-yellow-400 px-4 py-2 text-black cursor-pointer"
          >
            {options.btnText ?? "Yes"}
          </button>
        </div>
      </div>
    </div>
  )
}
