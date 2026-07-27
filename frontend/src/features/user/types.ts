import type z from "zod";
import type { UserSchema, UserUpdateSchema } from "./schemas";

export type User = z.infer<typeof UserSchema>

export type UserUpdate = z.infer<typeof UserUpdateSchema>