import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../lib/apiClient";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });
};
