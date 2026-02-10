import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import {
  OrderResponseSchema,
  OrdersResponseSchema,
} from "../../../schemas/response/order.response.schema"
import { z } from "zod"
import { OrderSchema } from "../../../schemas/validation/order.validation.schema"

export const orderRegistry = new OpenAPIRegistry()

orderRegistry.registerPath({
  method: "post",
  path: "/orders",
  summary: "Create order for authenticated user",
  tags: ["Order"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            paymentMethod: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: OrderResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "unauthorized" },
  },
})

orderRegistry.registerPath({
  method: "get",
  path: "/orders/all",
  tags: ["Order"],
  summary: "Get all orders with filters",
  parameters: [
    {
      name: "dateRange",
      in: "query",
      required: false,
      schema: {
        type: "string",
        enum: ["today", "30", "60", "90", "all"],
        default: "all",
      },
      description:
        "Filter orders by date range: today, last 30 days, 60 days, 90 days, or all time",
    },
    {
      name: "status",
      in: "query",
      required: false,
      schema: {
        type: "string",
        enum: ["pending", "deliver", "done"],
      },
      description: "Filter orders by status",
    },
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
        default: 30,
      },
      description: "Number of items per page",
    },
  ],
  responses: {
    200: {
      description: "Paginated list of orders",
      content: {
        "application/json": {
          schema: OrdersResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

orderRegistry.registerPath({
  method: "get",
  path: "/orders/me",
  tags: ["Order"],
  summary: "Get all users placed orders",
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: OrdersResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

orderRegistry.registerPath({
  method: "get",
  path: "/orders/new",
  tags: ["Order"],
  summary: "Get latest order",
  responses: {
    200: {
      description: "sucess",
      content: {
        "application/json": {
          schema: OrderResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
  },
})

orderRegistry.registerPath({
  method: "patch",
  path: "/orders",
  tags: ["Order"],
  summary: "Update order status",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: OrderSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: OrderResponseSchema,
        },
      },
    },
    400: { description: "validation error" },
    401: { description: "unauthenticated" },
    403: { description: "unauthorized" },
  },
})
