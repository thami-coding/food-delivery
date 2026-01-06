import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, fetchOrders, fetchUserOrders } from "../lib/apiClient";

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: createOrder,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export function useFetchOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders
  })
}
export function useFetchUserOrders() {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: fetchUserOrders
  })
}
