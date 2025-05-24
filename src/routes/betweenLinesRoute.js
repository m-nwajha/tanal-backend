import express from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';
import {
  getBetweenLines,
  createBetweenLines,
  updateBetweenLines,
  deleteBetweenLines,
} from '../controllers/betweenLinesController.js';

const router = express.Router();

router.post(
  '/between-lines',
  withApiKeyProtection,
  upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
  ]),
  createBetweenLines
);

router.put(
  '/between-lines/:id',
  withApiKeyProtection,
  upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
  ]),
  updateBetweenLines
);

router.get('/between-lines', withApiKeyProtection, getBetweenLines);
router.delete('/between-lines/:id', withApiKeyProtection, deleteBetweenLines);

export default router;
