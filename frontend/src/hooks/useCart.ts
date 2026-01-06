import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCartItem, cleartCart, deleteCartItem, fetchCurrentUsersCart, updateCart } from "../lib/apiClient";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCurrentUsersCart(),
    retry: false,
    staleTime: 1000 * 30,
  });
};


export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("cart update failed:", error);
    },
  });
};
export const useAddCartIem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("cart update failed:", error);
    },
  });
};

export const useDeletCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['clearCart'],
    mutationFn: cleartCart,
    onSuccess: () => {
      queryClient.setQueryData(["cart"], null);
    },
  })
}