import { Response } from "express";
import logger from "./logger";

const successResponse = (res: Response, status?: number) => (body?: any) => {
  res.status(status || 200).json(body || {});
};

const badResponse = (res: Response, status?: number) => (body?: any) => {
  res.status(status || 400).json(body || {});
};

const errorResponse = (res: Response, status?: number) => (
  message: string,
  body?: any
) => {
  logger.error(`Error response - ${status || 500} - `, { message, body });
  res.status(status || 500).json({
    message,
    error: body
  });
};

export {
  successResponse,
  errorResponse,
  badResponse,
};
