import express from 'express';
import {
  createBoardDirectors,
  deleteBoardDirectors,
  getAllBoardDirectors,
  getBoardDirectorsById,
  updateBoardDirectors,
} from '../controllers/boardDirectorsController.js';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/boardDirectors', withApiKeyProtection, getAllBoardDirectors);

router.get('/boardDirectors/:id', withApiKeyProtection, getBoardDirectorsById);

router.post(
  '/boardDirectors',
  withApiKeyProtection,
  upload.single('image'),
  createBoardDirectors
);

router.put(
  '/boardDirectors/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateBoardDirectors
);

router.delete('/boardDirectors/:id', withApiKeyProtection, deleteBoardDirectors);

export default router;
