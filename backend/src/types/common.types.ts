import jwt from "jsonwebtoken"

export type ExpiresIn = jwt.SignOptions["expiresIn"]
export type QueryParams = {
  limit?: number
  category?: TCategories
  offset?: number
  price?: number
  name?: string
}

export interface AuthPayload {
  role?: UserRole
  userId?: string
  tokenId?: string
}

export enum TCategories {
  BURGERS = "burgers",
  PIZZAS = "pizzas",
  DESSERTS = "desserts",
  WINGS = "wings",
  COMBOS = "combos",
  RIBS = "ribs",
}

export type UserRole = "admin" | "user"
