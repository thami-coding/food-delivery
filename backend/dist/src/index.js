"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_1 = require("./utils/db");
const express_server_1 = require("./express_server");
const notification_util_1 = require("./utils/notification_util");
const server_config_json_1 = __importDefault(require("../server_config.json"));
const queue_worker_1 = require("./workers/queue_worker");
const server = new express_server_1.ExpressServer();
new db_1.DatabaseUtil();
new notification_util_1.NotificationUtil(server_config_json_1.default);
new queue_worker_1.QueueWorker().beginProcess();
process.on("SIGINT", () => {
    console.log("Received SIGINT signal");
    server.closeServer();
});
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.closeServer();
});
