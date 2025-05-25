import express from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';
import {
  createMessage,
  getMessage,
  updateMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/message', withApiKeyProtection, getMessage);
router.post(
  '/message',
  withApiKeyProtection,
  upload.single('image'),
  createMessage
);
router.put(
  '/message/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateMessage
);

export default router;
