import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PropertyControllers } from './property.controller';
import { PropertyValidations } from './property.validation';

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
