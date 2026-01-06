import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  fetchUser, forgotPassword, login, logout, resetPassword, signUp } from "../lib/apiClient";
import { useNavigate } from "react-router";



export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
      })
      navigate("/products")
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
      queryClient.setQueryData(["user"], userData);
      navigate("/login");
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
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["cart"], null);
      navigate("/login");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  })
}

export const useResetPassword = () => { 
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPassword
  })
 }
