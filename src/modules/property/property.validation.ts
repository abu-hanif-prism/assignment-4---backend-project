import { z } from 'zod';

const createPropertyValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    address: z.string().min(1, 'Address is required'),
    price: z.number().positive('Price must be a positive number'),
    categoryId: z.uuid('Invalid category id'),
    images: z.array(z.string()).optional(),
    isAvailable: z.boolean().optional(),
  }),
});

const updatePropertyValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    categoryId: z.uuid('Invalid category id').optional(),
    images: z.array(z.string()).optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const PropertyValidations = {
  createPropertyValidationSchema,
  updatePropertyValidationSchema,
};
