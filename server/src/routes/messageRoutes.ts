import express from 'express';
import { getAllMessages } from '../controllers/messageController';

const router = express.Router();

router
  .route('/')
  .get(getAllMessages);

export default router;
