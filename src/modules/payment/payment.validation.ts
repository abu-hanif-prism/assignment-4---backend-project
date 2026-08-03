import { z } from 'zod';

const createPaymentIntentValidationSchema = z.object({
  body: z.object({
    rentalRequestId: z.uuid('Invalid rental request id'),
  }),
});

export const PaymentValidations = {
  createPaymentIntentValidationSchema,
};
