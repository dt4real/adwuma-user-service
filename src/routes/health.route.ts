import { health } from '@users/controllers/health.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const healthRoutes = (): Router => {
  router.get('/user-health', health);

  return router;
};

export { healthRoutes };