import express from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler"
import v1Routes from "./api/v1/routes"
import { Database } from "./db/database"
import cors from "cors"

const app = express()
app.use(
  cors({
    origin: "https://food-delivery-ydng-peach.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", v1Routes)
app.use(errorHandler)

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Food Delivery API is running In Production!!",
  })
})

export const startServer = (port: number) => {
  Database.initialize()
    .then(() => {
      console.log("Connected to database")
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port} `)
      })

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
