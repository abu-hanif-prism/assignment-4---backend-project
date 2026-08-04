import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError.js';
import { prisma } from '../../lib/prisma.js';

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isBanned: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const setUserBanStatus = async (adminId: string, userId: string, isBanned: boolean) => {
  if (userId === adminId) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot ban or unban your own account');
  }

  const targetUser = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  if (targetUser.role === 'ADMIN') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot ban or unban another admin');
  }

  return prisma.user.update({
    where: { id: userId },
    data: { isBanned },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
    },
  });
};

const getAllProperties = async () => {
  return prisma.property.findMany({
    include: {
      category: true,
      landlord: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getAllRentalRequests = async () => {
  return prisma.rentalRequest.findMany({
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const forceCancelRentalRequest = async (rentalRequestId: string) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({ where: { id: rentalRequestId } });

  if (rentalRequest.status === 'COMPLETED' || rentalRequest.status === 'CANCELLED') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Cannot cancel a rental request that is already ${rentalRequest.status.toLowerCase()}`,
    );
  }

  const wasBlockingAvailability = rentalRequest.status === 'APPROVED' || rentalRequest.status === 'ACTIVE';

  return prisma.$transaction(async (tx) => {
    const result = await tx.rentalRequest.update({
      where: { id: rentalRequestId },
      data: { status: 'CANCELLED' },
    });

    if (wasBlockingAvailability) {
      await tx.property.update({
        where: { id: rentalRequest.propertyId },
        data: { isAvailable: true },
      });
    }

    return result;
  });
};

export const AdminServices = {
  getAllUsers,
  setUserBanStatus,
  getAllProperties,
  getAllRentalRequests,
  forceCancelRentalRequest,
};
