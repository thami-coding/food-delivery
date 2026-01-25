import { useQuery } from "@tanstack/react-query"
import { createSignature } from "../lib/apiClient"


export const usePaymentSignature = (data) => {
    return useQuery({
        queryKey: ['signature'],
        queryFn: async () => createSignature(data),
        retry: 1,
        refetchOnWindowFocus: false
    })
}