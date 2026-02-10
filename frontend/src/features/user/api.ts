import { AxiosInstance } from "../../app/axios"
import { HttpError } from "../../lib/errors/HttpError"
import { UserResponseSchema } from "./schemas"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"

export async function fetchUser() {
  try {
    const { data } = await AxiosInstance.get("/users/me", { skipAuth: true })
    const parsed = validateOrThrow(UserResponseSchema, data)

    if (parsed.status === "error") {
      throw new HttpError(parsed.message)
    }
    const { user } = parsed
    return { user }
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}

export const updateUser = async (payload) => {
  try {
    const { data } = await AxiosInstance.patch("/users/me", payload)
    const parsed = validateOrThrow(UserResponseSchema, data)
    if (parsed.status === "error") {
      throw new HttpError(parsed?.status)
    }
    return parsed
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}
