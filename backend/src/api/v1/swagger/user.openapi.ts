import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { UserResponseSchema } from "../../../schemas/response/user.response.schema"
import { UserSchema } from "../../../schemas/validation/user.schema"

export const userRegistry = new OpenAPIRegistry()

// GET /users (admin)
userRegistry.registerPath({
  method: "get",
  path: "/users",
  summary: "Get all users (admin only)",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "List all users",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
    },
    403: {
      description: "Forbidden (admin access required)",
    },
  },
})

// GET /users/me
userRegistry.registerPath({
  method: "get",
  path: "/users/me",
  summary: "Get the currently authenticated user",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Get current user",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
  },
})

// PATCH /users/me
userRegistry.registerPath({
  method: "patch",
  path: "/users/me",
  summary: " Update the currently authenticated user",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User updated",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
    },
    401: { description: "Unauthorized" },
  },
})


userRegistry.registerPath({
  method: "delete",
  path: "/users",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  responses: {
    204: {
      description: "User deleted",
    },
  },
})
