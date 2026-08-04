import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    rentalRequestId: z.uuid('Invalid rental request id'),
    rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
    comment: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
