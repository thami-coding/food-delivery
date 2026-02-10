import { useQuery } from "@tanstack/react-query"
import { generateSignature } from "./api"

export const usePaymentSignature = (data) => {
  return useQuery({
    queryKey: ["signature"],
    queryFn: async () => generateSignature(data),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: data != null,
  })
}
