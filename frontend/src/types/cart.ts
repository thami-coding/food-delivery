import { z } from "zod/v4";
import { ErrorSchema } from "./product";

export const CartItemSchema = z.object({
  productId: z.string("productId is required"),
  quantity: z.number("quantity is required"),
});

export const CartSchema = z.object({
  productId: z.uuid(),
  name: z.string(),
  price: z.string(),
  imageUrl: z.string(),
  quantity: z.number(),
});

export const SuccessCartSchema = z.object({
  status: z.literal("success"),
  code: z.number(),
  cart: z.array(CartSchema),
});

export const ApiCartResponseSchema = z.discriminatedUnion("status", [
  SuccessCartSchema,
  ErrorSchema,
]);

export const SuccessSchema = z.object({
  status: z.literal("success"),
  code: z.number(),
  message: z.string(),
});

export const ApiSuccessSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorSchema,
]);

export type TCartItem = z.infer<typeof CartItemSchema>;
