import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"
import {
  ProductResponseSchema,
  ProductsResponseSchema,
} from "../../../schemas/response/product.response.schema"
import { ProductSchema } from "../../../schemas/validation/product.validation.schema"

export const productRegistry = new OpenAPIRegistry()
productRegistry.registerPath({
  method: "post",
  path: "/products/seed",
  summary: "Creates many products",
  tags: ["Product"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProductSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "forbidden" },
  },
})

productRegistry.registerPath({
  method: "get",
  path: "/products",
  summary: "Get all products",
  tags: ["Product"],
  parameters: [
    {
      name: "page",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
      },
      description: "Page number (1-based)",
    },
    {
      name: "limit",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 10,
      },
      description: "Number of products per page",
    },
    {
      name: "category",
      in: "query",
      required: false,
      schema: {
        type: "string",
        enum: ["burgers", "pizzas", "desserts", "wings", "combos", "ribs"],
      },
      description:
        "Product category (burgers, pizzas, desserts, wings, combos, ribs)",
    },
  ],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: ProductsResponseSchema,
        },
      },
    },
  },
})

productRegistry.registerPath({
  method: "post",
  path: "/products",
  summary: "Create new Product",
  tags: ["Product"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProductSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: ProductResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "forbidden" },
  },
})

productRegistry.registerPath({
  method: "delete",
  path: "/products/{id}",
  summary: "Delete product by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
      description: "Unique identifier of the product",
    },
  ],
  tags: ["Product"],
  security: [{ bearerAuth: [] }],
  responses: {
    204: { description: "User deleted" },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "forbidden" },
  },
})

productRegistry.registerPath({
  method: "put",
  path: "/products/{id}",
  summary: "Update product by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
      description: "Unique identifier of the product",
    },
  ],
  tags: ["Product"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProductSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: ProductResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "forbidden" },
  },
})
