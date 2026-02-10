// import "reflect-metadata"
import dotenv from "dotenv"
import { startServer } from "./server"

dotenv.config()
const port = 3000
startServer(port)
