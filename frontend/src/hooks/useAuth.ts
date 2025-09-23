import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/apiClient";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
