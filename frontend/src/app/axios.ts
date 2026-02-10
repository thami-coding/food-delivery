import axios from "axios"
import { queryClient } from "./queryClient"

export const AxiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
  withCredentials: true,
})

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)

    const originalRequest = error.config
    const status = error.response?.status

    //  Skip auth logic for public requests
    if (originalRequest?.skipAuth) {
      return Promise.reject(error)
    }

    if (originalRequest?.url?.includes("/refresh")) {
      cleanupAndRedirect()
      return Promise.reject(error)
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await AxiosInstance.post("/auth/refresh", null, {
          withCredentials: true,
          skipAuth: true,
        })
        return AxiosInstance(originalRequest)
      } catch (refreshError) {
        cleanupAndRedirect()
        return Promise.reject(refreshError)
      }
    }

    // Still 401 after retry → logout
    if (status === 401 || status === 403) {
      cleanupAndRedirect()
    }

    return Promise.reject(error)
  },
)

const cleanupAndRedirect = () => {
  queryClient.cancelQueries()
  queryClient.clear()

  if (location.pathname !== "/products") {
    window.location.replace("/login")
  }
}
