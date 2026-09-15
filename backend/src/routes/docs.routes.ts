import express from "express"
import swaggerUi from "swagger-ui-express"
import { openApiDocument } from "../swagger/openapi"
import * as path from "path"

const router = express.Router()

const swaggerUiAssetPath = path.dirname(require.resolve("swagger-ui-express"))
router.use(
  "/",
  express.static(path.join(swaggerUiAssetPath, "swagger-ui-dist")),
)

router.use("/", swaggerUi.serve)
router.get("/", swaggerUi.setup(openApiDocument))

export default router