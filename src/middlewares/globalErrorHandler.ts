import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Prisma } from '../../generated/prisma/client.js';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong!';
  let errorDetails: unknown = err instanceof Error ? err.message : err;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = StatusCodes.CONFLICT;
      message = `Duplicate value for field: ${err.meta?.target}`;
    } else if (err.code === 'P2025') {
      statusCode = StatusCodes.NOT_FOUND;
      message = 'Resource not found';
    } else {
      statusCode = StatusCodes.BAD_REQUEST;
      message = err.message;
    }
    errorDetails = err.meta ?? err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
