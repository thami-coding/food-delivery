import { useQuery } from "@tanstack/react-query"
import { generateSignature } from "./api"
import type { Order } from "../admin/schemas"

export const usePaymentSignature = (data: Order) => { //TODO: strip down the properties of order and use different type
  return useQuery({
    queryKey: ["signature"],
    queryFn: async () => generateSignature(data),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: data != null,
  })
}
