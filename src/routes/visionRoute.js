import express from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';
import { createVision, getVision, updateVision } from '../controllers/visionController.js';

const router = express.Router();

router.get('/vision', withApiKeyProtection, getVision);
router.post(
  '/vision',
  withApiKeyProtection,
  upload.single('image'),
  createVision
);
router.put(
  '/vision/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateVision
);

export default router;
