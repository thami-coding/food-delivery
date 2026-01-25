import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TErrorResponse, TProductsSuccess } from '../types/product'
import type { TCategories } from '../types/category'
import { createProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct } from '../lib/apiClient'
import { toast } from 'react-toastify'


const notify = (message: string) => toast(message)
export const useProducts = (category: TCategories = "all") => {

  return useInfiniteQuery<TProductsSuccess, TErrorResponse>({
    queryKey: ["products", category],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam as number, limit: 10, category }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}

export const useFetchProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => fetchProduct(id)
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      notify("Product Updated")
    },
    onError: () => {
      notify("Error Updating Product")
    }
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
      notify("Error Updating Product")
    }
  })
}
export const useDeleteProduct = () => {

  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (productId, context) => {

      // Cancel outgoing refetches
      await context.client.cancelQueries({ queryKey: ['products', 'all'] })
      // Snapshot previous cart

      const prevProducts = context.client.getQueryData(['products', 'all'])
      // Optimistically update cart
      context.client.setQueryData(['products', 'all'], (oldProducts = []) => {
        // Update quantity
        console.log(oldProducts);

        if (!oldProducts) return oldProducts;
        return {
          ...oldProducts,
          pages: oldProducts.pages.map((page) => ({
            ...page,
            products: page.products.filter((product) => product.id !== productId),
          })),
        }
      })

      return { prevProducts }
    },
    onError: (_err, _newTodo, onMutateResult, context) => {
      // Rollback on error
      context.client.setQueryData(['products', 'all'], onMutateResult?.prevProducts)
    },
    onSettled: (_data, _err, _newTodo, _onMutateResult, context) => {
      // Refetch to sync with server
      context.client.invalidateQueries({ queryKey: ['products', 'all'] })
    },
  })
}

