import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useDialog } from "../products/dialogStore"
import {
  addCartItem,
  deleteCartItem,
  fetchCurrentUsersCart,
  updateCart,
} from "./api"

export const useCart = (user?) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCurrentUsersCart,
    retry: false,
    staleTime: 1000 * 30,
    enabled: user != null,
  })
}

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: updateCart,
    onMutate: async (newItem, context) => {
      // Cancel outgoing refetches
      await context.client.cancelQueries({ queryKey: ["cart"] })
      // Snapshot previous cart
      const previousCart = context.client.getQueryData(["cart"])
      // Optimistically update cart
      context.client.setQueryData(["cart"], (oldCart = []) => {
        // Update quantity
        console.log(
          oldCart.map((item) => {
            console.log(item)
            console.log(newItem.productId)

            return item.product.id === newItem.productId
              ? { ...item, quantity: 22222220 }
              : item
          }),
        )
        // console.log(newItem)

        return oldCart.map((item) =>
          item.product.id === newItem.productId
            ? { ...item, quantity: newItem.quantity }
            : item,
        )
      })

      return { previousCart }
    },
    onError: (_err, _newTodo, onMutateResult, context) => {
      // Rollback on error
      context.client.setQueryData(["cart"], onMutateResult?.previousCart)
      toast("Error updating cart Please try again")
    },
    onSettled: (_data, _err, _newTodo, _onMutateResult, context) => {
      // Refetch to sync with server
      context.client.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export const useAddCartItem = () => {
  const queryClient = useQueryClient()
  const toggleDialog = useDialog((state) => state.toggleDialog)
  
  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toggleDialog()
      toast.success("Added to cart")
    },
  })
}

export const useDeletCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCartItem,
    onMutate: async (productId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] })

      // Snapshot previous cart
      const previousCart = queryClient.getQueryData(["cart"])

      // Optimistically remove item
      queryClient.setQueryData(["cart"], (oldCart = []) =>
        oldCart.filter((item) => item.product.id !== productId),
      )

      return { previousCart }
    },
    onError: (_err, _productId, context) => {
      // Rollback on error
      queryClient.setQueryData(["cart"], context?.previousCart)
      toast("Something went wrong please try again.")
    },
    onSettled: () => {
      // Sync with server
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}
