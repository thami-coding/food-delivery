import express from "express";
import { Routes } from "./routes";
import config from "../server_config.json";
import cookieParser from "cookie-parser";
import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import pinoHttp from "pino-http";

export class ExpressServer {
  public server_config = config;
  private static server = null;

  constructor() {
    const app = express();
    const port = this.server_config.port ?? 3000;
    const redisUrl = process.env.REDIS_URL;

    let redisClient = createClient({
      legacyMode: true,
      url:  redisUrl,
    });

    redisClient.connect().catch(console.error);
    const RedisStore = connectRedis(session);
    const httpLogger = pinoHttp({
      transport:
        process.env.NODE_ENV !== "production"
          ? { target: "pino-pretty" }
          : undefined,
    });
    app.use(cookieParser());
    app.use(express.json());
    app.use(httpLogger);

    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
        secret: "keyboard cat",
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      })
    );

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
