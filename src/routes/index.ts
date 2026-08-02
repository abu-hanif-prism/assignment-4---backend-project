import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { CategoryRoutes } from '../modules/category/category.route.js';
import { PropertyRoutes } from '../modules/property/property.route.js';
import { RentalRequestRoutes } from '../modules/rental-request/rental-request.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/properties',
    route: PropertyRoutes,
  },
  {
    path: '/rental-requests',
    route: RentalRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
