import express from 'express';
import {
  getAllMessages,
  saveMessage,
} from '../controllers/messageController';

const router = express.Router();

router
  .route('/')
  .get(getAllMessages)
  .post(saveMessage);

export default router;
