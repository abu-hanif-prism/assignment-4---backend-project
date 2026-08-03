import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import config from '../../config/index.js';
import AppError from '../../errors/AppError.js';
import { prisma } from '../../lib/prisma.js';

const stripe = new Stripe(config.stripeSecretKey);

const createPaymentIntent = async (tenantId: string, rentalRequestId: string) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id: rentalRequestId },
    include: { property: true, payment: true },
  });

  if (rentalRequest.tenantId !== tenantId) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You can only pay for your own rental requests');
  }

  if (rentalRequest.status !== 'APPROVED') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Payment can only be made for an approved rental request');
  }

  if (rentalRequest.payment) {
    if (rentalRequest.payment.status === 'COMPLETED') {
      throw new AppError(StatusCodes.CONFLICT, 'This rental request has already been paid for');
    }

    const existingIntent = await stripe.paymentIntents.retrieve(rentalRequest.payment.transactionId as string);

    return {
      clientSecret: existingIntent.client_secret,
      paymentId: rentalRequest.payment.id,
      amount: rentalRequest.payment.amount,
    };
  }

  const amount = Math.round(rentalRequest.property.price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: {
      rentalRequestId: rentalRequest.id,
      tenantId,
    },
  });

  const payment = await prisma.payment.create({
    data: {
      rentalRequestId: rentalRequest.id,
      amount: rentalRequest.property.price,
      provider: 'STRIPE',
      status: 'PENDING',
      transactionId: paymentIntent.id,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment.id,
    amount: payment.amount,
  };
};

export const PaymentServices = {
  createPaymentIntent,
};
