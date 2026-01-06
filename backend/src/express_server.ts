import express from "express";
import { Routes } from "./routes";
import config from "../server_config.json";
import cookieParser from "cookie-parser";


export class ExpressServer {
  public server_config = config;
  private static server = null;

  constructor() {
    const app = express();
    const port = this.server_config.port ?? 3000;
    app.use(cookieParser());
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.json());
    app.get("/ping", (req, res) => {
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
