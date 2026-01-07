import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateUser } from "../lib/apiClient";
import { toast } from "react-toastify";

const notify = (message:string) => { toast(message) }

export function useUser() {
 return useQuery({
  queryKey: ["user"],
  queryFn: fetchUser,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
 });

}

export function useUpdateUser() {
 const queryClient = useQueryClient()
 return useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
   queryClient.invalidateQueries({queryKey:["user"]})
  },
  onError: () => {
   notify("Error updating profile")
  }
 });

}

