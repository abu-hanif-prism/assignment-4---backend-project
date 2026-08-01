import { StatusCodes } from 'http-status-codes';
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

export const RentalRequestServices = {
  createRentalRequest,
};
