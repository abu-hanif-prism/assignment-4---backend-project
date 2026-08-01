import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RentalRequestControllers } from './rental-request.controller';
import { RentalRequestValidations } from './rental-request.validation';

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

export const RentalRequestRoutes = router;
