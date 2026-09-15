import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi"
import { userRegistry } from "./user.openapi"
import { cartRegistry } from "./cart.openapi"
import { productRegistry } from "./product.openapi"
import { orderRegistry } from "./order.openapi"

const definitions = [
  ...userRegistry.definitions,
  ...cartRegistry.definitions,
  ...productRegistry.definitions,
  ...orderRegistry.definitions,
]

const generator = new OpenApiGeneratorV3(definitions)
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Food Ordering API",
    version: "1.0.0",
  },
})

openApiDocument.components = {
  ...openApiDocument.components,
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
}
