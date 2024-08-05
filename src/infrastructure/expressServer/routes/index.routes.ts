import { Router } from 'express';
import UserRoutes from './user.routes';

const routes: Router = Router();

routes.use('/user', UserRoutes);

export default routes;
