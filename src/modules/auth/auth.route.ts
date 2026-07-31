import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

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
