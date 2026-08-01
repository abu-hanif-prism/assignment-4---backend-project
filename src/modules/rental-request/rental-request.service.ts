import { StatusCodes } from 'http-status-codes';
import type { RentalStatus } from '../../../generated/prisma/enums.js';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';

type TRentalRequestPayload = {
  propertyId: string;
  moveInDate: string;
  message?: string;
};

const createRentalRequest = async (tenantId: string, payload: TRentalRequestPayload) => {
  const property = await prisma.property.findUniqueOrThrow({ where: { id: payload.propertyId } });

  if (!property.isAvailable) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This property is not currently available for rent');
  }

  if (property.landlordId === tenantId) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You cannot submit a rental request for your own property');
  }

  const existingPendingRequest = await prisma.rentalRequest.findFirst({
    where: {
      propertyId: payload.propertyId,
      tenantId,
      status: 'PENDING',
    },
  });

  if (existingPendingRequest) {
    throw new AppError(StatusCodes.CONFLICT, 'You already have a pending request for this property');
  }

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      moveInDate: new Date(payload.moveInDate),
      message: payload.message ?? null,
    },
  });

  return rentalRequest;
};

const updateRentalRequestStatus = async (
  rentalRequestId: string,
  landlordId: string,
  status: Extract<RentalStatus, 'APPROVED' | 'REJECTED'>,
) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id: rentalRequestId },
    include: { property: true },
  });

  if (rentalRequest.property.landlordId !== landlordId) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You can only manage requests for your own properties');
  }

  if (rentalRequest.status !== 'PENDING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This rental request has already been ${rentalRequest.status.toLowerCase()} and cannot be updated`,
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.rentalRequest.update({
      where: { id: rentalRequestId },
      data: { status },
    });

    if (status === 'APPROVED') {
      await tx.property.update({
        where: { id: rentalRequest.propertyId },
        data: { isAvailable: false },
      });
    }

    return result;
  });

  return updated;
};

export const RentalRequestServices = {
  createRentalRequest,
  updateRentalRequestStatus,
};
