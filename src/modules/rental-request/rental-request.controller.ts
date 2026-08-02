import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { RentalRequestServices } from './rental-request.service.js';

const createRentalRequest = catchAsync(async (req, res) => {
  const rentalRequest = await RentalRequestServices.createRentalRequest(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Rental request submitted successfully',
    data: rentalRequest,
  });
});

const updateRentalRequestStatus = catchAsync(async (req, res) => {
  const rentalRequest = await RentalRequestServices.updateRentalRequestStatus(
    req.params.id as string,
    req.user!.userId,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Rental request ${rentalRequest.status.toLowerCase()} successfully`,
    data: rentalRequest,
  });
});

const getMyRentalRequests = catchAsync(async (req, res) => {
  const rentalRequests = await RentalRequestServices.getMyRentalRequests(req.user!.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rental requests retrieved successfully',
    data: rentalRequests,
  });
});

const getLandlordRentalRequests = catchAsync(async (req, res) => {
  const rentalRequests = await RentalRequestServices.getLandlordRentalRequests(req.user!.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rental requests retrieved successfully',
    data: rentalRequests,
  });
});

const getSingleRentalRequest = catchAsync(async (req, res) => {
  const rentalRequest = await RentalRequestServices.getSingleRentalRequest(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rental request retrieved successfully',
    data: rentalRequest,
  });
});

export const RentalRequestControllers = {
  createRentalRequest,
  updateRentalRequestStatus,
  getMyRentalRequests,
  getLandlordRentalRequests,
  getSingleRentalRequest,
};
