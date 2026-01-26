import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const isProd = process.env.NODE_ENV === "production";

export const logger = winston.createLogger({
 level: isProd ? "info" : "debug",
 format: combine(
  timestamp(),
  errors({ stack: true }),
  json()
 ),
 transports: [
  new winston.transports.File({
   filename: "logs/error.log",
   level: "error",
  }),
  new winston.transports.File({
   filename: "logs/combined.log",
  }),
 ],
});

// Pretty console logs in development
if (!isProd) {
 logger.add(
  new winston.transports.Console({
   format: combine(
    colorize({ all: true }),
    timestamp(),
    errors({ stack: true }),
    winston.format.simple()
   ),
  })
 );
}