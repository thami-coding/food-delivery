import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchProducts } from "./api"
import { MINUTE } from "../../lib/time"
import type { Category } from "./types"

export const useInfiniteProducts = (category: Category = "all") => {
  return useInfiniteQuery({
    queryKey: ["products", category],
    initialPageParam: 1,
    staleTime: 10 * MINUTE,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    throwOnError: true,
    queryFn: ({ pageParam }) =>
      fetchProducts({ page: pageParam, limit: 10, category }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
