import { UserRole } from "../../../src/types/common.types"
import { hashPasswordSync } from "./auth.helper"

export const detailedUser = {
  email: "test@test.com",
  password: hashPasswordSync("test@test"),
  role: "user" as UserRole,
  fullName: "Bones",
  phoneNumber: "0653272053",
  streetAddress: "72 Thorny Hill place",
  city: "Durban",
  suburb: "Newlands West",
  postalCode: "4037",
}

export const newUser = {
  email: "test@test.com",
  password: "Password1",
}
