import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"
import {
  createProduct,
  deleteProduct,
  fetchOrders,
  fetchProduct,
  updateOrder,
  updateProduct,
} from "./api"
import { toast } from "react-toastify"

export const useRealTime = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const realtimeAuth = async () => {
      try {
        await supabase.realtime.setAuth()
      } catch (error) {
        console.log(error)
      }
    }

    realtimeAuth()

    const changes = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        (payload) => {
          console.log(payload)
          console.log("realtime")
          queryClient.invalidateQueries({ queryKey: ["orders"] })
        },
      )
      .subscribe((__, error) => {
        console.log(error)
      })

    return () => {
      supabase.removeChannel(changes)
    }
  }, [queryClient])
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => fetchProduct(id),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Product Updated")
    },
    onError: (error) => {
      console.log(error)
      toast.warn("Error Updating Product")
    },
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: () => {
      toast.warn("Error Updating Product")
    },
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (productId, context) => {
      // Cancel outgoing refetches
      await context.client.cancelQueries({ queryKey: ["products", "all"] })
      // Snapshot previous cart

      const prevProducts = context.client.getQueryData(["products", "all"])
      // Optimistically update cart
      context.client.setQueryData(["products", "all"], (oldProducts = []) => {
        // Update quantity
        console.log(oldProducts)

        if (!oldProducts) return oldProducts
        return {
          ...oldProducts,
          pages: oldProducts.pages.map((page) => ({
            ...page,
            products: page.products.filter(
              (product) => product.id !== productId,
            ),
          })),
        }
      })

      return { prevProducts }
    },
    onError: (_err, _newTodo, onMutateResult, context) => {
      // Rollback on error
      context.client.setQueryData(
        ["products", "all"],
        onMutateResult?.prevProducts,
      )
    },
    onSettled: (_data, _err, _newTodo, _onMutateResult, context) => {
      // Refetch to sync with server
      context.client.invalidateQueries({ queryKey: ["products", "all"] })
    },
  })
}

export function useInfiniteOrders(searchParams?) {
  const dateRange = searchParams?.get("dateRange")
  const status = searchParams?.get("status")
  const filters = { dateRange, status }

  return useInfiniteQuery({
    queryKey: ["orders", filters],
    queryFn: ({ pageParam }) =>
      fetchOrders({ page: pageParam as number, limit: 30, filters }),
    initialPageParam: 1,
    gcTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}

export function useUpdateOrder(searchParams) {
  const dateRange = searchParams?.get("dateRange")
  const status = searchParams?.get("status")
  const filters = { dateRange, status }

  return useMutation({
    mutationFn: updateOrder,
    onMutate: async (newOrder, context) => {
      await context.client.cancelQueries({ queryKey: ["orders", filters] })

      const previousOrders = context.client.getQueryData(["orders", filters])

      context.client.setQueryData(["orders", filters], (old) => {
        if (!old) return old

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            orders: page.orders.map((order) =>
              order.id === newOrder.id
                ? { ...order, status: newOrder.status }
                : order,
            ),
          })),
        }
      })

      return { previousOrders }
    },
    onError: (_err, _newOrder, onMutateResult, context) => {
      context.client.setQueryData(
        ["orders", filters],
        onMutateResult?.previousOrders,
      )
    },
    // Always refetch after error or success:
    onSettled: (_data, _error, _variables, _onMutateResult, context) =>{
      context.client.invalidateQueries({ queryKey: ["orders", filters] })

    }
  })
}
