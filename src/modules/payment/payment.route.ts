import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { PaymentControllers } from './payment.controller.js';
import { PaymentValidations } from './payment.validation.js';

const router = Router();

router.get('/my-payments', auth('TENANT'), PaymentControllers.getMyPayments);
router.get('/landlord-payments', auth('LANDLORD'), PaymentControllers.getLandlordPayments);
router.get('/:id', auth(), PaymentControllers.getSinglePayment);
router.post(
  '/create-intent',
  auth('TENANT'),
  validateRequest(PaymentValidations.createPaymentIntentValidationSchema),
  PaymentControllers.createPaymentIntent,
);
router.post(
  '/confirm',
  auth('TENANT'),
  validateRequest(PaymentValidations.confirmPaymentValidationSchema),
  PaymentControllers.confirmPayment,
);

export const PaymentRoutes = router;
