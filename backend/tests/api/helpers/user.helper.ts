import request from "supertest"

import { userRepository } from "../../../src/repositories/repos"
import { hashPasswordSync, Tokens } from "./auth.helper"
import { UserRole } from "../../../src/types/common.types"
import { app } from "../../../src/server"

export const updateUserDetails = async (tokens) => {
  const refreshToken = tokens?.refreshToken ?? ""
  const accessToken = tokens?.accessToken ?? ""

  return request(app)
    .patch("/api/v1/me")
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      fullName: "Bones",
      phoneNumber: "0653272053",
      streetAddress: "72 Thorny Hill place",
      city: "Durban",
      suburb: "Newlands West",
      postalCode: "4037",
    })
}

export const getDetailedUser = async (tokens?: Tokens) => {
  const refreshToken = tokens?.refreshToken ?? ""
  const accessToken = tokens?.accessToken ?? ""

  return request(app)
    .get("/api/v1/users/me")
    .set("Cookie", refreshToken)
    .set("Authorization", `Bearer ${accessToken}`)
}

export const seedDeailedUser = async (role: UserRole) => {
  return await userRepository().save({
    fullName: "Bones",
    phoneNumber: "0653272053",
    email: "test@test.com",
    password: hashPasswordSync("test@test"),
    role,
    streetAddress: "72 Thorny Hill place",
    city: "Durban",
    suburb: "Newlands West",
    postalCode: "4037",
  })
}
