import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUsersCart, updateQuantity } from "../lib/apiClient";

export const useCart = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["currentUsersCart"],
    queryFn: () => fetchCurrentUsersCart(),
  });

  return { data, isPending, isError, error };
};


export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuantity,
    onSuccess: (userData) => {
      queryClient.setQueryData(["currentUsersCart"], userData);
    },
    onError: (error) => {
      console.error("cart update failed:", error);
    },
  });
};