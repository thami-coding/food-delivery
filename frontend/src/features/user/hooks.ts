import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUser, updateUser } from "./api"
import { MINUTE } from "../../lib/time"

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    staleTime: 20 * MINUTE,
    retry: false,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}
