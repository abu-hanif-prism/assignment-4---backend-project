import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ReviewServices } from './review.service.js';

const createReview = catchAsync(async (req, res) => {
  const review = await ReviewServices.createReview(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review submitted successfully',
    data: review,
  });
});

const getPropertyReviews = catchAsync(async (req, res) => {
  const reviews = await ReviewServices.getPropertyReviews(req.params.propertyId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: reviews,
  });
});

export const ReviewControllers = {
  createReview,
  getPropertyReviews,
};
