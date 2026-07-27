import winston from "winston"

const { combine, timestamp, errors, json, colorize } = winston.format

const isProd = process.env.NODE_ENV === "production"

const isVercel = !!process.env.VERCEL

export const logger = winston.createLogger({
  level: isProd ? "info" : "debug",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new winston.transports.Console({
      format: isProd
        ? json()
        : combine(colorize({ all: true }), winston.format.simple()),
    }),
  ],
})

if (!isProd && !isVercel) {
  logger.add(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  )
  logger.add(
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  )
}
