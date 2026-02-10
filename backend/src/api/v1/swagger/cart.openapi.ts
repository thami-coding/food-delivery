import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { CartResponseSchema } from "../../../schemas/response/cart.response.schema"
import { CartSchema } from "../../../schemas/validation/cart.validation.schema"

export const cartRegistry = new OpenAPIRegistry()

cartRegistry.registerPath({
  method: "get",
  path: "/cart",
  summary: "Get cart with product details",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: CartResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

cartRegistry.registerPath({
  method: "post",
  path: "/cart",
  summary: "Add Item to cart",
  tags: ["Cart"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CartSchema.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      description: "success",
      content: {
        "application/json": {
          schema: CartResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

cartRegistry.registerPath({
  method: "patch",
  path: "/cart",
  summary: "Update cart",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CartSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: CartResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

cartRegistry.registerPath({
  method: "delete",
  path: "/cart/{id}",
  summary: "Delete cart item by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
      description: "Unique identifier of the cart item",
    },
  ],
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  responses: {
    204: { description: "Item deleted" },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

cartRegistry.registerPath({
  method: "delete",
  path: "/cart/clear",
  summary: "Clear the cart",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  responses: {
    204: { description: "Item deleted" },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})
