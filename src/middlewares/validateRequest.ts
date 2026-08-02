import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import catchAsync from '../utils/catchAsync.js';

const validateRequest = (schema: ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = (await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    })) as { body?: unknown };

    req.body = parsed.body ?? req.body;

    next();
  });
};

export default validateRequest;
