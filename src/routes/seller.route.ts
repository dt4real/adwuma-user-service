import { seed } from '@users/controllers/seed.controller';
import { addNewSeller, getSellerWithId, getSellerWithUsername, getSellersRandom, updateSellerInfo } from '@users/controllers/seller.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const sellerRoutes = (): Router => {
  router.get('/id/:sellerId', getSellerWithId);
  router.get('/username/:username', getSellerWithUsername);
  router.get('/random/:size', getSellersRandom);
  router.post('/create', addNewSeller);
  router.put('/:sellerId', updateSellerInfo);
  router.put('/seed/:count', seed);

  return router;
};

export { sellerRoutes };