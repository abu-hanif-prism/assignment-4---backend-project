import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { RentalRequestControllers } from './rental-request.controller.js';
import { RentalRequestValidations } from './rental-request.validation.js';

const router = Router();

router.get('/my-requests', auth('TENANT'), RentalRequestControllers.getMyRentalRequests);
router.get('/landlord-requests', auth('LANDLORD'), RentalRequestControllers.getLandlordRentalRequests);
router.get('/:id', auth(), RentalRequestControllers.getSingleRentalRequest);
router.post(
  '/',
  auth('TENANT'),
  validateRequest(RentalRequestValidations.createRentalRequestValidationSchema),
  RentalRequestControllers.createRentalRequest,
);
router.patch(
  '/:id/status',
  auth('LANDLORD'),
  validateRequest(RentalRequestValidations.updateRentalRequestStatusValidationSchema),
  RentalRequestControllers.updateRentalRequestStatus,
);
router.patch('/:id/complete', auth('LANDLORD'), RentalRequestControllers.completeRentalRequest);

export const RentalRequestRoutes = router;
