import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { UserResponseSchema } from "../../../schemas/response/user.response.schema"
import { AuthResponseSchema } from "../../../schemas/response/auth.response.schema"
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../../../schemas/validation/auth.validation.schema"

export const authRegister = new OpenAPIRegistry()

authRegister.registerPath({
  method: "post",
  path: "/auth/register",
  summary: "Create user",
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    400: {description: "validation error"},
  },
})

authRegister.registerPath({
  method: "post",
  path: "/auth/login",
  summary: "log in user",
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: AuthResponseSchema,
        },
      },
    },
    401: { description: "Unauthorized" },
    400: { description: "Validation error" },
    429: { description: "Too many login atttempts" },
  },
})

authRegister.registerPath({
  method: "post",
  path: "/auth/forgot password",
  summary: "Send reset password link to email address",
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ForgotPasswordSchema.shape.body,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Email Sent",
    },
  },
})

authRegister.registerPath({
  method: "post",
  path: "/auth/reset-password",
  tags: ["auth"],
  summary: "Reset password",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ResetPasswordSchema.shape.body,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Password Reset",
    },
  },
})

authRegister.registerPath({
  method: "post",
  path: "/auth/logout",
  tags: ["auth"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ResetPasswordSchema.shape.body,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Password Reset",
    },
  },
})
