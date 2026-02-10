import { z } from "zod"
import { ProductSchema } from "./schemas"

export type Product = z.infer<typeof ProductSchema>
export type Category =
  | "all"
  | "pizzas"
  | "wings"
  | "burgers"
  | "desserts"
  | "combos"
  | "ribs"
