"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badResponse = exports.errorResponse = exports.successResponse = void 0;
const logger_1 = __importDefault(require("./logger"));
const successResponse = (res, status) => (body) => {
    res.status(status || 200).json(body || {});
};
exports.successResponse = successResponse;
const badResponse = (res, status) => (body) => {
    res.status(status || 400).json(body || {});
};
exports.badResponse = badResponse;
const errorResponse = (res, status) => (message, body) => {
    logger_1.default.error(`Error response - ${status || 500} - `, { message, body });
    res.status(status || 500).json({
        message,
        error: body
    });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response_helper.js.map