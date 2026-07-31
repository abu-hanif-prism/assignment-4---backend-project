import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CategoryControllers } from './category.controller';

const router = Router();

router.get('/', CategoryControllers.getAllCategories);
router.get('/:id', CategoryControllers.getSingleCategory);
router.post('/', auth('ADMIN'), CategoryControllers.createCategory);
router.patch('/:id', auth('ADMIN'), CategoryControllers.updateCategory);
router.delete('/:id', auth('ADMIN'), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
