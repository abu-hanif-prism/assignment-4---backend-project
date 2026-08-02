import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { AuthControllers } from './auth.controller.js';
import { AuthValidations } from './auth.validation.js';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidations.registerValidationSchema),
  AuthControllers.registerUser,
);
router.post('/login', validateRequest(AuthValidations.loginValidationSchema), AuthControllers.loginUser);
router.post('/logout', AuthControllers.logoutUser);
router.get('/me', auth(), AuthControllers.getMe);

export const AuthRoutes = router;
