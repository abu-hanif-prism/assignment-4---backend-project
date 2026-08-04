import { z } from 'zod';

const createPaymentIntentValidationSchema = z.object({
  body: z.object({
    rentalRequestId: z.uuid('Invalid rental request id'),
  }),
});

const confirmPaymentValidationSchema = z.object({
  body: z.object({
    paymentIntentId: z.string().min(1, 'Payment intent id is required'),
  }),
});

export const PaymentValidations = {
  createPaymentIntentValidationSchema,
  confirmPaymentValidationSchema,
};
