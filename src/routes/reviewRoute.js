import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from '../controllers/reviewController.js';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/review', withApiKeyProtection, getAllReviews);

router.get('/review/:id', withApiKeyProtection, getReviewById);

router.post(
  '/review',
  withApiKeyProtection,
  upload.single('image'),
  createReview
);

router.put(
  '/review/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateReview
);

router.delete('/review/:id', withApiKeyProtection, deleteReview);

export default router;
