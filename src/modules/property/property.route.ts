import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { PropertyControllers } from './property.controller.js';
import { PropertyValidations } from './property.validation.js';

const router = Router();

router.get('/', PropertyControllers.getAllProperties);
router.get('/:id', PropertyControllers.getSingleProperty);
router.post(
  '/',
  auth('LANDLORD'),
  validateRequest(PropertyValidations.createPropertyValidationSchema),
  PropertyControllers.createProperty,
);
router.patch(
  '/:id',
  auth('LANDLORD'),
  validateRequest(PropertyValidations.updatePropertyValidationSchema),
  PropertyControllers.updateProperty,
);
router.delete('/:id', auth('LANDLORD'), PropertyControllers.deleteProperty);

export const PropertyRoutes = router;
