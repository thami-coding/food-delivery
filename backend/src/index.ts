// import "reflect-metadata"
import dotenv from "dotenv"
import { startServer } from "./server"

dotenv.config()
const port = Number(process.env.PORT) || 3000
startServer(port)
