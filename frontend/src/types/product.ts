import * as z from "zod/v4";
import type { TCategories } from "./category";

export const productSchema = z.object({
  productId: z.uuid(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  imageUrl: z.url(),
  ingredients: z.string().nullable(),
  createdAt: z.iso.datetime(),
});

export const productsSchema = z.array(productSchema);

export const responseSchema = z.object({
  products: z.array(productSchema),
});

export type TProduct = z.infer<typeof productSchema>;
export type ResponseSchema = z.infer<typeof responseSchema>;

export type ProductQueryKey = readonly [
  { queryIdentifier: string; category: TCategories }
];
