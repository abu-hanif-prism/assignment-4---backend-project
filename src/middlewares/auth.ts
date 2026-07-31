import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Role } from '../../generated/prisma/enums.js';
import config from '../config';
import AppError from '../errors/AppError';
import { prisma } from '../lib/prisma';
import catchAsync from '../utils/catchAsync';
import { JwtHelpers } from '../utils/jwt';

const auth = (...allowedRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized to access this resource');
    }

    let decoded;
    try {
      decoded = JwtHelpers.verifyToken(token, config.jwtAccessSecret);
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User no longer exists');
    }

    if (user.isBanned) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This account has been banned');
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You do not have permission to perform this action');
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  });
};

export default auth;
