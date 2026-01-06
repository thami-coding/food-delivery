import { z } from "zod";

export const productSchema = z.object({
 name: z.string().min(2, "Product name is required"),
 description: z.string().min(5, "Description must be at least 5 characters"),
 category: z.enum(
  ["pizzas", "wings", "burgers", "desserts", "combos", "ribs"],
  { errorMap: () => ({ message: "Select a category" }) }
 ),
 price: z.number().positive("Price must be greater than 0"),
 imageFile: z.instanceof(File, { message: "Product image is required" }),
});

export type ProductFormData = z.infer<typeof productSchema>;