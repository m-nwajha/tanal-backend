import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js'; // استيراد multer middleware

const router = express.Router();

router.get('/services', withApiKeyProtection, getAllServices);
router.get('/services/:id', withApiKeyProtection, getServiceById);

// middleware upload.single('image') لاستقبال ملف صورة وحقل اسمه image
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
