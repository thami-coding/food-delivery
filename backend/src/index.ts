import "reflect-metadata";
import { DatabaseUtil } from "./utils/db";
import { ExpressServer } from "./express_server";
import { NotificationUtil } from "./utils/notification_util";
import config from '../server_config.json'
import { QueueWorker } from "./workers/queue_worker";
const server = new ExpressServer();
new DatabaseUtil();

new NotificationUtil(config)
new QueueWorker().beginProcess()

// Gracefully handle termination signals
process.on("SIGINT", () => {
  console.log("Received SIGINT signal");
  // Close any open connections or resources
  server.closeServer();
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  // Close any open connections or resources
  server.closeServer();
});
