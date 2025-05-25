import express from 'express';
import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} from '../controllers/requestController.js';

import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/requests', withApiKeyProtection, getAllRequests);
router.get('/requests/:id', withApiKeyProtection, getRequestById);

router.post(
  '/requests',
  withApiKeyProtection,
  upload.single('file'),
  createRequest
);

router.put(
  '/requests/:id',
  withApiKeyProtection,
  upload.single('file'),
  updateRequest
);

router.delete('/requests/:id', withApiKeyProtection, deleteRequest);

export default router;
