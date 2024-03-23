import { getBuyerCurrentUsername, getBuyerWithEmail, getBuyerWithUsername } from '@users/controllers/buyer.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const buyerRoutes = (): Router => {
  router.get('/email', getBuyerWithEmail);
  router.get('/username', getBuyerCurrentUsername);
  router.get('/:username', getBuyerWithUsername);

  return router;
};

export { buyerRoutes };