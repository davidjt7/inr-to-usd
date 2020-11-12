"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston_1.default.format.json(),
    transports: [
        /**
         * - Write all logs with level `error` and below to `error.log`
         */
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
    ]
});
/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }), winston_1.default.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }))
    }));
    logger.warn(`Logging initialized at debug level in ${process.env.NODE_ENV ||
        "development"} environment!`);
}
exports.default = logger;
//# sourceMappingURL=logger.js.map