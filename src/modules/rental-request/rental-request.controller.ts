import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalRequestServices } from './rental-request.service';

const createRentalRequest = catchAsync(async (req, res) => {
  const rentalRequest = await RentalRequestServices.createRentalRequest(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Rental request submitted successfully',
    data: rentalRequest,
  });
});

export const RentalRequestControllers = {
  createRentalRequest,
};
