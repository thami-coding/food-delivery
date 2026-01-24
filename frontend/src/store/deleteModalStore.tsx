import { create } from "zustand";
interface DialogState {
 isDialogOpen: boolean
 toggleDialog: () => void
}

export const useDeleteDialog = create<DialogState>()((set) => ({
 isDialogOpen: false,
 toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
}))