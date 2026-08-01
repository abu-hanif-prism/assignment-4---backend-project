import { z } from 'zod';

const createRentalRequestValidationSchema = z.object({
  body: z.object({
    propertyId: z.uuid('Invalid property id'),
    moveInDate: z
      .string()
      .refine((val) => !Number.isNaN(Date.parse(val)), 'Invalid move-in date')
      .refine((val) => new Date(val).getTime() > Date.now(), 'Move-in date must be in the future'),
    message: z.string().optional(),
  }),
});

export const RentalRequestValidations = {
  createRentalRequestValidationSchema,
};
