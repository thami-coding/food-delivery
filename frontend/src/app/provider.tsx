import { RouterProvider } from "react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./queryClient"
import { router } from "./router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import  ConfirmDialog from "../components/ConfirmDialog"

type Props = {
  children?: React.ReactNode
}

export function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" autoClose={2000} />
      <ConfirmDialog />
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}


