import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RentalRequestControllers } from './rental-request.controller';
import { RentalRequestValidations } from './rental-request.validation';

const router = Router();

router.post(
  '/',
  auth('TENANT'),
  validateRequest(RentalRequestValidations.createRentalRequestValidationSchema),
  RentalRequestControllers.createRentalRequest,
);

export const RentalRequestRoutes = router;
