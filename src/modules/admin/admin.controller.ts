import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { AdminServices } from './admin.service.js';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await AdminServices.getAllUsers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const banUser = catchAsync(async (req, res) => {
  const user = await AdminServices.setUserBanStatus(req.user!.userId, req.params.id as string, true);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User banned successfully',
    data: user,
  });
});

const unbanUser = catchAsync(async (req, res) => {
  const user = await AdminServices.setUserBanStatus(req.user!.userId, req.params.id as string, false);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User unbanned successfully',
    data: user,
  });
});

const getAllProperties = catchAsync(async (req, res) => {
  const properties = await AdminServices.getAllProperties();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Properties retrieved successfully',
    data: properties,
  });
});

const getAllRentalRequests = catchAsync(async (req, res) => {
  const rentalRequests = await AdminServices.getAllRentalRequests();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rental requests retrieved successfully',
    data: rentalRequests,
  });
});

const forceCancelRentalRequest = catchAsync(async (req, res) => {
  const rentalRequest = await AdminServices.forceCancelRentalRequest(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rental request cancelled successfully',
    data: rentalRequest,
  });
});

export const AdminControllers = {
  getAllUsers,
  banUser,
  unbanUser,
  getAllProperties,
  getAllRentalRequests,
  forceCancelRentalRequest,
};
