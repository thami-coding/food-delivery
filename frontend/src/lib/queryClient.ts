import { QueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) return false
        return failureCount < 3
      },
    },
    mutations: {
      onError: (error) => {
        if (error.statusCode >= 500) {
          toast.warn("Unexpected error occurred")
        }
      },
    },
  },
})
