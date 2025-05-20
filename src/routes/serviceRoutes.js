import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/services', withApiKeyProtection, getAllServices);
router.get('/services/:id', withApiKeyProtection, getServiceById);

router.post(
  '/services',
  withApiKeyProtection,
  upload.single('image'),
  createService
);
router.put(
  '/services/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateService
);

router.delete('/services/:id', withApiKeyProtection, deleteService);

export default router;
