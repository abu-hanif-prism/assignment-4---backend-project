import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { CategoryControllers } from './category.controller.js';
import { CategoryValidations } from './category.validation.js';

const router = Router();

router.get('/', CategoryControllers.getAllCategories);
router.get('/:id', CategoryControllers.getSingleCategory);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);
router.delete('/:id', auth('ADMIN'), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
