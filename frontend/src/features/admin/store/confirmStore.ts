// store/confirmStore.ts
import { create } from "zustand"

type ConfirmOptions = {
  title?: string
  message?: string
  btnText?: string
  onConfirm?: () => void
}

type ConfirmState = {
  isOpen: boolean
  options: ConfirmOptions
  openConfirm: (options: ConfirmOptions) => void
  closeConfirm: () => void
  confirm: () => void
}

export const useConfirm = create<ConfirmState>((set, get) => ({
  isOpen: false,
  options: {},

  openConfirm: (options) =>
    set({
      isOpen: true,
      options,
    }),

  closeConfirm: () =>
    set({
      isOpen: false,
      options: {},
    }),

  confirm: () => {
    const { options, closeConfirm } = get()
    options.onConfirm?.()
    closeConfirm()
  },
}))
