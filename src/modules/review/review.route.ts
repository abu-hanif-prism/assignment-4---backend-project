import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { ReviewControllers } from './review.controller.js';
import { ReviewValidations } from './review.validation.js';

const router = Router();

router.get('/property/:propertyId', ReviewControllers.getPropertyReviews);
router.post(
  '/',
  auth('TENANT'),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
