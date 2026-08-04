import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError.js';
import { prisma } from '../../lib/prisma.js';

type TReviewPayload = {
  rentalRequestId: string;
  rating: number;
  comment?: string;
};

const createReview = async (tenantId: string, payload: TReviewPayload) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id: payload.rentalRequestId },
    include: { review: true },
  });

  if (rentalRequest.tenantId !== tenantId) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You can only review your own rentals');
  }

  if (rentalRequest.status !== 'COMPLETED') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You can only review a rental after it has been completed');
  }

  if (rentalRequest.review) {
    throw new AppError(StatusCodes.CONFLICT, 'You have already reviewed this rental');
  }

  return prisma.review.create({
    data: {
      rentalRequestId: payload.rentalRequestId,
      rating: payload.rating,
      comment: payload.comment ?? null,
    },
  });
};

const getPropertyReviews = async (propertyId: string) => {
  return prisma.review.findMany({
    where: { rentalRequest: { propertyId } },
    include: {
      rentalRequest: {
        select: { tenant: { select: { id: true, name: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const ReviewServices = {
  createReview,
  getPropertyReviews,
};
