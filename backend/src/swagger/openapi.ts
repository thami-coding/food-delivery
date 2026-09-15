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

// Debug
console.log("User definitions:", userRegistry.definitions.length)
console.log("Cart definitions:", cartRegistry.definitions.length)
console.log("Product definitions:", productRegistry.definitions.length)
console.log("Order definitions:", orderRegistry.definitions.length)
console.log("Total definitions:", definitions.length)

const generator = new OpenApiGeneratorV3(definitions)
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Food Ordering API",
    version: "1.0.0",
  },
})

// Debug
console.log("OpenAPI Document generated:", Object.keys(openApiDocument))
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
