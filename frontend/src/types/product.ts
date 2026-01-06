import * as z from "zod/v4";
import type { TCategories } from "./category";

export const productSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  category: z.string().optional(),
  imageUrl: z.url().optional(),
  ingredients: z.string().optional(),
  createdAt: z.iso.datetime().optional(),
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
