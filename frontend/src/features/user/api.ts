import { AxiosInstance } from "../../app/axios"
import { UserResponseSchema } from "./schemas"
import {
  throwHttpErrorFromAxios,
  validateOrThrow,
} from "../../lib/errors/error.utils"
import type { UserUpdate } from "./types"

export async function fetchUser() {
  try {
    const { data } = await AxiosInstance.get("/users/me", { skipAuth: true })
    const { user } = validateOrThrow(UserResponseSchema, data)
    return { user }
  } catch (err) {
    // console.log(err); //TODO: remove
    throwHttpErrorFromAxios(err)
  }
}

export const updateUser = async (payload: UserUpdate) => {
  try {
    const { data } = await AxiosInstance.patch("/users/me", payload)
    const parsed = validateOrThrow(UserResponseSchema, data)
    return parsed
  } catch (err) {
    throwHttpErrorFromAxios(err)
  }
}
