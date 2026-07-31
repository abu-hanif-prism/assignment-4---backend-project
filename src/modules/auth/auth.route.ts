import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post('/register', AuthControllers.registerUser);
router.post('/login', AuthControllers.loginUser);
router.post('/logout', AuthControllers.logoutUser);
router.get('/me', auth(), AuthControllers.getMe);

export const AuthRoutes = router;
