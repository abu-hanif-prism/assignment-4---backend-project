import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import type { Role } from '../../../generated/prisma/enums.js';
import config from '../../config';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';
import { JwtHelpers, type TExpiresIn } from '../../utils/jwt';

type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
};

type TLoginPayload = {
  email: string;
  password: string;
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

const loginUser = async (payload: TLoginPayload) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isBanned) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This account has been banned');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const accessToken = JwtHelpers.createToken(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn as TExpiresIn,
  );

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isBanned: user.isBanned,
    },
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
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
  loginUser,
  getMe,
};
