import { AxiosInstance } from "../../app/axios"
import { HttpError } from "../../lib/errors/HttpError"
import { AuthResponseSchema } from "./schemas"
import type { LoginData, ResetPasswordData, SignupData } from "./types"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"

export async function login(payload: LoginData) {
  try {
    const { data } = await AxiosInstance.post("/auth/login", payload, {
      skipAuth: true,
    })
    const parsed = validateOrThrow(AuthResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }
    return { user: parsed.user }
  } catch (error) {
    throwHttpErrorFromAxios(error)
  }
}

export async function signUp(payload: SignupData) {
  try {
    const { data } = await AxiosInstance.post("/auth/register", payload, {
      skipAuth: true,
    })
    const parsed = validateOrThrow(AuthResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed.message, Number(parsed.status))
    }
    return { user: parsed.user }
  } catch (error) {
    throwHttpErrorFromAxios(error)
  }
}

export async function logout() {
  try {
    await AxiosInstance.post("/auth/logout")
  } catch (error) {
    throwHttpErrorFromAxios(error)
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await AxiosInstance.post("/auth/forgot-password", {
      email,
    })
    return data
  } catch (error) {
    throwHttpErrorFromAxios(error)
  }
}

export const resetPassword = async (payload: ResetPasswordData) => {
  try {
    const { data } = await AxiosInstance.post("/auth/reset-password", payload)
    return data
  } catch (error) {
    throwHttpErrorFromAxios(error)
  }
}
