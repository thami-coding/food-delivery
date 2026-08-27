import express from "express"
import swaggerUi from "swagger-ui-express"
import { openApiDocument } from "../swagger/openapi"

const router = express.Router()
router.use("/", swaggerUi.serve)
router.get("/", swaggerUi.setup(openApiDocument))

export default router