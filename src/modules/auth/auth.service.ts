import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import type { Role } from '../../../generated/prisma/enums.js';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';

type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
};

const registerUser = async (payload: TRegisterPayload) => {
  if (payload.role === 'ADMIN') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot register with admin role');
  }

  const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'A user with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone ?? null,
      role: payload.role ?? 'TENANT',
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isBanned: true,
      createdAt: true,
    },
  });

  return user;
};

export const AuthServices = {
  registerUser,
};
