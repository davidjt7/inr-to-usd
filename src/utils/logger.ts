import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: [
    /**
     * - Write all logs with level `error` and below to `error.log`
     */
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ]
});

/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      )
    })
  );
  logger.warn(
    `Logging initialized at debug level in ${process.env.NODE_ENV ||
      "development"} environment!`
  );
}

export default logger;
