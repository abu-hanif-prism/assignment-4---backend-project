import { Router } from 'express';
import auth from '../../middlewares/auth';
import { PropertyControllers } from './property.controller';

const router = Router();

router.post('/', auth('LANDLORD'), PropertyControllers.createProperty);
router.patch('/:id', auth('LANDLORD'), PropertyControllers.updateProperty);
router.delete('/:id', auth('LANDLORD'), PropertyControllers.deleteProperty);

export const PropertyRoutes = router;
