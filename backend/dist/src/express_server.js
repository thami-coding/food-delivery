"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const server_config_json_1 = __importDefault(require("../server_config.json"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
class ExpressServer {
    server_config = server_config_json_1.default;
    static server = null;
    constructor() {
        const app = (0, express_1.default)();
        const port = this.server_config.port ?? 3000;
        let redisClient = (0, redis_1.createClient)({
            legacyMode: true,
            url: "redis://localhost:6379",
        });
        redisClient.connect().catch(console.error);
        const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use((0, express_session_1.default)({
            store: new RedisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: false,
            secret: "keyboard cat",
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        }));
        app.get("/ping", (req, res) => {
            res.status(200).send("pong");
        });
        const routes = new routes_1.Routes(app);
        if (routes) {
            console.log("Routes loaded");
        }
        ExpressServer.server = app.listen(port, () => {
            console.log(`Server is running on port ${port} `);
        });
    }
    closeServer() {
        ExpressServer.server.close(() => {
            console.log("Server closed");
            process.exit(0);
        });
    }
}
exports.ExpressServer = ExpressServer;
