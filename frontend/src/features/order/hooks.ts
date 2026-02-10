import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrder, fetchOrder, fetchUserOrders } from "./api"

export function useInfiniteUserOrders() {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
  })
}

export function useOrder() {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      queryClient.setQueryData(["order"], data.order)
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export function useUserOrders() {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
  })
}