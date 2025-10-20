import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, login, logout, signUp } from "../lib/apiClient";
import { useNavigate } from "react-router";

export const useUser = () => {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { user, isPending, isError, error };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      queryClient.setQueryData(["currentUser"], userData);
      navigate("/cart");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (userData) => {
      queryClient.setQueryData(["currentUser"], userData);
      navigate("/cart");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      navigate("/login");
    },
  });
};
