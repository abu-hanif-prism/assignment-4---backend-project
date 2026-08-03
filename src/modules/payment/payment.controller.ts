import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { PaymentServices } from './payment.service.js';

const createPaymentIntent = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPaymentIntent(req.user!.userId, req.body.rentalRequestId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

export const PaymentControllers = {
  createPaymentIntent,
};
