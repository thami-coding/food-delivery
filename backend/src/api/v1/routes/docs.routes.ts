import express from "express"
import swaggerUi from "swagger-ui-express"
import { openApiDocument } from "../swagger/openapi"

const router = express.Router()
router.use("/api-docs", swaggerUi.serve)
router.get("/api-docs", swaggerUi.setup(openApiDocument))

export default router