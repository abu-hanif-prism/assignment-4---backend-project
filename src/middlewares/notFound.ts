import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorDetails: `No route found for ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
