import { StatusCodes } from 'http-status-codes';
import type Stripe from 'stripe';
import config from '../../config/index.js';
import AppError from '../../errors/AppError.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { PaymentServices, stripe } from './payment.service.js';

const createPaymentIntent = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPaymentIntent(req.user!.userId, req.body.rentalRequestId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req, res) => {
  const payment = await PaymentServices.confirmPayment(req.user!.userId, req.body.paymentIntentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment confirmed successfully',
    data: payment,
  });
});

const stripeWebhook = catchAsync(async (req, res) => {
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Missing Stripe signature header');
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, signature, config.stripeWebhookSecret);
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Webhook signature verification failed');
  }

  await PaymentServices.handleWebhookEvent(event);

  res.status(StatusCodes.OK).json({ received: true });
});

export const PaymentControllers = {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook,
};
