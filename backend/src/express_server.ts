import express from "express";
import { Routes } from "./routes";
import config from "../server_config.json";
import cookieParser from "cookie-parser";
<<<<<<< Updated upstream

=======
import connectRedis from "connect-redis";
import session from "express-session";
// import { createClient } from "redis";
import pinoHttp from "pino-http";
import { Server } from "socket.io";
import http from "http";
>>>>>>> Stashed changes

export class ExpressServer {
  public server_config = config;
  private static server = null;

  constructor() {
    const app = express();
    const port = this.server_config.port ?? 3000;
<<<<<<< Updated upstream
   
    app.use(cookieParser());
    app.use(express.json());
    // app.use(httpLogger);

 
    app.get("/api/ping", (req, res) => {
=======
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", // your frontend
      },
    });

    const httpLogger = pinoHttp({
      transport:
        process.env.NODE_ENV !== "production"
          ? { target: "pino-pretty" }
          : undefined,
    });
    app.use(cookieParser());
    app.use(express.json());
    app.get("/ping", (req, res) => {
>>>>>>> Stashed changes
      res.status(200).send("pong");
    });

    const routes = new Routes(app);
    if (routes) {
      console.log("Routes loaded");
    }
  
    ExpressServer.server = app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    });
  }


  //close the express server for safe on uncaughtException
  public closeServer(): void {
    ExpressServer.server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }
}
