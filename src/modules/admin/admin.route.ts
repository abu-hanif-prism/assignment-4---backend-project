import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { AdminControllers } from './admin.controller.js';

const router = Router();

router.use(auth('ADMIN'));

router.get('/users', AdminControllers.getAllUsers);
router.patch('/users/:id/ban', AdminControllers.banUser);
router.patch('/users/:id/unban', AdminControllers.unbanUser);
router.get('/properties', AdminControllers.getAllProperties);
router.get('/rental-requests', AdminControllers.getAllRentalRequests);
router.patch('/rental-requests/:id/cancel', AdminControllers.forceCancelRentalRequest);

export const AdminRoutes = router;
