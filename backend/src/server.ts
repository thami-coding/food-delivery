import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler"
import v1Routes from "./api/v1/routes"
import { Database } from "./db/database"
import cors from "cors"
import { seedDatabase } from "./seed"

const app = express()
const isProduction = process.env.NODE_ENV === "production"
const allowedOrigins = isProduction
  ? "https://food-delivery-ydng-peach.vercel.app"
  : "*"
app.set("trust proxy", 1)
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", v1Routes)
app.use(errorHandler)

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/v1/api-docs")
})

app.get("/api/health", (req: Request, res: Response) => {
  const healthCheck = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }

  try {
    Database.initialize()
      .then(() => {
        console.log("Connected to database")
      })
      .catch((err) => {
        console.error("Database connection failed:", err)
        process.exit(1)
      })

    res.status(200).json(healthCheck)
  } catch (error) {
    healthCheck.status = "error"
    res.status(503).json(healthCheck)
  }
})

export const startServer = (port: number) => {
  Database.initialize()
    .then(() => {
      console.log("Connected to database")
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port} `)
      })

      if (!isProduction) {
        Database.getDataSource()
          .query(
            'TRUNCATE TABLE "users", "products", "cart", "order_item", "orders", "refresh_tokens" RESTART IDENTITY CASCADE;',
          )
          .then(() => {
            console.log("Running automatic database seed...")
            seedDatabase()
          })
      }
      process.on("SIGINT", () => {
        console.log("Received SIGINT signal")
        server.close()
      })

      process.on("SIGTERM", () => {
        console.log("SIGTERM signal received: closing HTTP server")
        server.close()
      })
    })
    .catch((err) => {
      console.error("Database connection failed:", err)
      process.exit(1)
    })
}

export { app }
