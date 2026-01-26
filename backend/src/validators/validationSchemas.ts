import { z } from "zod";

export const cartItemValidator = z.object({
  body: z.object({
    productId: z.uuid("Invalid product ID"),
    quantity: z.number("Quantity is required").int().positive("Quantity must be greater than 0"),
  }),
});

export const loginValidator = z.object({
  body: z.object({
    email: z
      .email("Invalid email address"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters"),
  }),
});

export const registerValidator = z.object({
  body: z.object({
    email: z
      .email("Invalid email address"),

    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string("Confirm password is required")
      .min(8, "Confirm must be at least 8 characters"),
  })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        path: ["confirmPassword"],
        message: "Passwords do not match",
      }
    ),
});

export const userValidator = z.object({
  body: z.object({
    fullName: z.string("FullName is required").nonempty("Please provide a valid name"),
    phoneNumber: z.string("Phone number is required").length(10,"Please provide a valid phone number"),
    streetAddress: z.string("Address is required").nonempty("Please provide a valid address"),
    city: z.string("City is required").nonempty("Please provide a valid city"),
    suburb: z.string("Suburb is required").nonempty("Please provide a valid  suburb"),
    postalCode: z.string().nullish()
  })
});