import type { Request, Response, NextFunction } from 'express';
import logger from '@/lib/logger.lib.js';
import APIError from '@/lib/api-error.lib.js';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`Error: ${err.message}`, {
    label: 'GlobalErrorHandler',
    stack: err.stack,
  });

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.error,
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};

export default globalErrorHandler;
