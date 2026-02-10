import { useMutation } from "@tanstack/react-query"
import { forgotPassword, login, logout, resetPassword, signUp } from "./api"
import { toast } from "react-toastify"

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error?.statusCode >= 500) {
        toast.warn("Something went wrong. Try again")
      }
    },
  })
}

export const useSignup = () => {
  return useMutation({
    mutationFn: signUp,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPassword,
  })
}
