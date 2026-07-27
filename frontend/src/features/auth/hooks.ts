import { useMutation } from "@tanstack/react-query"
import { forgotPassword, login, logout, resetPassword, signUp } from "./api"
import { toast } from "react-toastify"
import type { HttpError } from "../../lib/errors/HttpError"

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      const err = error as HttpError
      
      if (err?.statusCode >= 500) {
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
    onError: (error) => {
      toast.warn(error?.message)

    }
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPassword,
  })
}
