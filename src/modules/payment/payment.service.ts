import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import type { Role } from '../../../generated/prisma/enums.js';
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
    automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
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

const markPaymentCompleted = async (transactionId: string) => {
  const payment = await prisma.payment.findUnique({ where: { transactionId } });

  if (!payment) {
    return null;
  }

  if (payment.status === 'COMPLETED') {
    return payment;
  }

  return prisma.$transaction(async (tx) => {
    const result = await tx.payment.update({
      where: { id: payment.id },
      data: { status: 'COMPLETED', paidAt: new Date() },
    });

    await tx.rentalRequest.update({
      where: { id: payment.rentalRequestId },
      data: { status: 'ACTIVE' },
    });

    return result;
  });
};

const markPaymentFailed = async (transactionId: string) => {
  await prisma.payment.updateMany({
    where: { transactionId, status: 'PENDING' },
    data: { status: 'FAILED' },
  });
};

const handleWebhookEvent = async (event: Stripe.Event) => {
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    await markPaymentCompleted(paymentIntent.id);
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    await markPaymentFailed(paymentIntent.id);
  }
};

const confirmPayment = async (tenantId: string, paymentIntentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId: paymentIntentId },
    include: { rentalRequest: true },
  });

  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No payment record found for this transaction');
  }

  if (payment.rentalRequest.tenantId !== tenantId) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You can only confirm your own payments');
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    const updated = await markPaymentCompleted(paymentIntentId);
    return updated;
  }

  if (paymentIntent.status === 'canceled' || paymentIntent.status === 'requires_payment_method') {
    await markPaymentFailed(paymentIntentId);
    throw new AppError(StatusCodes.BAD_REQUEST, `Payment was not successful (status: ${paymentIntent.status})`);
  }

  throw new AppError(StatusCodes.BAD_REQUEST, `Payment has not completed yet (status: ${paymentIntent.status})`);
};

const getMyPayments = async (tenantId: string) => {
  return prisma.payment.findMany({
    where: { rentalRequest: { tenantId } },
    include: { rentalRequest: { include: { property: true } } },
    orderBy: { createdAt: 'desc' },
  });
};

const getLandlordPayments = async (landlordId: string) => {
  return prisma.payment.findMany({
    where: { rentalRequest: { property: { landlordId } } },
    include: {
      rentalRequest: {
        include: {
          property: true,
          tenant: { select: { id: true, name: true, email: true, phone: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getSinglePayment = async (paymentId: string, userId: string, role: Role) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: { id: paymentId },
    include: {
      rentalRequest: {
        include: {
          property: true,
          tenant: { select: { id: true, name: true, email: true, phone: true } },
        },
      },
    },
  });

  const isTenant = payment.rentalRequest.tenantId === userId;
  const isLandlord = payment.rentalRequest.property.landlordId === userId;
  const isAdmin = role === 'ADMIN';

  if (!isTenant && !isLandlord && !isAdmin) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You do not have permission to view this payment');
  }

  return payment;
};

export const PaymentServices = {
  createPaymentIntent,
  handleWebhookEvent,
  confirmPayment,
  getMyPayments,
  getLandlordPayments,
  getSinglePayment,
};

export { stripe };
