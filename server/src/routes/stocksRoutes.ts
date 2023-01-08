import express from 'express';
import { getStocks } from '../controllers/stocksController';

const router = express.Router();

router
  .route('/')
  .get(getStocks);

export default router;